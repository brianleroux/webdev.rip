import preflight from '@architect/views/preflight.mjs'
import arc from '@architect/functions'
import render from './render.mjs'

const cache = {} // cheesy coldstart cache

export let handler = arc.http(fn)

async function fn (req) {

  let title = req.params.title
  let data = await preflight(req)
  let meta = data.meta.find(e => e.link === `/notes/${ title }`)

  if (!meta) return {
    code: 404, 
    html: `Could not find: ${ title }` 
  }

  if (!cache[title]) {
    console.log('rendering title')
    cache[title] = (await render({ 
      title: meta.title, 
      link: `https://webdev.rip${ meta.link }`, 
      summary: meta.summary, 
      author: 'Brian LeRoux',
      published:  'Posted on ' + new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(meta.date)), 
    })).toString('base64')
  }

  // set cache-control headers in production
  let cacheControl = process.env.ARC_ENV === 'production'
    ? 'max-age=3600;'
    : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  return {
    statusCode: 200,
    headers: { 
      'content-type': 'image/jpeg', 
      'cache-control': cacheControl
    },
    isBase64Encoded: true,
    body: cache[title]
  } 
}
