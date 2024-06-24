get all products - localhost:5005/api/products

get product by ID - localhost:5005/api/products/:id

register - localhost:5005/api/register
{
  "email": "exp@gmail.com",
  "username": "exp",
  "password": "000000"
}


Login - localhost:5005/api/login
{
  "email": "exp@gmail.com",
  "password": "000000"
}

add product to cart - localhost:5005/api/cart/add-to-cart
{
    "productId": "6676a8efacaba4afa38a574a", 
    "quantity": 1
}


show cart - localhost:5005/api/cart/userId

checkout - localhost:5005/api/checkout
