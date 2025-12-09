@echo off
REM Navigate to the Angular 21 application directory
cd real-time-chat-application

REM ============================================
REM SHARED COMPONENTS
REM ============================================
echo Generating Shared Components...

REM Footer Component
ng generate component shared/components/footer

REM Header Component
ng generate component shared/components/header

REM Navbar Component
ng generate component shared/components/navbar

REM Not Found Component
ng generate component shared/components/not-found

REM Toaster Component
ng generate component shared/components/toaster

REM ============================================
REM FEATURE COMPONENTS
REM ============================================
echo Generating Feature Components...

REM Home Component
ng generate component features/home

REM About Component
ng generate component features/about

REM Auth - Login Component
ng generate component features/auth/login

REM Auth - Signup Component
ng generate component features/auth/signup

REM Dashboard Component
ng generate component features/dashboard

REM Dashboard - Chat Component
ng generate component features/dashboard/components/chat

REM Dashboard - Chat List Component
ng generate component features/dashboard/components/chat/chat-list

REM Dashboard - Chat Window Component
ng generate component features/dashboard/components/chat/chat-window

REM Dashboard - Products Component
ng generate component features/dashboard/components/products

REM Dashboard - Profile Component
ng generate component features/dashboard/components/profile

REM Dashboard - Users Component
ng generate component features/dashboard/components/users

REM ============================================
REM CORE SERVICES
REM ============================================
echo Generating Core Services...

REM API Service
ng generate service core/services/api

REM Auth Service
ng generate service core/services/auth

REM Chat Service
ng generate service core/services/chat

REM Products Service
ng generate service core/services/products

REM Toast Service
ng generate service core/services/toast

REM User Service
ng generate service core/services/user

REM ============================================
REM CORE GUARDS
REM ============================================
echo Generating Core Guards...

REM Admin Guard - CanActivate
ng generate guard core/guards/admin --implements CanActivate

REM Auth Guard - CanActivate
ng generate guard core/guards/auth --implements CanActivate

REM Login Guard - CanActivate
ng generate guard core/guards/login --implements CanActivate

REM Unsaved Guard - CanDeactivate
ng generate guard core/guards/unsaved --implements CanDeactivate

REM ============================================
REM CORE INTERCEPTORS
REM ============================================
echo Generating Core Interceptors...

REM Auth Interceptor
ng generate interceptor core/interceptors/auth

REM Error Interceptor
ng generate interceptor core/interceptors/error

REM Loader Interceptor
ng generate interceptor core/interceptors/loader

REM Logging Interceptor
ng generate interceptor core/interceptors/logging

REM ============================================
REM CORE RESOLVERS
REM ============================================
echo Generating Core Resolvers...

REM Chat Resolver
ng generate resolver core/resolvers/chat

REM Product Resolver
ng generate resolver core/resolvers/product

REM User Resolver
ng generate resolver core/resolvers/user

echo All components generated successfully!
pause

