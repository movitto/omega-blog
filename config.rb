# Omega Blog settings

Time.zone = "US/Eastern"

activate :blog do |blog|
  blog.permalink = "posts/:title.html"
  blog.sources   = "posts/:year-:month-:day-:title.html"
end

page "/feed.xml", layout: false

page "/about.html",    layout: 'basic'
page "/docs.html",     layout: 'basic'
page "/docs/*",        layout: false

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
end
