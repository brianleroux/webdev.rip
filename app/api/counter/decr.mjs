export async function post (req) {
  let count = req.session.count || 0
  if (count > 0) count -= 1
  return { 
    session: { count }, 
    location: '/notes/wtf-sessions' 
  }
}
