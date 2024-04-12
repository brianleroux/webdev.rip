import arc from '@architect/functions'
import preflight from '../preflight.mjs'

export let post = [auth, write]
export let get = [auth, read]

/** ensure the current session is logged in */
async function auth (req) {
  let loggedIn = req.session.loggedIn
  if (!loggedIn) {
    return { 
      json: { loggedIn }
    }
  }
}

/** load mentions to verify manually */
async function read (req) {

  let loggedIn = req.session.loggedIn
  let data = await preflight()
  let db = await arc.tables()

  // load webmentions to verify
  let res = await Promise.all(data.meta.map(post => {
    let target = 'webdev.rip' + post.link
    return db.webmentions.query({
      IndexName: 'target-source-index',
      KeyConditionExpression: '#target = :target and begins_with(#source, :source)',
      ExpressionAttributeNames: {
        '#target': 'target',
        '#source': 'source'
      },
      ExpressionAttributeValues: {
        ':target': target,
        ':source': `UNVERIFIED#`
      }
    })
  }))

  return {
    json: { 
      webmentions: res.reduce((a, b) => a.concat(b.Items), []),
      debug: true,
      loggedIn, 
    }
  }
}

/** currently...a place to send payloads to webmention-receive */
async function write (req) {
  if (req.body.action === 'reload') {
    await arc.events.publish({
      name: 'webmention-receive',
      payload: req.body 
    }) 
  }
  if (req.body.action === 'delete') {
    let db = await arc.tables()
    let { source, target } = req.body
    await db.webmentions.delete({source, target})
  }
  return { 
    location: '/admin'
  }
}
