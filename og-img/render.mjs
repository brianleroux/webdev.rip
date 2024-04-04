import jimp from 'jimp'
import path from 'node:path'

export default async function render ({title, link, summary, author, published }) {

  const dir = import.meta.dirname
  const base = path.join(dir, 'og-image.jpg')
  const img = await jimp.read(base)
  const serif = await jimp.loadFont(path.join(dir, `calistoga-white-72.fnt`))
  const sans = await jimp.loadFont(jimp.FONT_SANS_32_WHITE)
  const sansmol = await jimp.loadFont(jimp.FONT_SANS_16_WHITE) 

  // write the title
  img.print(serif, 60, 60, title)

  // draw the summary; maybe doing a cheesy line wrap
  let tokens = summary.split(/\s+/)
  let max = 10
  let y = 180

  if (tokens.length > max) {
    let lines = []
    for (let i = 0; i < tokens.length; i += max) {
      lines.push(tokens.slice(i, i + max))
    }
    for (let line of lines) {
      img.print(sans, 60, y, line.join(' '))
      y += 32
    }
  }
  else {
    img.print(sans, 60, y, summary)
  }

  // draw the footer stuff
  img.print(serif, 320, 400, author)
  img.print(sansmol, 320, 480, published)
  img.print(sans, 320, 512, link)

  return img.getBufferAsync(jimp.MIME_JPEG)
}
