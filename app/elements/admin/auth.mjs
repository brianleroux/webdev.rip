export default function admin ({html, state}) {
  let auth = state.store.loggedIn || false
  let page = auth? `<admin-ui></admin-ui>` : `<admin-login></admin-login>`
  return html`${ page }`
}
