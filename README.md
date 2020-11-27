### API Endpoints

Method      | URL                                               | Payload               | Semantics                             | Comments
------------|---------------------------------------------------|-----------------------|---------------------------------------|------------
`PUT`       | `/api/user/:userid`                               | email, password, firstName, lastName, city, streetAddress | Create a new user account. | User ID is ID Card #
`POST`      | `/api/category`                                   | name                  | Create a new product category.        |
`GET`       | `/api/category/all`                               |                       | Get all the categories.               | Response shouldn't include products array.
`POST`      | `/api/category/:categoryId/product`               | name, price, imageUrl | Create a new product in category.     |
`GET`       | `/api/category/:categoryId/product/all`           |                       | Get all products in category.         |
`GET`       | `/api/category/:categoryId/product/:productId`    |                       | Get product info.                     |
`PUT`       | `/api/user/:userId/product/:productId`            | qty                   | Add product to user's cart.           |
`DELETE`    | `/api/user/:userId/product/:productId`            |                       | Remove product from user's cart.      |
`POST`      | `/api/user/:userId/order`                         |                       | Check out, i.e. create order.         |
`GET`       | `/api/user/:userId/order/all`                     |                       | Get all orders for user.              |
`GET`       | `/api/order/:orderId`                             |                       | Get order details.                    | 