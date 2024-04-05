import arc from '@architect/functions'
import { nanoid } from 'nanoid'

export let handler = arc.http(verify, endpoint)

/** verifies webmention */
async function verify (req) {
  let { source, target } = req.body
  try {
    // cast strings to URL
    let src = new URL(source)
    let tar = new URL(target)

    // remove trailing slash from path
    let path = {
      src: src.pathname.replace(/\/+$/g, ''),
      tar: tar.replace(/\/+$/g, '')
    }

    // source cannot be same as target
    if (src.host === tar.host && path.src === path.tar) {
      return {
        code: 400,
      }
    }
  }
  catch {
    // new URL throws if a URL is invalid
    return {
      code: 400,
    }
  }
}

/** receives webmention */
async function endpoint (req) {

  // instantiate a db client
  let db = await arc.tables()

  // create our webmention
  const webmention = {
    source: `WM#UNVERIFIED#${ req.body.source }`,
    target: req.body.target.replace('https://', ''),
    status: nanoid(8),
    verified: 'unverified',
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

  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'location': `https://webdev.rip/webmention/${ webmention.status }`
    }
  }
}
