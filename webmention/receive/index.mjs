import arc from '@architect/functions'

export let handler = arc.events.subscribe(receive)

async function receive ({source, target, status, verified, created }) {
  console.log(JSON.stringify({source, target, status, verified, created }, null, 2))
  return
}
