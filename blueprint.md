# Project Blueprint

## Overview

This document outlines the design, features, and development plan for the Mangalam WiFi Zone application. The goal is to create a modern, user-friendly, and accessible Flutter application that allows users to connect to and manage their WiFi settings.

## Style and Design Guide

- **Theming:** The application will use Material Design 3, with a centralized theme management system. This will include:
    - **Color Scheme:** A color scheme generated from a primary seed color (`Colors.deepPurple`) using `ColorScheme.fromSeed` for both light and dark modes.
    - **Typography:** Custom fonts will be implemented using the `google_fonts` package. Specifically:
        - `Oswald` for display and headline text.
        - `Roboto` for titles and buttons.
        - `Open Sans` for body text.
    - **Component Styles:** Consistent component styles for `AppBar` and `ElevatedButton` will be defined in the `ThemeData`.
- **Layout:** The application will feature a visually balanced layout with clean spacing and a responsive design that adapts to various screen sizes.
- **Iconography:** Modern, interactive icons will be used to enhance user understanding and navigation.

## Features

- **Theme Toggle:** A user-facing option to switch between light, dark, and system default theme modes.

## Current Plan

1.  **Fix Project Structure:** Delete unnecessary and problematic directories (`lib/screens`, `lib/services`, `lib/providers`, `lib/models`, `client`, `Mangalam-WiFi-Zone`).
2.  **Implement a Modern Theme:** Rewrite `lib/main.dart` to include a robust and modern theme implementation using the `provider` and `google_fonts` packages.
3.  **Create a Project Blueprint:** Create this `blueprint.md` file to document the project's design and development plan.
4.  **Analyze and Run:** Analyze the cleaned project to ensure all initial errors are resolved and the application is in a runnable state.
