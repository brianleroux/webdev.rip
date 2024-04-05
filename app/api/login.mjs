export async function post (req) {
  console.log(req)
  let loggedIn = req.body.password === process.env.PASSWORD
  return { 
    location: '/admin',
    session: { loggedIn },
    json: { loggedIn }
  }
}
