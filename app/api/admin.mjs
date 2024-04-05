import arc from '@architect/functions'

export async function get (req) {

  // ensure the current session is logged in
  let loggedIn = req.session.loggedIn
  if (!loggedIn) {
    return {  
      loggedIn
    }
  }

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
      debug: true,
      loggedIn, 
      webmentions: res.Count > 0? res.Items : [] 
    }
  }
}
