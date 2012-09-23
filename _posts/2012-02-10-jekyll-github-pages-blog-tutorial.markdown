---
layout:   post
title:   How I did this site using jekyll and github pages.
---

## So, How I did this jekyll site?

This site is runing on [Github Pages][github] and is using [Jekyll][jekyll] for the layouts and blog posts. In this post I will guide you through the steps for you to build your own site using jekyll.

### Let's start from the beginning what's Jekyll?

"Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits out a complete, static website suitable for serving with Apache or your favorite web server" and it was made by By Tom Preston-Werner, Nick Quaranto, and many awesome contributors! THANKS!

For this post if you are on a MacBook *(like me)* I will assume you have Xcode4.x, Apple "Command line tools" or [osx-gcc-installer][gcc] as we are going compile some things that are needed *(ruby 1.9.3 for example)*. We'll be using the Terminal a lot for this tutorial, so every time you see code starting with a dollar sign ($) it's a terminal command.

For the first step before using [Jekyll][jekyll] you need to be sure you have Ruby installed, version 1.9.2+ is recommended. If you don't have it, try installing it via [rbenv][rbenv] with [ruby-build][build] plugin (I think it's the easiest way to do it) or any other way.

At this moment the latest version of ruby is (1.9.3-p194) so we'll be using that. Fire up the Terminal.app and start installing.

##### Installing ruby with rbenv and ruby-build:
{% highlight bash %}

$ rbenv install 1.9.3-p194

{% endhighlight %}

##### If all went well, install jekyll gem with this command:
{% highlight bash %}

$ gem install jekyll

$ rbenv rehash

{% endhighlight %}

**note:** *rbenv rehash* will refresh the gems in your current open Terminal.app, if you prefer you can close and open the Terminal to achieve the same result.

###At this point, you are ready to start your blog aware, static site.

First start by creating your project directory. Inside the directory folder jekyll needs some specific folders to work you can read about [here][usage], but for this tutorial we'll be using 3 and a configuration file to be exact.

##### Creating the project directory and the inside folders:
{% highlight bash %}

$ mkdir my-site/ && cd my-site/

$ mkdir _layouts _posts _site

$ touch _config.yml

{% endhighlight %}

## Making the site.

I hope that you already have created the directoy of your project and the _layouts, _posts, _site folders with _config.yml file inside the project.

##### If you do, you'll have a folder structure alike:

{% highlight bash %}

my-site
├── _config.yml
├── _layouts
├── _posts
└── _site

{% endhighlight %}

Now we are going to create our base "layout" (default.html) to use it inside the index.html file. Using vim we are going to create and edit our "base layout".

##### Create the "base layout" called default.html inside the _layout folder we previously created:
{% highlight bash %}

$ touch default.html

$ vim default.html

{% endhighlight %}

##### Fill the default.html layout with this basic html5 structure.
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
      { { content } } # Curly braces must be sticked together
  </section>
  <footer>
      <p> this is my site </p>
  </footer>
</body>
</html>

{% endhighlight %}

**note:** *curly braces must be sticked together but at the moment jekyll is having problems with the liquid "raw" tag, for that reason we will display a pair of separate curly braces "{ {" instead of the correct ones.*

As you notice, there is a Liquid tag "*{ { content } }*" this tag is used to inject data on to the page. What this means is that if we call "default.html" layout in a whatever.html file; the whatever.html will contain all page structure inside out default.html layout, this way we will save writing this over and over again.

So now let's create an index.html for our main site page.

##### Create the index.html:
{% highlight bash %}

$ touch index.html

$ vim index.html

{% endhighlight %}

##### Then we will call the default.html layout inside the index.html file and add some content to it:
{% highlight html %}

---
layout: default
---

<h2>Hi, this is index.html</h2>
{% endhighlight %}

Before trying this page in the browser, lets give jekyll a minimum configuration for starting the server and displaying the page.

##### Create the _config.yml file in the root of your project directory if you haven't:
{% highlight bash %}

$ vim _config.yml

{% endhighlight %}

##### Then add the following:
{% highlight bash %}

server: true
auto: true

{% endhighlight %}

##### Save the file and run, Jekyll command to start the server:
{% highlight bash %}

$ jekyll

{% endhighlight %}

If there are no errors, open your browser and go to *http://localhost:4000/* you must be seeing displayed your index.html file and if you can take a look at the source code of that page you'll see that the default.html file on our _layouts folder was injected into it. So you can now do any amout of layouts for the different "sections" of your site. for example: a layout only for your blog posts.

### Creating a blog.
Now that we got our default layout for the site, we need to create a layout for the posts. for this tutorial we still use the contents from the "default.html file" for the posts layout just to write less code.

##### Create a post.html file on the _layout folder:
{% highlight bash %}

$ touch post.html

$ vim post.html

{% endhighlight %}

##### Fill the file with content:
{% highlight html %}

---
layout: default
---
<h2>Hi, this is the post layout</h2>
{ { content } } # Curly braces must be sticked together

{% endhighlight %}

In this file we are adding the Liquid tag again, because right there is going to be the "content" of the post we are going to do in a moment.

Now we'll create the post. For that task create a file in your post folder and name it Year-month-date-name-of-the-post.md so when jekyll parse this markdown file it can grab the date and name and use it as title of the post.

##### Let's get our hands in this first post, create inside the _posts folder for jekyll to grab it as a post:
{% highlight bash %}

$ touch 2012-02-08-your-first-post.md

$ vim 2012-02-08-your-first-post.md

{% endhighlight %}

**note:** the file extension for the post file we are creating is *markdown*, so checkout the syntax if you have any doubt.

##### Add some content to it:
{% highlight bash %}

---
layout:   post
---

## First post

hi, first post.

{% endhighlight %}

At this point we are almost ready, to view our post. Jekyll will add it dynamically to the blog page. In our case the blog page with the new entry will be the index.html file.

To display the entry we have to add some code to the index.hmlt file.

##### Open index.html and add the following:
{% highlight html %}

<ul>
  { % for post in site.posts % } # Curly braces and the percentage sign must
                                 # be sticked together.
  <li>
    <span> { { post.date | date: "%B %e, %Y" } } </span>
      <a href="{ { post.url } }">{ { post.title } }</a>
  </li>
  { % endfor % }
</ul>

{% endhighlight %}

**note:** *curly braces and the percentage sign must be sticked together but at the moment jekyll is having problems with the liquid "raw" tag, for that reason we will display separate curly braces and the percentage sign "{ %" instead of the correct ones.*

That block of code, will create a unordered list and cycle inside the _post folder and add the posts as elements of the list with the date, url and title. As of now you can enter to your index.html to view the post.

**note:** you can modify your _config.yml file to change the permalink and add some customization to your configuration as explained [Here][custom]. the permalink is the way that the URL points to a blog entry. Jekyll provides support for building flexible site URL's and the [wiki][perma] of permalinks show us what can we do with it. the default URL is something like this:

##### Default jekyll permalink:
{% highlight bash %}

permalink: /:year/:month/:day/:title --> /2009/04/29/slap-chop.html

{% endhighlight %}

##### But if you notice this site (my site) I've changed a bit, to:
{% highlight bash %}

permalink: /blog/:title --> /blog/slap-chop.html

{% endhighlight %}

I hope you got the hang of jekyll and be able to work your own site with it, because it's pretty cool. Feel free to fork my site but please don't use the content of the _posts folder without my permission.

To host the site with [Github Pages][github] just follow the [tutorial][instructions] and you will be setup with your new site.

###### *last modification: 2012-09-22*

[github]: http://pages.github.com/
[jekyll]: http://github.com/mojombo/jekyll/
[rbenv]: https://github.com/sstephenson/rbenv
[build]: https://github.com/sstephenson/ruby-build
[brew]: http://mxcl.github.com/homebrew/
[custom]: https://github.com/mojombo/jekyll/wiki/configuration
[perma]: https://github.com/mojombo/jekyll/wiki/Permalinks
[usage]: https://github.com/mojombo/jekyll/wiki/usage
[gcc]: https://github.com/kennethreitz/osx-gcc-installer
[instructions]: https://help.github.com/articles/creating-project-pages-manually