import arc from '@architect/functions'

// helper that cleans up the aws payload
export let handler = arc.events.subscribe(send)

/** sends a webmention */
async function send ({ source, target, endpoint }) {

  let res = await fetch(endpoint, { 
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: (new URLSearchParams({
      source,
      target
    })).toString()
  })

  console.log(res)
}
