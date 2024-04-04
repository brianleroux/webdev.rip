import { parse } from 'parse5'

export default function getLinks(html) {
  let doc = parse(html)
  let links = []
  ;(function walk (nodes) {
    for (let n of nodes) {
      if (n.childNodes) walk(n.childNodes)
      if (n.tagName === 'a') {
        let href = n.attrs.find(a => a.name === 'href').value
        if (href.startsWith('https:')) links.push(href)
      }
    } 
  })(doc.childNodes)
  return links
}

