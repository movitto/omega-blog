# Omega Blog Rakefile

# TODO use native middleman / imagemagick / other ruby apis

desc 'Preview the site'
task 'preview' do
  exec("middleman server -p 4567 --verbose")
end

desc 'Build the site'
task 'build' do
  exec("middleman build")
end

desc "Adapt specified screenshot to blog"
task "convert_screenshot", [:screenshot] do |t, args|
  Dir.chdir 'source/images/screenshots'
  system("convert #{args.screenshot} -resize 80% #{args.screenshot}1")
  FileUtils.mv "#{args.screenshot}1", args.screenshot
  system("convert #{args.screenshot} -resize 30% thumbs/#{args.screenshot}")
end
