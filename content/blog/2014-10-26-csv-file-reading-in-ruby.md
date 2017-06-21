---
categories:
- blog
date: 2014-10-26T00:00:00Z
description: |
  CSV file reading in Ruby using the read and foreach methods. We will also seed a Rails database with CSV.
redirect_from:
- /blog/csv-file-manipulation-with-ruby/
tag: blog
title: CSV file reading in Ruby
url: /2014/10/26/csv-file-reading-in-ruby/
---

In the recent days I've started using CSV files more and more for data
manipulation, specifically for database seeding. CSV is a super easy to use and
it doesn't require a complex text editor... Google Spreadsheets or VIM will work
great.

This post I will show how to read data from `.csv` file and dumping it in a Ruby
Array of Hashes. It will also show how to seed a Rails database.

## Reading a CSV file

Ruby provides CSV support in the Standard Library and it will help us do most of
the job very quickly; although there are various ways to achieve the same
results we will be focusing in just 2 of the possible ways, read the file
entirely with the `read` method or line by line with the `foreach` method.

### CSV File

The CSV file we are going to work with is this one:

```text
Name,Lastname,Email,Birth Date,Hometown
Alberto,Grespan,ag@gmail.com,30/11/1986,Mérida
Pedro,Perez,pp@gmail.com,4/4/1984,Caracas
John,Doe,jd@gmail.com,,Kansas
José,González,jg@gmail.com,16/10/1984,Madrid
Andrés,Márquez,,18/3/1987,Caracas
```

As you see from the data above the first line is the Header line, which gives
meaning to the rest of the data and the rest of the file is just the plain data.
There are some missing values, e.g. we don't have the birth date of John Doe or
the email of Andrés Márquez.

Our goal here is to have an Array of hashes after reading the CSV file. It must
contains all headers as keys for their values e.g:

```ruby
[
  {:name=>"Alberto", :lastname=>"Grespan", :email=>"ag@gmail.com", :birth_date=>"30/11/1986", :hometown=>"Mérida"},
  {:name=>"Pedro", :lastname=>"Perez", :email=>"pp@gmail.com", :birth_date=>"4/4/1984", :hometown=>"Caracas"},
  {:name=>"John", :lastname=>"Doe", :email=>"jd@gmail.com", :birth_date=>nil, :hometown=>"Kansas"},
  {:name=>"José", :lastname=>"González", :email=>"jg@gmail.com", :birth_date=>"16/10/1984", :hometown=>"Madrid"},
  {:name=>"Andrés", :lastname=>"Márquez", :email=>nil, :birth_date=>"18/3/1987", :hometown=>"Caracas"}
]
 ```

### Reading all the file at once

How do we go from the CSV file to an Array of hashes?

Well pretty easily, we just need to open *irb*, require the CSV library from the
Standard Library and use the `read` method passing it the right options and
that's it!

```ruby
require 'csv'

> data = CSV.read("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all})

> hashed_data = data.map { |d| d.to_hash }
=> [
{:name=>"Alberto", :lastname=>"Grespan", :email=>"ag@gmail.com", :birth_date=>"30/11/1986", :hometown=>"Mérida"},
{:name=>"Pedro", :lastname=>"Perez", :email=>"pp@gmail.com", :birth_date=>"4/4/1984", :hometown=>"Caracas"},
{:name=>"John", :lastname=>"Doe", :email=>"jd@gmail.com", :birth_date=>nil, :hometown=>"Kansas"},
{:name=>"José", :lastname=>"González", :email=>"jg@gmail.com", :birth_date=>"16/10/1984", :hometown=>"Madrid"},
{:name=>"Andrés", :lastname=>"Márquez", :email=>nil, :birth_date=>"18/3/1987", :hometown=>"Caracas"}
]
```

We are passing a couple of options to the `read` method:

- `encoding` we want our data to be in UTF-8
- `headers` we want a key, value hash with the headers
- `header_converters` we want headers to be symbols
- `converters` we want all of our data in the right format, integers, strings
  etc...

As we first converted the CSV file into an Array of `CSV::Row's` we need to
iterate through and convert each line to a hash, saving it in a new
`hashed_data` variable that will achieve our desired format.

How about doing this but line by line?

### Reading line by line

In a similar way as before, we are going to read the file, only that this time
using the `foreach` method.

```ruby
require 'csv'

data = Array.new

> CSV.foreach("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
  data << row.to_hash
end

> data
=> [
{:name=>"Alberto", :lastname=>"Grespan", :email=>"ag@gmail.com", :birth_date=>"30/11/1986", :hometown=>"Mérida"},
{:name=>"Pedro", :lastname=>"Perez", :email=>"pp@gmail.com", :birth_date=>"4/4/1984", :hometown=>"Caracas"},
{:name=>"John", :lastname=>"Doe", :email=>"jd@gmail.com", :birth_date=>nil, :hometown=>"Kansas"},
{:name=>"José", :lastname=>"González", :email=>"jg@gmail.com", :birth_date=>"16/10/1984", :hometown=>"Madrid"},
{:name=>"Andrés", :lastname=>"Márquez", :email=>nil, :birth_date=>"18/3/1987", :hometown=>"Caracas"}
]
```

Now that we now how to read and print the CSV file in Ruby we can use this to
seed a database, for example within Rails.

## Seeding a Rails database

Seeding the database through a CSV file is in no way any different from what
we've been doing. For this example let's try seeding a Users table that has the
same structure as the above CSV file (name, lastname, email, birth_date and
hometown).

Let's open the `db/seeds.rb` file and use the read line by line `foreach` method
to accomplish our seeding task.

```ruby
# seeds.rb
require 'csv'

CSV.foreach("db/csv/csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
  User.create(row.to_hash)
end
```

Let's run the seeding:

```bash
$ bin/rake db:seed
```

And if there are no errors we can go and check in the Rails console to check if
all the users in the CSV file where inserted correctly:

```ruby
$ bin/rails c
Loading development environment (Rails 4.1.5)
irb(main):001:0> users = User.all
  User Load (1.4ms)  SELECT "users".* FROM "users"
=> #<ActiveRecord::Relation [
#<User id: 1, name: "Alberto", lastname: "Grespan", email: "ag@gmail.com", birth_date: "1986-11-30", hometown: "Mérida", created_at: "2014-10-27 00:54:44", updated_at: "2014-10-27 00:54:44">,
#<User id: 2, name: "Pedro", lastname: "Perez", email: "pp@gmail.com", birth_date: "1984-04-04", hometown: "Caracas", created_at: "2014-10-27 00:54:44", updated_at: "2014-10-27 00:54:44">,
#<User id: 3, name: "John", lastname: "Doe", email: "jd@gmail.com", birth_date: nil, hometown: "Kansas", created_at: "2014-10-27 00:54:44", updated_at: "2014-10-27 00:54:44">,
#<User id: 4, name: "José", lastname: "González", email: "jg@gmail.com", birth_date: "1984-10-16", hometown: "Madrid", created_at: "2014-10-27 00:54:44", updated_at: "2014-10-27 00:54:44">,
#<User id: 5, name: "Andrés", lastname: "Márquez", email: nil, birth_date: "1987-03-18", hometown: "Caracas", created_at: "2014-10-27 00:54:44", updated_at: "2014-10-27 00:54:44">
]>
```

Pretty easy, right?

I believe this is a great way to seed a database for testing and development.
Using a CSV file can help us add, remove or modify data quickly, clean and easy.

Keep in mind that you can also use the `read` method for seeding the database
and that will be fine for small amount of data, but if it's lots and lots of
data it will probably be a slower process that using `foreach` because it's
keeping all in memory and then reading and inserting it into the db instead of
doing it all at once.

Thanks for reading!
