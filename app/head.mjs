let css = `
:root {
	--foreground: #212529;
	--background: #f8f9fa;
	--link: #0b7285;
	--accent: #868e96;
  --accent2: #ccc;
  --token-keyword: #cc99cd;
  --token-string: #7ec699;
}

@media (prefers-color-scheme: dark) {
	:root {
		--foreground: #eee;
		--background: #222;
		--link: #99e9f2;
		--accent: #ced4da;
    --accent2: #666;
    --token-keyword: #c046c1;
    --token-string: #388354;
	}
}

* {
	box-sizing: border-box;
}

body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: 120%;
	color: var(--foreground);
	background: var(--background);
}

header nav { 
  display: flex;
}

header nav a {
	display: block;
	text-decoration: none;
	margin-right: .71em;
}

header nav a:hover {
  text-decoration: underline;
}

header nav a:first-child {
  font-weight: bolder;
}

h1, h2, h3, h4, h5, h6 {
	font-family: serif;
	margin: 1rem 0;
}

h2 {
  margin: 2rem 0 0 0 ;
}

p, li {
	line-height: 160%;
}

header, main, footer {
	max-width: 60em;
	margin: 2em auto;
	padding: 0 1em;
}

header {
	margin-top: 4em;
}

footer p {
	margin-top: 5em;
	font-size: 90%;
	text-align: center;
}

a:link { color: var(--link); }
a:visited { color: var(--link); }
a:hover { color: var(--link); }
a:active { color: var(--link); }

hr {
	border: 0;
	height: 1px;
	background: #333;
	margin: 2em 0;
}

img {
	display: block;
	width: auto;
	height: auto;
	max-width: 100%;
}

table {
	border-collapse: collapse;
}

td, th {
	padding: .75em;
	text-align: left;
	border: 1px solid var(--accent);
}
`

export default function head (req) {
  let og = req.store.note? req.store.link.replace('notes', 'og-img') : '/_public/og-image-default.jpg'
  let link = req.store.note? req.store.link : (req.req.path || '')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <title>webdev.rip</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" sizes="180x180" href="/_public/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/_public/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/_public/favicon-16x16.png">
  <link rel="manifest" href="/_public/site.webmanifest">

  <meta name="description" content="Musings about webdev.">
  <meta property=og:title content="webdev.rip - a web developers blog by Brian LeRoux">
  <meta property=og:type content=website>
  <meta property=og:url content=https://webdev.rip${ link }>
  <meta property=og:image content=https://webdev.rip${ og }>
  <style>${css}</style>
</head>`
}
