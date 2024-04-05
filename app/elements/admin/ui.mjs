export default function ui ({ html, state }) {
  return html` <!-- admin -->
<style>
:host section { 
  margin-bottom: 25px;
}

:host legend {
  font-family: monospace;
  background: black;
  color:grey;
  padding: 10px;
  border-radius: 3px;
}
:host fieldset {
  border: 2px solid black;
  border-radius: 3px;
  padding: 25px;
  display:flex;
  flex-direction: column;
}
:host label {
  font-family: monospace;
  font-size:.5em;
}

:host input {
  margin-bottom: 25px;
  padding: 10px;
  border-radius: 3px;
  border: 1px dotted #ccc;
  font-size:1em;
}

:host button {
  background: black;
  font-family: monospace;
  color:white;
  padding: 5px;
  border-radius: 3px;
  max-width: 200px;
  border: 1px solid black;
}
</style>

<section>
  <h2>Admin</h2>
  <form action=/logout method=post>
    <button>logout</button>
  </form> 
</section>

<section>
  <form action=/webmention method=post>
    <fieldset>
      <legend>post /webmention</legend>
      
      <label for=source>source</label>
      <input type=text name=source>

      <label for=target>target</label>
      <input type=text name=target value=https://webdev.rip/first-post>
      
      <button type=submit>send webmention</button>
    </fieldset>
  </form>

<script type=module>
customElements.define('admin-ui', class Admin extends HTMLElement {
  constructor() { 
    super() 
  }
  connectedCallback() {
    let form = document.querySelector('form[action="/webmention"]')
    form.onsubmit = function (e) {
      e.preventDefault()
      console.log(e.target)
    }
  }
})
</script>
  <hd-debug></hd-debug>
</section> `
}
