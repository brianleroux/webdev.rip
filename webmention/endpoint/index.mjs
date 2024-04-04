import arc from '@architect/functions'
import idx from 'nanoid'

export let handler = arc.http(endpoint)

export async function endpoint (req) {

  let { source, target } = req.body

  // must check for valid urls
  if (isValid(source) === false || isValid(target) === false) {
    return {
      code: 400,
    }
  }

  // must ensure not creating an infinate loop!
  let src = new URL(source)
  let tar = new URL(target)
  if (src.host === tar.host && src.pathname.replace(/\/+$/g, '') === tar.replace(/\/+$/g, '')) {
    return {
      code: 400,
    }
  }

  // async process the mention
  const status = idx.nanoid(8)

  await db.webmentions.put({
    source, target, status
  }) 

  await arc.events.publish({
    name: 'webmention-receive',
    payload: { source, target, status }
  })

  return {
    statusCode: 201,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'location': `https://webdev.rip/webmention/${ status }`
    }
  }
}

/** helper to check for valid url */
function isUrlValid (url) {
  try {
    new URL(url)
    return true
  } 
  catch (err) {
    return false
  }
}
