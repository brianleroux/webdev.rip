import arc from '@architect/functions'

export async function handler () {

  // grab a ddb client to use later
  let data = await arc.data()

  // read all posts from api endpoint
  let posts = await (await fetch('https://webdev.rip/notes', {
    accept: 'application/json'
  })).json()

  for (let post of posts) {

    // see if the post is in the db
    let record = await data.webmentions.query({
      KeyConditionExpression: 'source = :source and target = :target',
      ExpressionAttributeValues: {
        ':source': 'https://webdev.rip' + post.link,
        ':target': post.date
      }
    })

    // get all the links in the page
    console.log({record})

    // attempt to discover the webmention endpoint for each link
    // send mentions to every link with an endpoint
    // once the post is processed add a row in the db so we don't check again
  }
}
