JS-REST-DB
==========

(C)reate > POST   database_name/table_name

(R)ead   > GET    database_name/table_name[/id]

(R)ead   > GET     database_name/table_name[/column/content]

(U)pdate > PUT     database_name/table_name/id

(D)elete > DELETE  database_name/table_name/id

##### Table_name="users" and database_name="test"

- Get all rows from the "users" table
 - GET http://api.example.com/test/users/

- Get a single row from the "users" table (where "12" is the ID)
 - GET http://api.example.com/test/users/12/

- Get all rows from the "users" table where the "first_name" field matches "Poornima" (`LIKE`)
 - GET http://api.example.com/test/users/first_name/Poornima/

- Get 5 rows from the "users" table
 - GET http://api.example.com/test/users?limit=5

- Get 50 rows from the "users" table ordered by the "date" field
 - GET http://api.example.com/test/users?limit=5&by=salary&order=desc

- Create a new row in the "users" table where the POST data corresponds to the database fields
 - POST http://api.example.com/test/users/

- Update customer "12" in the "users" table where the PUT data corresponds to the database fields
 - PUT http://api.example.com/test/users/12/

- Delete customer "12" from the "users" table
 - DELETE http://api.example.com/test/users/12/

#### Change from ArrestDB
- Update customer "12" in the "users" table where the PUT data corresponds to the database fields
 - PUT http://api.example.com/test/users/12/

If table does not have column id or user wants some other column to be considered as id attribute
he can give  key value in his payload as id_attribute : column name

- Delete customer "12" from the "users" table
 - DELETE http://api.example.com/test/users/12/

If table does not have column id or user wants some other column to be considered as id attribute
he can give  key value in his payload as id_attribute : column name

We are following this convention as backbone also follows the same convention

###### Creating Database, Create tables with column:-

POST /database/ (create db) payload  {'db_name':'value'}
DELETE /:database/ (delete db)
POST /:database/table payload {'table_name':'value', 'primary_key':'value', 'columns':{"column_name": "data_type"}} (create table)
DELETE /:database/:table (delete table)
