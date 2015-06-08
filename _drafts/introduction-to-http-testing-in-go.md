---
layout: post
title: Introduction to HTTP testing in Go
description: >
  Introduction to HTTP testing in Go/Golang. It's a very basic introduction with
  the key points you need to get started.
category: blog
tag: blog
---

```go
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
```

What our simple `helloHandler` looks like.

```bash
% curl -i localhost:3000/
HTTP/1.1 200 OK
X-Hello-World-Type: hello.v1
Date: Mon, 08 Jun 2015 00:13:01 GMT
Content-Length: 12
Content-Type: text/plain; charset=utf-8

Hello World!%
```

## Adding tests to our handler.

The first thing to know about tests in Go is that each test function name needs
to begin with `Test` otherwise they are not considered one.

```go
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
```
