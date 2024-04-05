export default class Admin extends HTMLElement {

  constructor () { 
    super() 
  }

  submit (e) {
    console.log('called submit', e)
    e.preventDefault()
    let data = new FormData(e.target)
    let body = new URLSearchParams(data).toString()
    console.log(body)
    fetch('/webmention', { 
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body
    }).then(res => {
      console.log(res)
    }).catch( e => {
      console.log(e)
    })
  }

  connectedCallback() {
    let form = this.querySelector('form[action="/webmention"]')
    form.onsubmit = this.submit.bind(this)
  }
}
