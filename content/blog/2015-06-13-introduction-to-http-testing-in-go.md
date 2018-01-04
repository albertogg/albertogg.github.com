---
date: 2015-06-13T00:00:00Z
title: Introduction to HTTP testing in Go
slug: /introduction-to-http-testing-in-go/
description: |-
  Introduction to HTTP testing in Go. It's a very basic introduction with the
  key points you need to get started.
categories:
  - Development
tags:
  - Go
  - HTTP
  - Testing
  - cURL
---

This post will be focused on a very basic introduction to HTTP testing in Go.
Our goal will be to test a handler named `helloHandler` that responds with a
custom header and a `Hello World!` body using only Go build-in Packages.

## Creating the helloHandler

Creating our simple HTTP handler for our desired endpoint should be something
like this:

    // main.go
    package main

    import (
        "log"
        "net/http"
    )

    func helloHandler(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("X-Hello-World-Type", "hello.v1")
        w.Write([]byte("Hello World!"))
    }

    func main() {
        http.HandleFunc("/", helloHandler)

        log.Fatal(http.ListenAndServe(":3000", nil))
    }

Let's see how our simple `helloHandler` works by using [cURL][curl] on
`localhost:3000/`:

    % curl -i localhost:3000/
    HTTP/1.1 200 OK
    X-Hello-World-Type: hello.v1
    Date: Mon, 08 Jun 2015 00:13:01 GMT
    Content-Length: 12
    Content-Type: text/plain; charset=utf-8

    Hello World!%

Checking the response we see that it has a **200 status** code, our **custom
header** and the **Hello World! body**.

Now that we have our handler working we should go see how the tests for this
looks like. The question is, what are we doing to test? Well... Those same
things we just described, status code, header and body.

## Tests to our handler

In my opinion there are four things we need to know before we start testing:

- Test file should contain `_test.go` in its name and be in the same directory
  as the file we are testing.
- Each test function must must begin with the word `Test`.
- Test functions receive only one parameter `t *testing.T`.
- Use `net/http/httptest` package to "record" the request response.

Overall it's pretty straightforward, import all needed libraries, create a
function for handler which name starts with *"Test"*, create a request and a
recorder and pass those to the handler, do expectations using if statements.

Based on the above explanation our test for the `main.go` file should look
something like this:

    // main_test.go
    package main

    import (
        "net/http"
        "net/http/httptest"
        "testing"
    )

    func TestHelloHandler(t *testing.T) {
        request, _ := http.NewRequest("GET", "/", nil)
        response := httptest.NewRecorder()

        helloHandler(response, request)

        if response.Code != http.StatusOK {
            t.Fatalf("Expected status code %v, but received: %v", "200", response.Code)
        }

        if response.Body.String() != "Hello World!" {
            t.Fatalf("Expected body: %v, but received: %v", "Hello World!", response.Body)
        }

        if response.Header().Get("X-Hello-World-Type") != "hello.v1" {
            t.Fatalf("Expected header: %v, but received: %v",
                "hello.v1", response.Header().Get("X-Hello-World-Type"))
        }
    }

Our test file is called `main_test.go` we have a function that tests the
`helloHandler` named `TestHelloHandler` that receives only a parameter and have
three expectations. It should return `200`, the body should be `Hello World!`
and must contain our custom header.

If nothings wrong, running `go test` in our command line should look something
like this:

    go test
    PASS
    ok      github.com/albertogg/testest    0.006s

If one of our test fails the result looks like the following:

    go test
    --- FAIL: TestHelloHandler (0.00s)
            main_test.go:20: Expected body: Hello World!, but received: Hola Mundo!
    FAIL
    exit status 1
    FAIL    github.com/albertogg/testest    0.006s

That's all... Thanks for reading!

[curl]: http://curl.haxx.se/
