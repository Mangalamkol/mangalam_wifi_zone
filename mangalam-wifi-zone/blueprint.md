# Mangalam WiFi Zone

## Overview

This project is a full-stack application for managing and selling WiFi coupons. It includes a server, an admin panel, a web client, and a Flutter mobile application.

## Project Structure

*   **server/**: The Node.js backend with Express.js. It handles API requests, database interactions, and business logic.
*   **admin/**: A web-based admin panel for managing the system (likely built with a framework like React).
*   **web_client/**: The customer-facing web application for purchasing and managing WiFi coupons.
*   **client_flutter/**: A Flutter application for mobile users.
*   **automation/**: Scripts for automating tasks like importing coupons or deploying the application.

## Features

*   **Server**:
    *   Express.js for routing and API endpoints.
    *   MongoDB with Mongoose for the database.
    *   JWT for authentication.
    *   Razorpay integration for payments.
    *   PDF parsing for importing coupons.
*   **Admin Panel**: A web interface for managing coupons, users, and other system settings.
*   **Web Client**: A web interface for users to buy and use WiFi coupons.
*   **Flutter App**: A mobile application for users.
