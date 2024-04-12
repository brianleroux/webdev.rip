export default function form ({ html, state }) {
  return `<style>
:host details {
  background: #eaeaea;
  padding: 0;
  border-radius: 5px;
}

:host details > summary {
  list-style:none;
  cursor: pointer;
  display: flex; 
  padding: 10px;
  margin: 0;
}

:host hr {
  border-top: 1px solid #fff;
  margin: 0;
  padding: 0;
}

:host details > form {
  margin: 0;
  padding: 0;
  color: darkgrey;
}

:host details > form p {
  margin: 0;
  padding: 10px;
}

:host input {
  font-size: larger;
  padding: 5px;
  font-family: monospace;
  border: 1px solid lightgrey;
  border-radius: 5px;
  min-width: 450px;
  margin: 0 0 10px 10px;
}

:host button[type=submit] {
  font-size: larger;
  margin: 0;
  padding: 5px 10px 5px 10px;
  font-family: monospace;
  color: white;
  background: black;
  border: none;
  border-radius: 5px;
}

:host pre {
  opacity: 0;
  color: green;
  animation: fade 7s;
  display: inline;
  margin: 0;
  padding: 0;
}

@keyframes fade {
  from {opacity :1;}
  to {opacity :0;}
}
</style>
<details ${state.attrs.problem? 'open' : ''}>
  <summary>
    <hd-like value=${state.attrs.likes || 0}></hd-like>
    <hd-comment value=${state.attrs.comments || 0}></hd-comment>
    <pre>${state.store.thx}</pre>
  </summary>
  <hr>
  <form method=post action=/webmention>
    <p>${state.attrs.problem? state.attrs.problem : 'Have you published a response to this? <label for=wm-src>Let me know the <abbr title="Uniform Resource Locator">URL</abbr></label>'}</p>
    <input type=url name=source id=wm-src required placeholder="https://webmention.url/source">
    <input type=hidden name=target value=https://webdev.rip/${state.store.link}>
    <button type=submit>share</button>
  </form>
</details>`
}
