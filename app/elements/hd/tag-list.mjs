export default function taglist ({html, state}) {
  let concat = (a, b) => a.concat(b)
  let link = t=> `<li><a href=/tags/${t}>${t}</a></li>`
  let items = [...new Set(state.store.meta.map(m=> m.tags).reduce(concat, []))]
  return html`<h2>Tags</h2><ul>${ items.map(link).join('') }</ul>`
}
