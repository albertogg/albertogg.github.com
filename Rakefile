# Rakefile for my site.. albertogrespan.com
# Rakefile from @holman https://github.com/holman/holman.github.com.

require 'fileutils'

desc "Creating a new draft for post/entry"
task :new do
  puts "what's the name for your next post? (YYYY-MM-DD-name-of-post)"
  @name = STDIN.gets.chomp
  FileUtils.touch("drafts/_posts/#{@name}.md")
  open("drafts/_posts/#{@name}.md", 'a' ) do |file|
    file.puts "---"
    file.puts "layout: post"
    file.puts "title: #{@name}"
    file.puts "---"
  end
end

desc "start Mou (a markdown editor)"
task :default => [:new] do
  begin
    puts "it's done :D "
    sh "open -a Mou drafts/_posts/#{@name}.md"
  rescue => e
    rollback
    puts e.message
  end
end

def rollback
  puts "removing post"
  begin
    FileUtils.rm("drafts/_posts/#{@name}.md")
    puts "post removed!"
  rescue => e
    puts "Error removing post, it may not exist!"
    puts e.message
  end
end

desc "copy draft to production post!"
task :copy do
  puts "what's the name of the draft to post?"
  @poster = STDIN.gets.chomp
  sh "cp drafts/_posts/#{@poster}.md _posts/#{@poster}.md"
  puts "COPIED SIR!"
end

# Rubygems compile rake task.
desc "compile and run the site"
task :server do
  pids = [
    spawn("jekyll --server 3000"),
    spawn("scss --watch css/scss:css")
  ]

  trap "INT" do
    Process.kill 0, *pids
    exit 0
  end

  loop do
    sleep 1
  end
end
