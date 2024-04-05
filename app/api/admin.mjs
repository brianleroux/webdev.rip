import arc from '@architect/functions'

export async function get (req) {

  // ensure the current session is logged in
  let loggedIn = req.session.loggedIn
  if (!loggedIn) return { location: '/' }

  // load webmentions to verify
  let db = await arc.tables()
  let webmentions = await db.webmentions.query({

  })

  return {
    session: { loggedIn },
    json: { loggedIn }
  }
}
