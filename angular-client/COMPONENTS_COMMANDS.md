# Angular CLI Commands to Generate All Components

This document contains all Angular CLI commands to generate components, services, guards, interceptors, and resolvers from the Angular 20 app (`angular-client`) into your Angular 21 app (`real-time-chat-application`).

**Note:** Run these commands from the `real-time-chat-application` directory, or use the provided batch script (`generate-components.bat`) on Windows.

## Prerequisites
Make sure you're in the `real-time-chat-application` directory:
```bash
cd real-time-chat-application
```

---

## SHARED COMPONENTS

```bash
ng generate component shared/components/footer
ng generate component shared/components/header
ng generate component shared/components/navbar
ng generate component shared/components/not-found
ng generate component shared/components/toaster
```

---

## FEATURE COMPONENTS

```bash
ng generate component features/home
ng generate component features/about
ng generate component features/auth/login
ng generate component features/auth/signup
ng generate component features/dashboard
ng generate component features/dashboard/components/chat
ng generate component features/dashboard/components/chat/chat-list
ng generate component features/dashboard/components/chat/chat-window
ng generate component features/dashboard/components/products
ng generate component features/dashboard/components/profile
ng generate component features/dashboard/components/users
```

---

## CORE SERVICES

```bash
ng generate service core/services/api
ng generate service core/services/auth
ng generate service core/services/chat
ng generate service core/services/products
ng generate service core/services/toast
ng generate service core/services/user
```

---

## CORE GUARDS

Here are the CLI commands for all 4 guards with the correct guard types specified:

```bash
# Admin Guard - CanActivate (Recommended)
ng generate guard core/guards/admin --implements CanActivate

# Auth Guard - CanActivate (Required)
ng generate guard core/guards/auth --implements CanActivate

# Login Guard - CanActivate (Required)
ng generate guard core/guards/login --implements CanActivate

# Unsaved Guard - CanDeactivate (Required)
ng generate guard core/guards/unsaved --implements CanDeactivate
```

**Note:** If you omit the `--implements` flag, Angular CLI will prompt you interactively to select the guard type.

### **Guard Type Explanations:**

#### 1. **admin-guard** → `CanActivate` ✅ **Recommended**
   - **Purpose**: Protect admin-only routes
   - **Why CanActivate**: 
     - More commonly used and simpler
     - Protects individual routes effectively
     - Easier to understand and maintain
   - **CanActivateChild alternative**: Only use if you need to protect ALL child routes of a parent route without listing them individually
   - **Usage**: Apply to specific admin routes like `/dashboard/users` or `/admin/*`

#### 2. **auth-guard** → `CanActivate` ✅ **Required**
   - **Purpose**: Protect routes that require authentication
   - **Why CanActivate**: Standard pattern for authentication checks
   - **Usage**: Applied to protected routes (e.g., `/dashboard`, `/profile`)

#### 3. **login-guard** → `CanActivate` ✅ **Required**
   - **Purpose**: Prevent logged-in users from accessing login/signup pages
   - **Why CanActivate**: Standard pattern for route access control
   - **Usage**: Applied to `/login` and `/signup` routes

#### 4. **unsaved-guard** → `CanDeactivate` ✅ **Required (Only Option)**
   - **Purpose**: Prevent navigation when there are unsaved form changes
   - **Why CanDeactivate**: This is the ONLY guard type that can prevent navigation AWAY from a route
   - **Usage**: Applied to routes with forms that might have unsaved data (e.g., profile edit, product edit)

### **Key Differences:**

| Guard Type | When to Use | Example |
|------------|-------------|---------|
| **CanActivate** | Protect route from being accessed | "Is user logged in?" |
| **CanActivateChild** | Protect all child routes of a parent | "Protect all `/admin/*` routes at once" |
| **CanDeactivate** | Prevent leaving a route | "Are there unsaved changes?" |
| **CanMatch** | Control which route config is used | "Does this route config match?" |

### **Note:**
- In the original Angular 20 app, `admin-guard` uses `CanActivateChild` but is **not actually used** in any routes
- For most use cases, `CanActivate` is simpler and more appropriate
- `CanDeactivate` has no alternative - it's the only way to prevent navigation away from a route

---

## CORE INTERCEPTORS

```bash
ng generate interceptor core/interceptors/auth
ng generate interceptor core/interceptors/error
ng generate interceptor core/interceptors/loader
ng generate interceptor core/interceptors/logging
```

---

## CORE RESOLVERS

```bash
ng generate resolver core/resolvers/chat
ng generate resolver core/resolvers/product
ng generate resolver core/resolvers/user
```

---

## Quick Copy-Paste (All Commands at Once)

```bash
# Shared Components
ng generate component shared/components/footer
ng generate component shared/components/header
ng generate component shared/components/navbar
ng generate component shared/components/not-found
ng generate component shared/components/toaster

# Feature Components
ng generate component features/home
ng generate component features/about
ng generate component features/auth/login
ng generate component features/auth/signup
ng generate component features/dashboard
ng generate component features/dashboard/components/chat
ng generate component features/dashboard/components/chat/chat-list
ng generate component features/dashboard/components/chat/chat-window
ng generate component features/dashboard/components/products
ng generate component features/dashboard/components/profile
ng generate component features/dashboard/components/users

# Core Services
ng generate service core/services/api
ng generate service core/services/auth
ng generate service core/services/chat
ng generate service core/services/products
ng generate service core/services/toast
ng generate service core/services/user

# Core Guards
ng generate guard core/guards/admin --implements CanActivate
ng generate guard core/guards/auth --implements CanActivate
ng generate guard core/guards/login --implements CanActivate
ng generate guard core/guards/unsaved --implements CanDeactivate

# Core Interceptors
ng generate interceptor core/interceptors/auth
ng generate interceptor core/interceptors/error
ng generate interceptor core/interceptors/loader
ng generate interceptor core/interceptors/logging

# Core Resolvers
ng generate resolver core/resolvers/chat
ng generate resolver core/resolvers/product
ng generate resolver core/resolvers/user
```

---

## Alternative: Use the Batch Script (Windows)

On Windows, you can simply run:
```bash
generate-components.bat
```

This will execute all the commands automatically.

---

## Notes

- Since you selected Tailwind CSS when creating the Angular 21 app, CSS is the default style format
- The `--style=css` flag is optional and can be omitted - both commands produce the same result:
  - `ng generate component features/home --style=css` 
  - `ng generate component features/home`
- If you want to use SCSS instead (like the original Angular 20 app), you would need to:
  1. Update `angular.json` to set default style to SCSS
  2. Add `--style=scss` flag to all component commands
- After generating, you'll need to manually copy the logic, templates, and styles from the `angular-client` app
- You'll also need to create the `shared/models` directory and copy the model files manually, as Angular CLI doesn't generate models

## Additional Manual Steps Required

After running these commands, you'll need to:

1. **Copy Model Files:** Manually create `src/app/shared/models/` and copy these files from `angular-client`:
   - `auth.model.ts`
   - `chat.model.ts`
   - `message.model.ts`
   - `product.model.ts`
   - `user.model.ts`

2. **Copy Component Logic:** Copy the TypeScript logic, HTML templates, and CSS/SCSS styles from the original components

3. **Update Routes:** Configure your routes in `app.routes.ts` to match the original app structure

4. **Configure Services:** Set up service providers and dependencies in `app.config.ts`

5. **Update Guards/Interceptors/Resolvers:** Copy the implementation logic from the original files

