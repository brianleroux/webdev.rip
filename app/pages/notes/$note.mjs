import prism from 'prismjs'
import load from 'prismjs/components/index.js'
import {parse, serialize} from 'parse5'

export default function note ({state}) {

  load(['bash', 'http'])

  // format dates pretty
  for (let n of state.store.meta)
    n.date = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(n.date)) 

  // syntax highlight on the backend
  let doc = parse(state.store.note)
  function walk(nodes) {
    for (let n of nodes) {
      if (n.childNodes) walk(n.childNodes)
      if (n.nodeName === 'hd-code' && n.tagName === 'hd-code') {
        let raw = n.childNodes[0].value
        let languages = {
          bash: Prism.languages.bash,
          javascript: Prism.languages.javascript,
          html: Prism.languages.html,
          http: Prism.languages.http,
          css: Prism.languages.css,
        }
        let lang = n.attrs.find(a => a.name = 'type').value
        let html = Prism.highlight(raw, languages[lang], lang)
        let nodes = parse(html).childNodes[0].childNodes.find(n => n.nodeName === 'body')
        n.childNodes = nodes.childNodes
      }
    }
  }
  walk(doc.childNodes)

  return serialize(doc)
}
