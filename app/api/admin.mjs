import arc from '@architect/functions'
import preflight from '../preflight.mjs'

export async function get (req) {

  // ensure the current session is logged in
  let loggedIn = req.session.loggedIn
  if (!loggedIn) {
    return { json: loggedIn }
  }

  let data = await preflight()
  let db = await arc.tables()

  // load webmentions to verify
  let res = await Promise.all(data.meta.map(post => {
    return db.webmentions.query({
      IndexName: 'target-source-index',
      KeyConditionExpression: '#target = :target and begins_with(#source, :source)',
      ExpressionAttributeNames: {
        '#target': 'target',
        '#source': 'source'
      },
      ExpressionAttributeValues: {
        ':target': 'webdev.rip' + post.link,
        ':source': `WM#UNVERIFIED`
      }
    })
  }))

  return {
    json: { 
      webmentions: res,
      debug: true,
      loggedIn, 
    }
  }
}
