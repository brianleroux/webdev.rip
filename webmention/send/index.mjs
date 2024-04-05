import arc from '@architect/functions'

// helper that cleans up the aws payload
export let handler = arc.events.subscribe(send)

/** sends a webmention */
async function send ({ source, target, endpoint }) {

  // send the mention
  let res = await fetch(endpoint, { 
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: (new URLSearchParams({
      source: `https://` + source,
      target
    })).toString()
  })

  // add a record for debugging
  let db = await arc.tables()
  await db.webmentions.put({
    endpoint,
    source, 
    target: target.replace('https://', ''), 
    created: new Date(Date.now()).toISOString()
  })

  console.log(endpoint, res.status)
}
