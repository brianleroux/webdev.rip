export default function unverified ({html, state }) {
  let ui = '<h2>Unverified webmentions</h2>'
  for (let r of state.store.webmentions) { 
    let src = r.source.replace('UNVERIFIED#', '')
    ui += `<details>
      <summary><a href=https://${src}>${ src }</a> &rarr; ${ r.target } </summary>
      <p>
        <form action=/admin method=post>
          <input type=hidden name=action value=reload>
          <input type=hidden name=source value=${ r.source }>
          <input type=hidden name=target value=${ r.target }>
          <button>reload</button>
        </form>
        <form action=/admin method=post>
          <input type=hidden name=action value=delete>
          <input type=hidden name=source value=${ r.source }>
          <input type=hidden name=target value=${ r.target }>
          <button>delete</button>
        </form>
      </p>
    </details>`
  }
  return html`${ ui }`
}
