export default function article ({state, html }) {

  let meta = state.store.meta.find(n=> {
    return n.link === state.store.link
  })

  return html`<style>

h1, h2, h3, h4, h5, h6 {
	font-family: serif;
	margin: 1rem 0;
}

h1 {
  font-size:3em;
}

h2 {
  margin: 2rem 0 0 0 ;
}

p, li {
	line-height: 160%;
}

blockquote {
  margin: 2rem 0;
  padding: 2rem;
  border-left: 10px solid var(--foreground);
  background: var(--accent2);
}

</style>

<hd-layout>
  <article class=h-entry>
    <h1 class=p-name>${ meta.title }</h1>
    <p class=p-summary style=display:none;>${ meta.summary }</p>
    <section class=e-content><slot></slot></section>
    <hd-avatar>on ${ meta.date }</hd-avatar>
  </article>
  <hd-debug></hd-debug>
</hd-layout>`
}
