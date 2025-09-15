# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Install dependencies: `npm install`
- Start development server: `npx expo start`
- Run on iOS: `npm run ios`
- Run on Android: `npm run android`
- Run on web: `npm run web`
- Lint code: `npm run lint` or `npx expo lint`
- Install packages (preferred): `npx expo install <package-name>`

## Architecture

- **Framework:** Expo with Expo Router for file-based routing
- **Navigation:** Uses nested routing with authentication guards
  - `(auth)` group for unauthenticated screens (sign-in, register, forgot-password)
  - `(tabs)` group for authenticated screens with bottom tab navigation
  - `(home)` nested group within tabs for home-related screens
- **State Management:** React Context API with AuthContext for authentication
- **Secure Storage:** expo-secure-store for storing auth tokens and user data
- **TypeScript:** Strict mode enabled with path aliases configured

## Project Structure

- `/app` - Main application directory with file-based routing
  - `/(auth)` - Authentication screens (unauthenticated users)
  - `/(tabs)` - Main app screens (authenticated users)
  - `_layout.tsx` - Root layout with authentication logic
- `/context` - React Context providers (AuthContext)
- `/assets` - Images and static assets
- TypeScript configured with `@/` path alias pointing to root directory

## Key Features

- **Authentication Flow:**
  - Protected routes using Stack.Protected guard
  - Auth state persisted in secure storage
  - Loading state management during auth checks
- **Typed Routes:** Enabled via expo-router typedRoutes experiment
- **React Compiler:** Enabled for optimizations
- **New Architecture:** React Native new architecture enabled

## Code Style

- Use TypeScript with strict mode
- Use kebab-case for all file names
- Use `@/` path aliases for imports (configured to root directory)
- Follow React Native best practices for component structure
