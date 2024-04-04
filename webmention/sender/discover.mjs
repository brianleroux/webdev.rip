import { parse } from 'parse5'

/** function to discover a webmention endpoint */
export default async function discover (source) {

  // look for first Link in headers
  let found = []
  let raw = await fetch(source, {
    redirect: 'follow',
    follow: 10
  })

  for (let [k, v] of raw.headers.entries()) {
    if (k.toLowerCase() === 'link') {
      let raw = v.split(',')
      for (let h of v.split(',')) {
        let [l, r] = h.split(';')
        let rel = r.replace('rel', '').replace('=', '').replace(/\"|\'/g, '').trim().toLowerCase()
        if (rel === 'webmention') found.push(cleanHeader(source, l))
      }
    }
  }

  // look for <link> and <a>
  let html = await raw.text()
  let doc = parse(html)
  let links = []

  ;(function walk (nodes) {
    for (let n of nodes) {
      if (n.childNodes) walk(n.childNodes)
      if (n.tagName === 'link' && n.attrs?.find(a => a.name === 'rel' && a.value.split(' ').includes('webmention')) && n.attrs?.find(a => a.name === 'href')) {
        let raw = n.attrs.find(a => a.name === 'href').value
        if (raw.length)
          found.push(cleanTag(source, raw))
      }
      if (n.tagName === 'a' && n.attrs?.find(a => a.name === 'rel' && a.value === 'webmention') && n.attrs?.find(a => a.name === 'href')) {
        let raw = n.attrs.find(a => a.name === 'href').value
        if (raw.length)
          found.push(cleanTag(source, raw))
      }
    } 
  })(doc.childNodes);

  return found.length? found[0] : false
}

/** helper to extract a url from Link header value */
function cleanHeader(src, h) {
  let exp = /<([^>]*)>/
  let matches = h.match(exp)
  let raw = matches ? matches[1] : false
  // absolute path
  if (raw.startsWith('/'))
    return (new URL(src)).origin + raw
  // relative path
  if (raw.startsWith('http') === false) {
    let bits = raw.split('/')
    bits.shift()
    return src + '/' + bits.join('/')
  }
  // cannonical path
  return raw
}

/** helper to extract a url from <link> tag href */
function cleanTag(src, raw) {
  // absolute path
  if (raw.startsWith('/'))
    return (new URL(src)).origin + raw
  // relative path
  if (raw.startsWith('http') === false) {
    let bits = raw.split('/')
    bits.shift()
    return src + '/' + bits.join('/')
  }
  // cannonical path
  return raw
}
