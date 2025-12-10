# Mangalam WiFi Zone

This is a MERN stack application for a WiFi zone management system.

## Features

### User Panel

- Login with phone number and a 4-digit code.
- View all available plans.
- Select a plan and pay for it using a dummy payment gateway.
- Apply a coupon to get a discount.
- View transaction history.

### Admin Panel

- Login with a username and password.
- View all users.
- View all transactions.
- View all plans and add new plans.
- View all coupons and add new coupons.

## How to run the application

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/mangalam-wifi-zone.git
    ```

2.  **Install dependencies:**

    ```bash
    cd mangalam-wifi-zone
    npm install
    cd client
    npm install
    cd ../admin
    npm install
    ```

3.  **Create a `.env` file in the `server` directory with the following variables:**

    ```
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=password
    MONGODB_URI=your_mongodb_uri
    ```

4.  **Start the application:**

    ```bash
    npm start
    ```

    This will start the server, the client, and the admin panel.

    -   Client will be running on `http://localhost:3000`
    -   Admin will be running on `http://localhost:3001`
    -   Server will be running on `http://localhost:5000`
