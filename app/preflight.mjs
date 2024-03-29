export default function preflight () {
  return {  
    pageTitle: 'webdev.rip a blog about webdev',
    domain: 'webdev.rip',
    author: 'Brian LeRoux',
    github_url: 'https://github.com/brianleroux/webdev.rip',
    meta: [
      {  
        title: 'First post!', 
        summary: 'The hello world post.', 
        link: '/notes/first-post', 
        date: '2024-03-28' 
      },
      {  
        title: 'The Problem with Solutions', 
        summary: 'The best solution to a problem is eliminating the conditions that create that problem rather than adding another solution that creates new unique problems.',
        link: '/notes/the-problem-with-solutions', 
        date: '2024-03-29' 
      },
    ]
  }
}
