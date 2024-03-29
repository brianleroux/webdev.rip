export default function article ({state, html }) {
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
</style>
<hd-layout>
  <article class=h-entry>
    <h1 class=p-name>${ state.attrs.title }</h1>
    <p class=p-summary style=display:none;>${ state.attrs.summary }</p>
    <section class=e-content><slot></slot></section>
    <hd-avatar>on ${ state.attrs.published }</hd-avatar>
  </article>
  <hd-debug></hd-debug>
</hd-layout>`
}

