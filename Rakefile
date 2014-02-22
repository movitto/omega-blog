# Omega Blog Rakefile

# TODO use native middleman / imagemagick / other ruby apis

require 'fileutils'

desc 'Preview the site'
task 'preview' do
  exec("middleman server -p 4567 --verbose")
end

desc 'Build the special pages'
task 'build_special' do
  ['about', 'docs'].each do |section|
    dir = "./build/#{section}"
    FileUtils.rm_rf dir if File.exists?(dir)
    FileUtils.mkdir_p dir

    FileUtils.ln_s "../#{section}.html", "#{dir}/index.html"
    FileUtils.ln_s '../javascripts',     "#{dir}/javascripts"
    FileUtils.ln_s '../images',          "#{dir}/images"
    FileUtils.ln_s '../stylesheets',     "#{dir}/stylesheets"
  end

  FileUtils.ln_s '.', "build/docs/docs"
end

desc 'Build the site'
task 'build' do
  system("middleman build")
end

desc 'Build Everything'
task 'build_all' => [:build, :build_special] do
end

desc 'Deploy the site'
task 'deploy', [:dest] do |t, args|
  exec("rsync -av build/ #{args.dest}")
end

desc "Adapt specified screenshot to blog"
task "convert_screenshot", [:screenshot] do |t, args|
  Dir.chdir 'source/images/screenshots'
  system("convert #{args.screenshot} -resize 80% #{args.screenshot}1")
  FileUtils.mv "#{args.screenshot}1", args.screenshot
  system("convert #{args.screenshot} -resize 30% thumbs/#{args.screenshot}")
end
