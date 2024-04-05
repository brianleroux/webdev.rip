import arc from '@architect/functions'
import idx from 'nanoid'

export let handler = arc.http(verify, endpoint)

/** helper to check for valid url */
function valid (url) {
  try {
    new URL(url)
    return true
  } 
  catch (err) {
    return false
  }
}

/** verifies webmention */
async function verify (req) {

  let { source, target } = req.body

  // must check for valid urls
  if (valid(source) === false || valid(target) === false) {
    return {
      code: 400,
    }
  }

  // source cannot be same as target
  let src = new URL(source)
  let tar = new URL(target)
  if (src.host === tar.host && src.pathname.replace(/\/+$/g, '') === tar.replace(/\/+$/g, '')) {
    return {
      code: 400,
    }
  }
}

/** receives webmention */
async function endpoint (req) {

  let { source, target } = req.body
  console.log(req)

  // create our webmention
  const webmention = {
    source,
    target,
    status: idx.nanoid(8),
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
