import arc from '@architect/functions'

export let handler = arc.http(check)

async function check (req) {

  let status = req.params.status
  let db = await arc.tables()

  // get the webmention for the given status
  let res = await db.webmentions.query({
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeNames: {
      '#status': 'status'
    },
    ExpressionAttributeValues: {
      ':status': status
    }
  })

  // if we found it respond 2xx
  if (res.Count > 0) {
    return {
      code: res.Items[0].verified === 'unverified'? 202 : 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'location': `https://webdev.rip/webmention/${ status }`
      }
    }
  }

  // if we did not find it 404
  return {
    code: 404,
    json: { message: `webmention ${ status } not found` }
  }
}
