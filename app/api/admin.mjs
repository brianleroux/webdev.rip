import arc from '@architect/functions'

export async function get (req) {

  // ensure the current session is logged in
  let loggedIn = req.session.loggedIn
  if (!loggedIn) 
    return { location: '/' }

  // get a db client
  let db = await arc.tables()

  // load webmentions to verify
  let res = await db.webmentions.query({
    IndexName: 'verified-index',
    KeyConditionExpression: '#verified = :verified',
    ExpressionAttributeNames: {
      '#verified': 'verified'
    },
    ExpressionAttributeValues: {
      ':verified': 'unverified'
    }
  })

  return {
    json: { 
      loggedIn, 
      webmentions: res.Count > 0? res.Items : [] 
    }
  }
}
