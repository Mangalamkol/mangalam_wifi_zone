
# Blueprint: Mangalam WiFi Zone

## Overview

This document outlines the plan for building the "Mangalam WiFi Zone" Flutter application. The goal is to create a user-friendly app for managing WiFi connections and plans.

## Style, Design, and Features

### Version 1.0 (Current)

*   **Theme:** Modern, visually appealing theme using Material 3, with support for light and dark modes.
*   **Typography:** Custom fonts using `google_fonts` for a unique look and feel.
*   **Home Page:** A welcoming home page with an overview of the app's features and easy navigation.
*   **Navigation:** `go_router` for robust and scalable navigation.

## Current Plan

1.  **Project Setup:**
    *   Add necessary dependencies: `google_fonts`, `provider`, and `go_router`.
    *   Create a basic Flutter application structure in `lib/main.dart`.
2.  **Theming:**
    *   Implement a `ThemeProvider` to manage light/dark/system theme modes.
    *   Define `ThemeData` for both light and dark themes using `ColorScheme.fromSeed`.
    *   Integrate `google_fonts` for custom typography.
3.  **Home Page:**
    *   Create a `HomePage` widget with a welcoming message and buttons for key actions.
    *   Design a visually engaging layout with modern UI components.
4.  **Navigation:**
    *   Configure `go_router` to handle routing to the home page and future screens.
