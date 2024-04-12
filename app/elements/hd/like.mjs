export default function like ({ html, state }) {
  let v = state.attrs.value === "0"? '&nbsp;' : state.attrs.value
  return html`<style>
:host span {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNS4yIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTQ3LjYgMzAwLjRMMjI4LjMgNDY5LjFjNy41IDcgMTcuNCAxMC45IDI3LjcgMTAuOXMyMC4yLTMuOSAyNy43LTEwLjlMNDY0LjQgMzAwLjRjMzAuNC0yOC4zIDQ3LjYtNjggNDcuNi0xMDkuNXYtNS44YzAtNjkuOS01MC41LTEyOS41LTExOS40LTE0MUMzNDcgMzYuNSAzMDAuNiA1MS40IDI2OCA4NEwyNTYgOTYgMjQ0IDg0Yy0zMi42LTMyLjYtNzktNDcuNS0xMjQuNi0zOS45QzUwLjUgNTUuNiAwIDExNS4yIDAgMTg1LjF2NS44YzAgNDEuNSAxNy4yIDgxLjIgNDcuNiAxMDkuNXoiLz48L3N2Zz4=");
  background-repeat: no-repeat;
  font-family: monospace;
  display:block;
  padding-left: 20px;
  width: fit-content;
  block-size: fit-content;
}
</style><span>${v}</span>`
}
