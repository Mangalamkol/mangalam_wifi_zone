# WiFi Voucher API Server

This directory contains the Node.js Express server for the WiFi voucher and payment system.

## Setup

1.  **Install Dependencies:**
    Navigate into this directory and install the required npm packages.

    ```bash
    cd server
    npm install
    ```

2.  **Configure Environment:**
    Create a `.env` file in the `server` directory by copying the `.env.example` file. Then, fill in your specific credentials.

    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    RAZORPAY_KEY=your_razorpay_key
    RAZORPAY_SECRET=your_razorpay_secret
    RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
    OC200_BASE=http://your_omada_controller_ip:8088
    ```

## Running the Server

You can start the server in two ways:

*   **Standard Mode:**

    ```bash
    node index.js
    ```

*   **Development Mode (with auto-restarting):**
    This requires `nodemon` to be installed globally (`npm install -g nodemon`).

    ```bash
    nodemon index.js
    ```

The server will start on the port specified in your `.env` file (default is 5000).

## Scripts

### Generate Coupons

You can use the provided command-line script to generate a batch of coupons for a specific plan.

**Usage:**

```bash
node scripts/generate_sample_coupons.js --plan=<PLAN_ID> --count=<NUMBER>
```

*   `--plan=<PLAN_ID>`: The MongoDB ObjectId of the plan for which you want to generate coupons.
*   `--count=<NUMBER>`: The number of coupons to generate.

**Example:**

```bash
node scripts/generate_sample_coupons.js --plan=60d5f1b3e6c3a01f8c8b4567 --count=100
```
