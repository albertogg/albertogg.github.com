# Blog

My personal blog, hosted on [github pages][pages].

## Installation

This blog is generated using Hugo.

Installing on macOS:

    brew install hugo

## Start the server

Start the Hugo server:

    ./blog server

Draft or undraft, these are Hugo archetypes so the generation is straightforward
using the following command:

    ./blog draft <draft-name>
    ./blog undraft <draft-name>

Publish with default message or with custom message:

    ./blog publish
    ./blog publish <commit-name>

## License

This project runs with two licenses one for the content and one for the code.

- All the code is under the [MIT][mit] license.
- All the blog posts are under [Creative Commons
  Attribution-NonCommercial-ShareAlike 4.0 International License.][cc] license.

[pages]: http://pages.github.com/
[mit]: http://choosealicense.com/licenses/mit/
[cc]: http://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
