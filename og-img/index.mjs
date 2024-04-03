import preflight from '@architect/views/preflight.mjs'
import arc from '@architect/functions'
import render from './render.mjs'

export let handler = arc.http(fn)

async function fn (req) {

  let title = req.params.title
  let data = await preflight(req)
  let meta = data.meta.find(e => e.link === `/notes/${ title }`)

  if (!meta) return {
    code: 404, 
    html: `Could not find: ${ title }` 
  }

  let out = await render({ 
    title: meta.title, 
    link: `https://webdev.rip${ meta.link }`, 
    summary: meta.summary, 
    author: 'Brian LeRoux',
    published:  'Posted on ' + new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(meta.date)), 
  })

  return {
    statusCode: 200,
    headers: { 
      'content-type': 'image/jpeg', 
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0' 
    },
    isBase64Encoded: true,
    body: out.toString('base64')
  } 
}
