### API Endpoints

Method      | URL                                               | Request Payload               | Semantics                             | Required Privilege        | Comments
------------|---------------------------------------------------|-------------------------------|---------------------------------------|---------------------------|----------------------------------------------------
`POST`      | `/api/auth/login`                                 | `username`, `password`        | Log in.                               |                           | The response shall include a JSON Web Token.
`POST`      | `/api/auth/logout`                                |                               | Log out.                              |                           |
`PUT`       | `/api/user/:userid`                               | `email`, `password`, `firstName`, `lastName`, `city`, `streetAddress` | Create a new user account. | | `userId` is user's ID Card #.
`POST`      | `/api/category`                                   | `name`                        | Create a new product category.        | `admin`                   |
`GET`       | `/api/category/all`                               |                               | Get all the categories.               | `user`                    | The response shall not include the products array.
`POST`      | `/api/category/:categoryId/product`               | `name`, `price`, `imageUrl`   | Create a new product in category.     | `admin`                   | 
`GET`       | `/api/category/:categoryId/product/all`           |                               | Get all products in category.         | `user`                    |
`GET`       | `/api/category/:categoryId/product/:productId`    |                               | Get product info.                     | `user`                    |
`DELETE`    | `/api/category/:categoryId/product/:productId`    |                               | Delete product.                       | `admin`                   |
`POST`      | `/api/order`                                      |                               | Check out (create a new order).       | `user`                    |
`GET`       | `/api/order/:orderId`                             |                               | Get order details.                    | `admin`                   |