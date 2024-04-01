import preflight from '../../preflight.mjs'

const data = preflight()

export async function get (req) {

  let tag = req.params.tag

  data.meta = data.meta.filter(o => o.tags.includes(tag))

  // set cache-control headers in production
  let cacheControl = process.env.ARC_ENV === 'production'
    ? 'max-age=3600;'
    : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  // return the response
  return {
    headers: { 
      'cache-control': cacheControl 
    },
    json: { 
      tag,
      ...data,
      debug: false, 
    }
  }
}
