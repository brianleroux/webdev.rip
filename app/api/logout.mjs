export let post = logout
export let get = logout

async function logout (req) {
  return { 
    location: '/',
    session: { loggedIn: false }
  }
}
