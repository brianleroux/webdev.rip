import preflight from '../preflight.mjs'

const data = preflight()

export async function get () {
  let entries = data.meta.map(m => {
    return `<entry>
      <title>${ m.title }</title>
      <link href="https://${data.domain}${m.link}"/>
      <updated>${m.date}T02:40:00Z</updated>
      <summary>${m.summary}</summary>
    </entry>`
  }).join('')
  return {
    headers: {
      'content-type': 'application/atom+xml',
    },
    body: `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${data.pageTitle}</title>
  <link href="http://${data.domain}/"/>
  <author>
    <name>${data.author}</name>
  </author>
  ${ entries }
</feed>`
  }
}
