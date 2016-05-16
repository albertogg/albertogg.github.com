require "fileutils"

namespace :draft do
  desc "Creates a new draft post with the given name"
  task :new, [:draft_name] do |t, args|
    name = args.fetch(:draft_name)
    slug = "#{name}"
    slug = slug.tr("ÁáÉéÍíÓóÚúÜü", "AaEeIiOoUuUu")
    slug = slug.downcase.strip.gsub(" ", "-")
    FileUtils.touch("_drafts/#{slug}.md")
    open("_drafts/#{slug}.md", "a" ) do |file|
      file.puts "---"
      file.puts "layout: post"
      file.puts "title: #{name}"
      file.puts "description: 155 char description"
      file.puts "category: blog"
      file.puts "tag: blog"
      file.puts "---"
    end
  end

  desc "Moves draft into _post directory"
  task :publish, [:draft_name, :draft_date] do |t, args|
    new_post = args.fetch(:draft_name)
    new_post_date = args.fetch(:draft_date, Time.now.strftime("%F"))
    FileUtils.mv("_drafts/#{new_post}", "_posts/#{new_post}")
    FileUtils.mv("_posts/#{new_post}", "_posts/#{new_post_date}-#{new_post}")
    puts "Post published!"
  end
end
