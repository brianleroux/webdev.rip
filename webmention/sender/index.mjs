import arc from '@architect/functions'
import getLinks from './get-links.mjs'
import discover from './discover.mjs'

export async function handler () {

  // only send mentions in production
  if (process.env.ARC_ENV != 'production')
    return

  // grab a ddb client to use later
  let db = await arc.tables()

  // read all posts from api endpoint
  let posts = await (await fetch('https://webdev.rip/notes', {
    accept: 'application/json'
  })).json()

  for (let post of posts) {

    // full url for a post
    let source = 'https://webdev.rip' + post.link

    // see if the post is in the db (source: url, target: date)
    let record = await db.webmentions.query({
      KeyConditionExpression: '#source = :source and #target = :target',
      ExpressionAttributeNames: {
        '#source': 'source',
        '#target': 'target'
      },
      ExpressionAttributeValues: {
        ':source': source,
        ':target': post.date
      }
    })

    // only send mentions if we haven't already
    if (record.Count === 0) { 

      // read full html text for post url
      let html = await (await fetch(source)).text()
     
      // get all the links in the page
      let links = getLinks(html)
     
      // find webmention endpoint for links if they exist
      let endpoints = {}
      for (let link of links) {
        let found = await discover(link)
        if (found) endpoints[link] = found
      }
     
      // send mentions to every link with an endpoint
      for (let link of Object.keys(endpoints)) {
        await arc.events.publish({
          name: 'webmention-send',
          payload: { source, target: link, endpoint: endpoints[link] }
        })
      }
     
      // once the post is processed add a row in the db so we don't check again
      await db.webmentions.put({
        source,
        target: post.date
      }) 
    }
  }
}

