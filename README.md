# albertogg.github.com

Hi. This is my Jekyll personal site, it's hosted using [github pages][pages].
Feel free to ask me any questions.

## Start the server

I use the foreman gem to do this. Remember to `bundle` before running.

```sh
$ foreman start
```

## Writing a new draft

To create or publish a draft use the rake tasks that accept arguments to do so:

    bundle exec rake draft:new\[draft_name\]
    bundle exec rake draft:publish\[draft_name, draft_date (optional)\]

## License

This project runs with two licenses one for the content and one for the code.

- All the code is under the [MIT][mit] license.
- All the blog posts are under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.][cc] license.

[pages]: http://pages.github.com/
[mit]: http://choosealicense.com/licenses/mit/
[cc]: http://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
