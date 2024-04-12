export default function notelist ({html, state}) {
  // walk the posts and mark them up
  let items = state.store.meta.map(m=> {
    let d = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(m.date)) 
    return `<li><time datetime=${m.date}>${d}</time> • <a href=${ m.link }>${ m.title }</a></li>`
  }).reverse().join('')

  return html`

<style>
:host ul {
  font-family: monospace;
  list-style: none;
  margin: 0;
  padding: 0;
}
:host ul li {
  display: flex;
}
:host time {
  text-align: right;
  margin-right: 10px;
}
:host a {
  margin-left: 10px;
}
</style>

<ul>${ items }</ul>`
}
