# Mangalam Wi-Fi Zone - Blueprint

## Overview

This document outlines the design, features, and development plan for the "Mangalam Wi-Fi Zone" Flutter application. The app's primary purpose is to provide a simple and intuitive interface for users to connect to the Mangalam Wi-Fi network.

## Style, Design, and Features

### Version 1.0 (Initial Build)

*   **Theme:**
    *   Modern and clean user interface using Material Design 3.
    *   A vibrant, tech-inspired color scheme generated from a primary seed color.
    *   Support for both **Light and Dark modes**, with a toggle switch in the app bar.
    *   System theme detection by default.

*   **Typography:**
    *   Custom, easy-to-read fonts from the `google_fonts` package to create a unique and professional look.
    *   Clear visual hierarchy for headings, titles, and body text.

*   **Home Screen:**
    *   **App Bar:** Displays the application title, "Mangalam Wi-Fi Zone," and includes icons to toggle the theme (Light/Dark/System).
    *   **Connection Status:** A central area of the screen that visually and textually indicates the current Wi-Fi connection status (e.g., "Connected" or "Disconnected").
    *   **Primary Action:** A prominent "Connect" button that serves as the main call to action for the user. The button's appearance and text will change based on the connection status.
    *   **Visuals:** A large, visually engaging icon (e.g., a Wi-Fi symbol) that changes color to reflect the connection status, enhancing the user's understanding at a glance.

*   **State Management:**
    *   The `provider` package will be used for managing the application's state, specifically for:
        *   Toggling between light and dark themes (`ThemeProvider`).
        *   Managing the Wi-Fi connection status (`ConnectionProvider`).

*   **Accessibility (A11Y):**
    *   Proper color contrast for readability in both light and dark themes.
    *   Sufficiently large touch targets for all interactive elements.
    *   Descriptive tooltips for icon buttons.

## Current Development Plan

The immediate goal is to implement the initial version (v1.0) of the application as described above.

**Steps:**

1.  **Add Dependencies:** Integrate `google_fonts` and `provider` into the project.
2.  **Implement Theme Provider:** Create a `ThemeProvider` class to manage and persist the theme mode (Light, Dark, System).
3.  **Implement Connection Provider:** Create a `ConnectionProvider` class to manage the Wi-Fi connection state.
4.  **Structure the Main App:**
    *   Modify `lib/main.dart` to initialize the providers.
    *   Define the `ThemeData` for both light and dark modes using `ColorScheme.fromSeed`.
    *   Set up the main `MaterialApp` to consume the `ThemeProvider`.
5.  **Build the Home Screen:**
    *   Create a `MyHomePage` widget that displays the UI elements described above.
    *   Connect the UI elements to the `ConnectionProvider` and `ThemeProvider` to ensure the UI updates dynamically based on the application's state.
6.  **Refine and Polish:** Ensure the layout is balanced, typography is consistent, and all UI elements are polished and visually appealing.
7.  **Analyze and Verify:** Run `flutter analyze` to ensure the code is free of errors and follows best practices.
