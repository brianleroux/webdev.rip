export default function comment ({ html, state }) {
  let v = state.attrs.value === "0"? '&nbsp;' : state.attrs.value
  return html`<style>
:host span {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNS4yIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTUxMiAyNDBjMCAxMTQuOS0xMTQuNiAyMDgtMjU2IDIwOGMtMzcuMSAwLTcyLjMtNi40LTEwNC4xLTE3LjljLTExLjkgOC43LTMxLjMgMjAuNi01NC4zIDMwLjZDNzMuNiA0NzEuMSA0NC43IDQ4MCAxNiA0ODBjLTYuNSAwLTEyLjMtMy45LTE0LjgtOS45Yy0yLjUtNi0xLjEtMTIuOCAzLjQtMTcuNGwwIDAgMCAwIDAgMCAwIDAgLjMtLjNjLjMtLjMgLjctLjcgMS4zLTEuNGMxLjEtMS4yIDIuOC0zLjEgNC45LTUuN2M0LjEtNSA5LjYtMTIuNCAxNS4yLTIxLjZjMTAtMTYuNiAxOS41LTM4LjQgMjEuNC02Mi45QzE3LjcgMzI2LjggMCAyODUuMSAwIDI0MEMwIDEyNS4xIDExNC42IDMyIDI1NiAzMnMyNTYgOTMuMSAyNTYgMjA4eiIvPjwvc3ZnPg==");
  background-repeat: no-repeat;
  font-family: monospace;
  display:block;
  padding-left: 20px;
  width: fit-content;
  block-size: fit-content;
}
</style><span>${v}</span>`
}
