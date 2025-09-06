
# E-COMMERCE-API

A comprehensive e-commerce API with basic frontend, built with modern web technologies, featuring user authentication, shopping cart functionality, payment processing, and administrative tools. https://roadmap.sh/projects/ecommerce-api




## Features

User Features

 - **Authentication & Authorization**

    - User registration and login
    - JWT-based authentication
    - Password hashing and security
    - Role-based access control


- **Product Management**

    - Browse products
    - Product details and images


- **Shopping Cart**

    - Add/remove products from cart
    - Update product quantities
    - Cart summary and totals


- **Checkout & Payments**

    - Secure checkout process
    - Stripe payment integration

**Admin Features**

- **Product Management**

    - Add, edit, delete products
    - Set prices and inventory levels

- **Order Management**

    - View all orders



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nick-0037/e-commerce-api.git
   cd e-commerce-api
   ```

2. Install dependencies

    ```bash
    npm install
    ```
    
4. Start the server:

    ```bash
    # Development
    npm run dev
    ```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER`
`DB_PASS`
`DB_PORT`
`DB_NAME`
`DB_HOST`

`JWT_SECRET`
`STRIPE_SECRET_KEY`
`STRIPE_WEBHOOK_SECRET`
## Tech Stack

**Client:** HTML5, CSS

**Server:** Node, Express, Sequelize

