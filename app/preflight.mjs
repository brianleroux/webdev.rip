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
        tags: ['webdev', 'serverless', 'philosophy'],
        date: '2024-03-28' 
      },
      {  
        title: 'The Problem with Solutions', 
        summary: 'The best solution to a problem is eliminating the conditions that create that problem rather than adding another solution that creates new unique problems.',
        link: '/notes/the-problem-with-solutions', 
        tags: ['webdev', 'serverless', 'philosophy'],
        date: '2024-03-29' 
      },
      {  
        title: 'Retro Gaming', 
        summary: 'Testing out responsive images with custom elements and Metroid Fusion.',
        link: '/notes/retro-gaming', 
        tags: ['retrogaming'],
        date: '2024-04-01' 
      },
      {  
        title: 'Implementing Open Graph', 
        summary: 'Building out dynamic Open Graph images with AWS Lambda.',
        link: '/notes/implementing-open-graph', 
        tags: ['webdev', 'opengraph', 'serverless', 'backend'],
        date: '2024-04-03' 
      },
      {  
        title: 'JS Modules', 
        summary: 'How to author a JavaScript module.',
        link: '/notes/js-modules', 
        tags: ['webdev', 'backend', 'js', 'node', 'deno'],
        date: '2024-04-03' 
      }, 

      {
        title: 'WTF Sessions', 
        summary: 'WTF are sessions? Why should I care? How do they work?',
        link: '/notes/wtf-sessions', 
        tags: ['webdev', 'backend', 'js', 'node', 'deno', 'sessions'],
        date: '2024-07-15' 

      }
    ]
  }
}
