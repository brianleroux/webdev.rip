import { parse } from 'parse5'

/** find all the links for a given html document */
export default function getLinks (html) {

  // walk the html looking for anchor tags with an href attr
  let doc = parse(html)
  let links = []
  ;(function walk (nodes) {
    for (let n of nodes) {
      if (n.childNodes) walk(n.childNodes)
      if (n.tagName === 'a') {
        let href = n.attrs.find(a => a.name === 'href').value
        // only https links pls
        if (href.startsWith('https:')) links.push(href)
      }
    } 
  })(doc.childNodes)

  // remove any references to self
  let self = l => l.startsWith('https://webdev.rip')
  return links.filter(self)
}
