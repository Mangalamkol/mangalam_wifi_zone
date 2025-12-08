# Mangalam Wifi Zone - Blueprint

## Overview

Mangalam Wifi Zone is a Flutter application that serves as a portal for users to authenticate to a Wi-Fi network. The app will provide a beautiful and intuitive user interface for logging in and managing Wi-Fi access.

## Style, Design, and Features (v1)

*   **Modern UI:** The application will feature a modern and visually appealing design, incorporating Material Design 3 principles.
*   **Theming:** A consistent theme with a custom color scheme, typography, and component styles will be implemented. Both light and dark modes will be supported.
*   **Responsive Layout:** The UI will be responsive and adapt to different screen sizes, ensuring a seamless experience on both mobile and web.
*   **Authentication:** A login screen will be implemented to capture user credentials.

## Current Plan: Initial UI Setup and Login Screen

1.  **Add Dependencies:** Add `google_fonts` for custom typography and `provider` for theme management.
2.  **Theming:**
    *   Create a centralized `ThemeData` object.
    *   Use `ColorScheme.fromSeed` for the color palette.
    *   Integrate `google_fonts` for a unique text theme.
    *   Implement a `ThemeProvider` to toggle between light and dark modes.
3.  **Login Screen:**
    *   Create a new `login_screen.dart` file.
    *   Design a visually appealing login screen with:
        *   An app title.
        *   Text fields for username and password with icons.
        *   A prominent login button.
        *   A subtle background texture or gradient for a premium feel.
        *   Interactive elements with shadows and "glow" effects.
4.  **Integrate Login Screen:** Set the new login screen as the home page in `lib/main.dart`.
