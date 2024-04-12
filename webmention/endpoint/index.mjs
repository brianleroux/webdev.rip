import arc from '@architect/functions'
import { nanoid } from 'nanoid'

export let handler = arc.http(verify, endpoint)

/** verifies webmention */
async function verify (req) {

  let verified = false

  let { source, target } = req.body
  try {
    // cast strings to URL
    let src = new URL(source)
    let tar = new URL(target)

    // remove trailing slash from path
    let path = {
      src: src.pathname.replace(/\/+$/g, ''),
      tar: tar.pathname.replace(/\/+$/g, '')
    }

    verified = true

    // source cannot be same as target
    if (src.host === tar.host && path.src === path.tar) {
      verified = false
    }
  }
  catch (e) {
    // new URL throws if a URL is invalid
    console.log(e) 
    verified = false
  }

  if (verified === false) {

    let loggedIn = !!req.session.loggedIn
    let session = {...req.session}
    session.problem = 'Please enter a valid URL'

    let host = req.headers.host
    let local = !!(host.startsWith('localhost') || host.startsWith('webdev.rip'))

    if (loggedIn === true && local === true) {
      return { 
        session,
        location: '/admin' 
      }
    }

    if (loggedIn === false && local === true) {
      return { 
        session,
        location: req.body.target
      }
    } 

    return { code: 400 }
  }
}

/** receives webmention */
async function endpoint (req) {

  // instantiate a db client
  let db = await arc.tables()

  // create our webmention
  const webmention = {
    source: `UNVERIFIED#${ req.body.source.replace('https://', '') }`,
    target: req.body.target.replace('https://', ''),
    status: nanoid(8),
    created: new Date(Date.now()).toISOString()
  }

  await Promise.all([

    // write the webmention to the database
    db.webmentions.put(webmention),

    // async process the webmention further
    arc.events.publish({
      name: 'webmention-receive',
      payload: webmention 
    })
  ])

  let loggedIn = !!req.session.loggedIn
  let host = req.headers.host
  let local = !!(host.startsWith('localhost') || host.startsWith('webdev.rip'))

  if (loggedIn === true && local === true) {
    return { location: '/admin' }
  }

  if (loggedIn === false && local === true) {
    let target = req.body.target
    let isLocal = host.startsWith('localhost')  
    let base = isLocal? target.replace('https://webdev.rip/', `http://${host}`) : target
    return {
      location: `${base}?wm=thx`
    }
  } 

  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'location': `https://webdev.rip/webmention/${ webmention.status }`
    }
  }
}
