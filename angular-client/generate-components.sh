#!/bin/bash

# Navigate to the Angular 21 application directory
cd real-time-chat-application

# ============================================
# SHARED COMPONENTS
# ============================================
echo "Generating Shared Components..."

# Footer Component
ng generate component shared/components/footer

# Header Component
ng generate component shared/components/header

# Navbar Component
ng generate component shared/components/navbar

# Not Found Component
ng generate component shared/components/not-found

# Toaster Component
ng generate component shared/components/toaster

# ============================================
# FEATURE COMPONENTS
# ============================================
echo "Generating Feature Components..."

# Home Component
ng generate component features/home

# About Component
ng generate component features/about

# Auth - Login Component
ng generate component features/auth/login

# Auth - Signup Component
ng generate component features/auth/signup

# Dashboard Component
ng generate component features/dashboard

# Dashboard - Chat Component
ng generate component features/dashboard/components/chat

# Dashboard - Chat List Component
ng generate component features/dashboard/components/chat/chat-list

# Dashboard - Chat Window Component
ng generate component features/dashboard/components/chat/chat-window

# Dashboard - Products Component
ng generate component features/dashboard/components/products

# Dashboard - Profile Component
ng generate component features/dashboard/components/profile

# Dashboard - Users Component
ng generate component features/dashboard/components/users

# ============================================
# CORE SERVICES
# ============================================
echo "Generating Core Services..."

# API Service
ng generate service core/services/api

# Auth Service
ng generate service core/services/auth

# Chat Service
ng generate service core/services/chat

# Products Service
ng generate service core/services/products

# Toast Service
ng generate service core/services/toast

# User Service
ng generate service core/services/user

# ============================================
# CORE GUARDS
# ============================================
echo "Generating Core Guards..."

# Admin Guard - CanActivate
ng generate guard core/guards/admin --implements CanActivate

# Auth Guard - CanActivate
ng generate guard core/guards/auth --implements CanActivate

# Login Guard - CanActivate
ng generate guard core/guards/login --implements CanActivate

# Unsaved Guard - CanDeactivate
ng generate guard core/guards/unsaved --implements CanDeactivate

# ============================================
# CORE INTERCEPTORS
# ============================================
echo "Generating Core Interceptors..."

# Auth Interceptor
ng generate interceptor core/interceptors/auth

# Error Interceptor
ng generate interceptor core/interceptors/error

# Loader Interceptor
ng generate interceptor core/interceptors/loader

# Logging Interceptor
ng generate interceptor core/interceptors/logging

# ============================================
# CORE RESOLVERS
# ============================================
echo "Generating Core Resolvers..."

# Chat Resolver
ng generate resolver core/resolvers/chat

# Product Resolver
ng generate resolver core/resolvers/product

# User Resolver
ng generate resolver core/resolvers/user

echo "All components generated successfully!"

