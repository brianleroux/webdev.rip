export async function post (req) {
  let count = 0
  return { 
    session: { count }, 
    location: '/notes/wtf-sessions' 
  }
}

