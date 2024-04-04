export async function handler () {
  console.log('hi from webmention/sender handler')
  let req = await fetch('https://webdev.rip/notes')
  let posts = await req.json()
  console.log(posts)
  /*
   * get posts
  for (let post of posts) {
    // see if the  post is in the db
    // get all the links in the page
    // attempt to discover the webmention endpoint for each link
    // send mentions to every link with an endpoint
    // once the post is processed add a row in the db so we don't check again
  }
  */
}
