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
# this is for webmentions we send
#
# remembers sent webmentions for a given post and date (or update)
webmentions
  source *  # webdev.rip/notes/first-post
  target ** # 2024-03-29 
  #endpoint # external-website.com/webmention/endpoint

@tables-indexes
# these indexes are for webmentions we receive
#
# IndexName: 'target-source-index'
# find all mentions "target = webdev.rip and begins_with('WM#')"
# find all unverified "target = webdev.rip and begins_with(:source, 'WM#UNVERIFIED#')"
webmentions
  target *  # webdev.rip/notes/first-post
  source ** # WM#COMMENT#f.b/z or WM#LIKE#f.b/z or WM#UNVERIFIED#a.b/c
  #status   # xxxxxxxx
  #created  # 2024-04-04

# IndexName: 'status-index'
# KeyConditionExpression: '#status = :status'
webmentions
  status *
