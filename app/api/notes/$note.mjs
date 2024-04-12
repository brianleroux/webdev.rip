import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'

// keep all our notes in app/notes 
const cwd = url.fileURLToPath(new URL('.', import.meta.url));
const pathToNotes = path.join(cwd, '..', '..', 'notes')
const notes = fs.readdirSync(pathToNotes)
const cache = {}

export async function get (req) {

  // find the note requested
  let link = notes.find(n=> {
    return n.replace('.html', '') === req.params.note
  })

  // bail early if we don't find it
  if (!link) {
    return { 
      code: 404, 
      json: { message: `${req.params.note} not found` }
    }
  }

  // if we do find it, read it into a tmp cache
  if (!cache[link])
    cache[link] = fs.readFileSync(path.join(pathToNotes, link)).toString('utf-8')
  let note = cache[link]

  // set cache-control headers in production
  let cacheControl = process.env.ARC_ENV === 'production'
    ? 'max-age=3600;'
    : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  // copy the session
  let session = {...req.session}

  // if there is a problem, extract it from the session
  let problem = '' 
  if (req.session.problem) {
    problem = req.session.problem
    delete session.problem
  }

  let thx = req.query.wm? 'Thanks for sharing' : ''

  // return the response
  return {
    session,
    headers: { 
      'cache-control': cacheControl 
    },
    json: {
      thx,
      note,
      problem,
      link: `/notes/${ link.replace('.html', '') }`
    }
  }
}
