---
layout: post
title: CSV manipulation with Ruby
description: 155 char description
category: blog
tag: blog
---

In the recent days I've started using CSV files more and more for data
manipulation, specifically for database seeding. CSV is a super easy to use and
it doesn't require a complex text editor, Google Spreadsheets or VIM will work
great.

This post I will show how to read data from `.csv` file and dumping it in a Ruby
Array of Hashes and also how to seed a Rails database.

## Reading a CSV file

Ruby provides CSV support in the std-lib and it will help us do most of the job
very quickly, although there are various ways to achieve the same results we
will be focusing in just 2 of the possible ways.

The CSV file we are going to work with is this one:

```text
Name,Lastname,Email,Birth Date,Hometown
Alberto,Grespan,ag@gmail.com,30/11/1986,Mérida
Pedro,Perez,pp@gmail.com,4/4/1984,Caracas
John,Doe,jd@gmail.com,,Kansas
José,González,jg@gmail.com,16/10/1984,Madrid
Andrés,Márquez,,18/3/1987,Caracas
```

As you can see from the data above the first line is the Header line which gives
meaning to the rest of the data, also there are some missing values, we don't
have the birth date of John Doe and the email of Andrés Márquez. I will expect
that after reading that file I get this output:

```ruby
[
  {:name=>"Alberto", :lastname=>"Grespan", :email=>"ag@gmail.com", :birth_date=>"30/11/1986", :hometown=>"Mérida"},
  {:name=>"Pedro", :lastname=>"Perez", :email=>"pp@gmail.com", :birth_date=>"4/4/1984", :hometown=>"Caracas"},
  {:name=>"John", :lastname=>"Doe", :email=>"jd@gmail.com", :birth_date=>nil, :hometown=>"Kansas"},
  {:name=>"José", :lastname=>"González", :email=>"jg@gmail.com", :birth_date=>"16/10/1984", :hometown=>"Madrid"},
  {:name=>"Andrés", :lastname=>"Márquez", :email=>nil, :birth_date=>"18/3/1987", :hometown=>"Caracas"}
]
 ```
