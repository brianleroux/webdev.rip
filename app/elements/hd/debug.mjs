export default function debug ({html, state}) {
  if (state.store.debug) {
    return html`<hr><details>
      <summary>view state</summary>
      <pre><code>${JSON.stringify(state, null, 2)}</code></pre>
    </details>`
  }
  else {
    return ''
  }
}
