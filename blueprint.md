# Project Blueprint

## Overview

This is a modern Flutter application with Firebase integration. It includes features like user authentication, a theming system with light/dark mode, a global error handling mechanism, and PDF processing capabilities. It also includes accessibility features like a larger default text size.

## Data Models

- **`Coupon`**: Represents a redeemable coupon with the following properties:
    - `code` (String)
    - `plan` (String)
    - `validTill` (Timestamp)
    - `userId` (String, nullable)
    - `deviceId` (String, nullable)
    - `status` (String, e.g., "active", "used")
    - `usedAt` (Timestamp, nullable)
    - `createdAt` (Timestamp)

## Features

- **User Authentication:** Login with phone number and OTP verification.
- **Theming:** Light and dark mode support with a theme provider.
- **Routing:** Uses `go_router` for declarative navigation.
- **Error Handling:** Global error handling to catch and log all uncaught exceptions.
- **PDF Processing:** Upload PDF files, parse their text content, and extract structured JSON data.
- **Accessibility:** The entire application has a default text scale factor of 1.3 to improve readability.
- **Version Control:** A `.gitignore` file is in place to exclude unnecessary files from version control.

## Current Task: Create `Coupon` Data Model

### Plan

1.  **Create `lib/models/coupon.dart`:** Define the `Coupon` class with its properties.
2.  **Add Data Handling Methods:** Implement `copyWith`, `toMap`, `fromMap`, `toJson`, and `fromJson` for easy data manipulation and Firestore integration.

---

### Completed Tasks

#### Create `.gitignore` File

1.  **Create `.gitignore`:** Created a standard Flutter `.gitignore` file.
2.  **Add Custom Rules:** Included rules to ignore `build/`, `.react-client/`, `node_modules/`, and `.dart_tool/`.

#### Apply App-Wide Text Scaling

1.  **Use `MaterialApp.builder`:** Wrapped the application's child widget with a `MediaQuery` to override the default text scale factor.
2.  **Set `textScaleFactor`:** Set the `textScaleFactor` to `1.3` to make the text 30% larger across the entire application.

#### Extract and Display Structured Data from PDF

1.  **Define Data Structure:** Created a `CodeData` class to model the JSON structure found in the PDF.
2.  **Update PDF Parsing Logic:**
    *   After extracting raw text using `pdf_text`, used a regular expression to find potential JSON objects.
    *   Safely decoded each match using `jsonDecode`.
3.  **Display Data as Cards:** Used a `ListView.builder` to display the parsed `CodeData` objects.
4.  **Implement Copy Functionality:** Added a button to copy the code to the clipboard.

#### Initial PDF Upload and Parsing

1.  **Add Dependencies:** Included `file_picker` and `pdf_text` in `pubspec.yaml`.
2.  **Create `PdfUploadScreen`:** Built a new screen for file picking and displaying extracted text.
3.  **Implement File Picking:** Used `file_picker` to allow users to select PDF files.
4.  **Parse PDF:** Used `pdf_text` to extract raw text content.
5.  **Update Navigation:** Added a route to `PdfUploadScreen` in `main.dart`.
