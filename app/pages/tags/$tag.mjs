export default function tag ({html, state}) {
  return html`<hd-layout>
    <h1>Note tagged with <a href=/tags/${state.store.tag}>${state.store.tag}</a></h1>
  <hd-note-list></hd-note-list>
  <hd-avatar></hd-avatar>
</hd-layout>`
}
