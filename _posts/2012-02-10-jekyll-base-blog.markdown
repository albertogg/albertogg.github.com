---
layout:   post
title:   Jekyll Site.
---

## How I did this jekyll site.


As the title said this site is hosted on [Github Pages][github] and is using [Jekyll][jekyll] for the layouts and blog posts. In this post I will guide you through the steps you need to start your on site with jekyll.

### So what's Jekyll?


"Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server" and it was made by By Tom Preston-Werner, Nick Quaranto, and many awesome contributors! So many thanks to them.

For this post I'm assuming you have Xcode installed, so you are able to compile some things that are needed. If you have [Homebrew][brew] It will be easier.

For the first steps before using [Jekyll][jekyll] you need to have Ruby installed, version 1.9.1+ so if you are on a mac, as I am, I recomend you to install it via [rbenv][rbenv], because I think it's the easiest way to do it.

Install rbenv from the site and after that install [ruby-build][build] so you can download and compile ruby. Now you are able to run this command:

{% highlight bash %}

  $ rbenv install 1.9.3-p0 or rbenv install 1.9.2-p290

{% endhighlight %}

If all went well with your installation of ruby via rbenv, now you need to install Jekyll gem with this command:

{% highlight bash %}

  $ gem install jekyll && rbenv rehash

{% endhighlight %}

Right now, you are ready to start your blog aware, static site. first start by creating the folder of your project and the inside folders you think you'll need at first but are needed by jekyll. for example:


{% highlight bash %}

  $ mkdir my-site/ && cd my-site/

  $ mkdir _layouts _posts _site 

{% endhighlight %}

### but what do these folders do? 

_layouts

These are the templates which posts are inserted into. Layouts are defined on a post-by-post basis in the YAML front matter, which is described in the next section. The liquid tag {{ content }} is used to inject data onto the page.

_posts

Your dynamic content, so to speak. The format of these files is important, as named as YEAR-MONTH-DAY-title.MARKUP. The Permalinks can be adjusted very flexibly for each post, but the date and markup language are determined solely by the file name.

_site

This is where the generated site will be placed once Jekyll is done transforming it. It's probably a good idea to add this to your .gitignore file.

you will also need to have a:

_config.yml

That is a file that stores configuration data.

As for now this are the files and folders we'll need for jekyll to work.

## Making the site.

At this part, I hope that you already have created the folder of your project and the _layouts, _posts and _site folder inside the project.

Now we are going to create our base "layout" for our index.html file. Using nano we are going to create a default.html file that will contain the static layout we'll use.

{% highlight bash %}

   $ nano default.html

{% endhighlight %}

and we are going to include this simple html5 page structure inside de default.html file.

{% highlight html %}

  <!DOCTYPE html>
  <html>
  <head>
    <title>Home Page</title>
  </head>
  <body>
    <header>
      <h1>Hi, I'm the default.html file</h1>
    </header>
    <section>
        {{ content }}
    </section>
    <footer>
        <p> this is my site </p>
    </footer>
  </body>
  </html>

{% endhighlight %}

If you notice, there is a Liquid tag {{ content }} that is used to inject data on to the page. this means that if we call this "default.html" on our index.html file, we'll have all of the page structure contained here(default) in our index file. 

So now we'll create our index.html file 

{% highlight bash %}

   $ nano index.html

{% endhighlight %}
 
and then add this content to the file:

{% highlight html %}

---
layout: default
---

    <h2>Hi, this is index.html</h2>

{% endhighlight %}

At this point you will have your index.html working just fine. we just need to modify the jekyll config file to try it out.

So to do this create a new file with nano or your favorite text editor called _config.yml

{% highlight bash %}

   $ nano _config.yml

{% endhighlight %}

And add the following:

{% highlight bash %}

   server: true
   auto: true

{% endhighlight %}

then save the file and run this command:

{% highlight bash %}

   $ jekyll

{% endhighlight %}

The server must start, open your index file in your web browser typing out: localhost:4000/ and take a look how the default.html is injected to your index.html.

### Running posts on the site





[github]: http://pages.github.com/
[jekyll]: http://github.com/mojombo/jekyll/
[rbenv]: https://github.com/sstephenson/rbenv
[build]: https://github.com/sstephenson/ruby-build
[brew]: http://mxcl.github.com/homebrew/