export default function taglist ({html, state}) {
  let concat = (a, b) => a.concat(b)
  let link = t=> `<hd-tag value=${t}></hd-tag>`
  let items = [...new Set(state.store.meta.map(m=> m.tags).reduce(concat, []))]
  return html`<h2>Tags</h2><p>${ items.map(link).join('') }</p>`
}
