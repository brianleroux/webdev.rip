export async function post (req) {
  let loggedIn = req.body.password === process.env.PASSWORD
  console.log({...process.env, loggedIn})
  return { 
    location: '/admin',
    session: { loggedIn },
    json: { loggedIn }
  }
}
