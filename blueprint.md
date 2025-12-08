
# Project Blueprint: OC200 Manager

## Overview

This document outlines the features, design, and development plan for the OC200 Manager Flutter application.

## Current State: Initial Setup

### Features

*   **Theme Management:** The application now supports both light and dark modes, with a theme toggle in the app bar. The default theme is based on the system settings.
*   **Routing:** Declarative routing is implemented using the `go_router` package. The following routes are configured:
    *   `/`: The home screen.
    *   `/details/:id`: A placeholder screen for showing details.
    *   `/settings`: A placeholder screen for settings.
*   **UI:** The UI is built with Material 3, providing a modern and responsive user experience.

### Design

*   **Color Scheme:** The color scheme is generated from a seed color of `Colors.deepPurple`, creating a harmonious and accessible color palette.
*   **Typography:** The application uses the `google_fonts` package to provide a consistent and visually appealing set of text styles. The following fonts are used:
    *   `Oswald` for display and app bar titles.
    *   `Roboto` for other text styles.
*   **Component Styles:** The `AppBar` and `ElevatedButton` widgets have been styled to match the application's theme.

### Development Plan

*   **Next Steps:**
    1.  Create the UI for the OC200 management screen.
    2.  Implement the logic to interact with the OC200 backend services.
    3.  Add state management to handle the application's data.
