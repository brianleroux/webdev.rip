import arc from '@architect/functions'

export let handler = arc.events.subscribe(send)

async function send (event) {
  console.log('received payload to send', event)
}
