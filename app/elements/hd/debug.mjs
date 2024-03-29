export default function debug ({html, state}) {
  if (state.store.debug) 
    return html`<pre><code>${JSON.stringify(state, null, 2)}</code></pre>`
  return ''
}
