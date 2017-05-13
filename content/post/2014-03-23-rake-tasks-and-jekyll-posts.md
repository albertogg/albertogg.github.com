---
categories:
- blog
date: 2014-03-23T00:00:00Z
description: Creating posts in Jekyll can become painful sometimes, stop repeating
  yourself and use a custom Rake Task. Thanks Jim.
tag: blog
title: Rake tasks & Jekyll posts
url: /2014/03/23/rake-tasks-and-jekyll-posts/
---

> tl;dr use Rake tasks to create drafts/posts in Jekyll.

Creating a draft or a new post is a repetitive task. If you are like me and often forget about things you probably need some automation in your life; if you don't, you can use this and start forgetting.

In this post I'll be talking about some Rake tasks I use that help me create and publish drafts for my Jekyll blog.

## Story

For the last 2 years that I almost didn't blog at all, I was using two Rake tasks *stolen* from [Zack Holman](http://zachholman.com/) to create blog posts within Jekyll. At that time Jekyll was a bit different and both the *stolen* tasks and blog needed an update. A few weeks ago (february 2014) I revamped my blog completely including the Rake tasks. This was the end result:

## New tasks *"tasks"*

Here, I explain a bit what each task does:

Creating a new draft:

- Ask for a post title.
- Create a slug with that title
- Downcase the slug and change spaces with dashes.
- Remove any accents of words from the slug.
- Create a new `.md` file in the `_drafts` directory and use the new slug as file name.
- Add the front-matter to the file with: layout, title, description, category and tag.

When draft is ready:

- List drafts on the `_drafts` directory.
- Ask for the name of the *draft* that's ready to be published.
- Move the draft from the `_drafts` directory into the `_posts`.
- Rename the file by adding the current date to the file name.

> These features are a WIP but they work fine ATM.

## The code

To use these tasks: you must create a `Rakefile` file; drop the code, and save the file. If you already have a `Rakefile` and you plan to use them, I hope that the namespace will prevent a collision with any of you existing tasks.

```ruby
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
      file.puts "description: maximum 155 char description"
      file.puts "category: blog"
      file.puts "tag: blog"
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
    FileUtils.mv("_drafts/#{@post_name}", "_posts/#{@post_name}")
    FileUtils.mv("_posts/#{@post_name}", "_posts/#{@post_date}-#{@post_name}")
    puts "Post copied and ready to deploy!"
  end
end
```
You can run these tasks by using the following command:

```sh
$ rake draft:new    # Creating a new draft for post/entry
$ rake draft:ready  # copy draft to production post!
```

As you can see, both tasks are pretty straight forward, they do simple things and work of the box. With these tasks you'll no longer have to remember anything about the front-matter or how the file should be named within the drafts and posts directory, just run the tasks and start dumping ideas onto the freshly created markdown file.

*PS* I know the tasks can be vastly improved but I hope this works at least for some of you!
