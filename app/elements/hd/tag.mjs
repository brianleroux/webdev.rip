export default function tag({ html, state }) {
  let t = state.attrs.value
  return html`<style>
:host a {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3C!--!--%3E%3Cpath d='M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  text-decoration: none;
  margin: 0 10px 10px 0px;
  display:block;
  background-color:rgba(255, 255, 255, .4);
  border:3px solid rgba(255, 255, 255, .1);
  border-radius:3px;
  padding:3px 3px 3px 33px;
  font-size:small;
}

:host a:hover {
  text-decoration: underline;
}

</style>
<a href=/tags/${t}>${ t }</a>`
}
