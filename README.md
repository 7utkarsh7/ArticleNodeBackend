# ArticleNodeBackend
Sploot assignment : Manage articles with auth (JWT).

Singup Api curl

curl --location 'http://localhost:3000/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "user99@example.com",
  "password": "password123",
  "name": "John 6",
  "age": 6
}'


Login Api

curl --location 'http://localhost:3000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "user99@example.com",
  "password": "password123"
}'

Create Article api

curl --location 'http://localhost:3000/api/users/647687ad8f62ed756fe6f927/articles' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc2YTJkNzNlMWEwNGFmOWZhOGI1NzciLCJpYXQiOjE2ODU0OTY1OTYsImV4cCI6MTY4NTUwMDE5Nn0.K_S1gEDbtpHUBUlT6vwfJjibOj-w-ZxrySS14NRN1Lw' \
--data '{
  "title": "New Article user99",
  "description": "This is a new article by user. 6 again"
}'

Get Article api

curl --location 'http://localhost:3000/api/articles' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc2YTJkNzNlMWEwNGFmOWZhOGI1NzciLCJpYXQiOjE2ODU0OTY1OTYsImV4cCI6MTY4NTUwMDE5Nn0.K_S1gEDbtpHUBUlT6vwfJjibOj-w-ZxrySS14NRN1Lw'


Update User Api

curl --location --request PATCH 'http://localhost:3000/api/users/6476769d5652534a6c6d192b' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc2YTJkNzNlMWEwNGFmOWZhOGI1NzciLCJpYXQiOjE2ODU0OTY1OTYsImV4cCI6MTY4NTUwMDE5Nn0.K_S1gEDbtpHUBUlT6vwfJjibOj-w-ZxrySS14NRN1Lw' \
--data '{
  "name": "last user",
  "age": 0
}'
