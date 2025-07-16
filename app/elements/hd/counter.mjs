export default function counter ({html, state}) {
  return html`
    <style>
    :host {
      display: flex;
      background: lightgrey;
      padding:10px;
      border-radius: 5px;
      font-family: monospace;
      font-size:larger;
      justify-content: center;
      gap: 10px;
    }
    :host strong {
      background-color: yellow;
      padding:5px;
      border-radius: 5px;
    }
    </style>
    <label>Count: <strong>${state.store.count}</strong></label>
    <form action=/counter/incr method=post>
      <button>+1</button>
    </form>
    <form action=/counter/decr method=post>
      <button>-1</button>
    </form>
    <form action=/counter/reset method=post>
      <button>reset</button>
    </form>
  `
}
