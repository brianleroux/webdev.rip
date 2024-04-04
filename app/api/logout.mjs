export let post = logout
export let get = logout

async function logout () {
  return { 
    location: '/',
    session: { loggedIn: false }
  }
}
