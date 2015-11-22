###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
# activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

###
# Gem
###
require 'slim'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  ###
  # Compass
  ###

  # Change Compass configuration
  compass_config do |config|
    config.output_style = :compressed
  end

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"

  # Activate google-analytics extension
  activate :google_analytics do |ga|
    ga.tracking_id = ENV['GA_TRACKING_ID']
  end
end

configure :development do
  activate :livereload
  # Activate google-analytics extension
  activate :google_analytics do |ga|
    ga.tracking_id = false
  end
end

# Activate sync extension
activate :sync do |sync|
  sync.fog_provider = 'AWS'
  sync.fog_directory = 'nakayoshi.kyokutyo.com'
  sync.fog_region = 'ap-northeast-1'

  # AWSアクセスキーID
  sync.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']

  # AWSシークレットアクセスキー
  sync.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']

  # アップロード時に既存ファイルを削除するかどうか。`delete`または`keep`
  sync.existing_remote_files = 'keep'

  # ファイルをgzip圧縮したもので置き換えるかどうか。`true`または`false`
  sync.gzip_compression = true

  # Middlemanのビルド完了後に自動で同期を行うかどうか。`true`または`false`
  # デフォルトでは行う(`true`)
  sync.after_build = true
end
