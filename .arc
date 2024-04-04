@app
webdev-rip

@begin
appID K7833DPN

@plugins
enhance/arc-plugin-enhance
enhance/arc-image-plugin

@http
# standalone route for rendering og images
/og-img/:title
  method get
  src og-img

# standalone route for receiving webmentions
/webmention
  method post
  src webmention/endpoint

# route for checking webmention status
/webmention/:status
  method get
  src webmention/status

@scheduled
# checks to see if there are webmentions to send
webmention-sender
  cron 0/5 15-1 ? * MON-FRI * # run every 5min between 8a and 5:55p (PT) from mon-fri
  src webmention/sender

@events
# sends a webmention
webmention-send
  src webmention/send

# saves a webmention
webmention-receive
  src webmention/receive

@tables
# find if we send mentions for a given post
webmentions
  source * # webdev.rip/notes/first-post
  target ** # 2024-03-29 

@indexes
# find all mentions received (target = webdev.rip)
webmentions
  target *
  source **

webmentions
  status *
