export default function notelist ({html, state}) {
  let items = state.store.meta.map(m=> {
    return `<li>${m.date} • <a href=${ m.link }>${ m.title }</a></li>`
  }).reverse().join('')
  return html`<ul>${ items }</ul>`
}
