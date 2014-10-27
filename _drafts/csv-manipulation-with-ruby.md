---
layout: post
title: CSV manipulation with Ruby
description: 155 char description
category: blog
tag: blog
---

In the recent days I've started using CSV files more and more for data
manipulation, specifically for database seeding. CSV is a super easy to use and
it doesn't require a complex text editor... Google Spreadsheets or VIM will work
great.

This post I will show how to read data from `.csv` file and dumping it in a Ruby
Array of Hashes. It will also show how to seed a Rails database.

## Reading a CSV file

Ruby provides CSV support in the std-lib and it will help us do most of the job
very quickly, although there are various ways to achieve the same results we
will be focusing in just 2 of the possible ways, read the file entirely with
read or line by line with foreach.

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

As you see from the data above the first line is the Header line which gives
meaning to the rest of the data, also there are some missing values, we don't
have the birth date of John Doe and the email of Andrés Márquez. I will expect
that after reading that file I get this output which is easy manageable in Ruby:

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

How do we manage to get from the CSV file to an Array of hashes? Well pretty
easily, we just need to open irb, require the csv library from the std-lib and
use the read method with the right options. That's it!

```ruby
require 'csv'

> data = CSV.read("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all})

> data.map { |d| d.to_hash }
=> [
{:name=>"Alberto", :lastname=>"Grespan", :email=>"ag@gmail.com", :birth_date=>"30/11/1986", :hometown=>"Mérida"},
{:name=>"Pedro", :lastname=>"Perez", :email=>"pp@gmail.com", :birth_date=>"4/4/1984", :hometown=>"Caracas"},
{:name=>"John", :lastname=>"Doe", :email=>"jd@gmail.com", :birth_date=>nil, :hometown=>"Kansas"},
{:name=>"José", :lastname=>"González", :email=>"jg@gmail.com", :birth_date=>"16/10/1984", :hometown=>"Madrid"},
{:name=>"Andrés", :lastname=>"Márquez", :email=>nil, :birth_date=>"18/3/1987", :hometown=>"Caracas"}
]
```

### Reading line by line

In the same way we read the file before we are going to do it now. But this time
we'll use the `foreach` method.

```ruby
require 'csv'

data = Array.new

> CSV.foreach("csv_data.csv", { encoding: "UTF-8", headers: true, header_converters: :symbol, converters: :all}) do |row|
  data row.to_hash
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

### Seeding a Rails DB

Seeding the database through a CSV file is in no way any different from what
we've been doing. For this example let's try seeding a Users table that has the
same structure as de above CSV file (name, lastname, email, birth_date and
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

Now we can check in the Rails console to check if all the users in the CSV file
where inserted correctly:

```ruby
$ bin/rails c
Loading development environment (Rails 4.1.5)
irb(main):001:0> u = User.all
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

I believe this is a great way seed a database for testing and development and
using a CSV file can help us to add or remove data easily.

Thanks for reading!
