# Rakefile for my site.. albertogrespan.com
# Rakefile from @holman https://github.com/holman/holman.github.com.

require 'fileutils'

namespace :draft do
  desc "Creating a new draft for post/entry"
  task :new do
    puts "What's the name for your next post?"
    @name = STDIN.gets.chomp
    @slug = "#{@name}"
    @slug = @slug.tr('ÁáÉéÍíÓóÚú', 'AaEeIiOoUu')
    @slug = @slug.downcase.strip.gsub(' ', '-')
    FileUtils.touch("_drafts/#{@slug}.md")
    open("_drafts/#{@slug}.md", 'a' ) do |file|
      file.puts "---"
      file.puts "layout: post"
      file.puts "title: #{@name}"
      file.puts "description: 155 char description"
      file.puts "category: blog or wiki"
      file.puts "tag: blog or wiki"
      file.puts "---"
    end
  end

  desc "copy draft to production post!"
  task :ready do
    puts "Posts in _drafts:"
    Dir.foreach("_drafts") do |fname|
      next if fname == '.' or fname == '..' or fname == '.keep'
      puts fname
    end
    puts "what's the name of the draft to post?"
    @post_name = STDIN.gets.chomp
    @post_date = Time.now.strftime("%F")
    FileUtils.mv("_drafts/#{@post_name} _posts/#{@post_name}")
    FileUtils.mv("_posts/#{@post_name}", "_posts/#{@post_date}-#{@post_name}")
    puts "Post copied and ready to deploy!"
  end
end

# Rubygems compile rake task.
desc "compile and run the site"
task :server do
  pids = [
    spawn("jekyll serve --watch --port 3000 --drafts"),
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
