# Omega Blog Rakefile

# TODO use native middleman / imagemagick / other ruby apis

require 'fileutils'

desc 'Preview the site'
task 'preview' do
  exec("middleman server -p 4567 --verbose")
end

desc 'Build the special pages'
task 'build_special' do
  about_page = './build/about/index.html' 
  docs_page  = './build/docs/index.html'

  FileUtils.mkdir_p './build/about'
  FileUtils.rm_f about_page if File.exists?(about_page)
  FileUtils.rm_f docs_page  if File.exists?(docs_page)
  FileUtils.ln_s '../about.html', about_page
  FileUtils.ln_s '../docs.html',  docs_page
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
