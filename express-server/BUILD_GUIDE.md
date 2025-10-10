# 🏗️ Build & Deployment Guide

Complete guide for building and deploying your Real-Time Chat Application.

---

## 📋 Table of Contents

- [Development Setup](#development-setup)
- [Build for Production](#build-for-production)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## 🛠️ Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the template
cp env.template .env

# Edit .env with your configuration
```

### 3. Start Development Server
```bash
npm run dev
```
- Runs with **nodemon** (auto-reload on file changes)
- Uses **ts-node** (no build required)
- Server: `http://localhost:5050`

---

## 🏗️ Build for Production

### Quick Build
```bash
npm run build
```

This will:
1. ✅ Clean the `dist/` folder
2. ✅ Compile TypeScript to JavaScript
3. ✅ Output to `dist/` directory

### Build Output Structure
```
dist/
├── server.js
├── app.js
├── config/
│   └── database.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── chat.controller.js
│   └── session.controller.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── user.model.js
│   ├── chat.model.js
│   ├── session.model.js
│   └── auth.model.js
├── routes/
│   ├── index.routes.js
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── chat.routes.js
│   └── session.routes.js
├── schemas/
│   ├── user.schema.js
│   ├── chat.schema.js
│   ├── session.schema.js
│   └── auth.schema.js
├── socket/
│   └── index.js
└── utils/
    └── jwt.js
```

### Watch Mode (Development Build)
```bash
npm run build:watch
```
Rebuilds automatically when files change.

---

## 🚀 Running Production Build

### Local Test
```bash
# Build first
npm run build

# Run production server
npm start
```

### Production Mode
```bash
npm run start:prod
```
Runs with `NODE_ENV=production`

---

## 📦 Deployment

### Option 1: Traditional Server (VPS/Dedicated)

#### 1. Prepare Server
```bash
# SSH into your server
ssh user@your-server.com

# Install Node.js (v16+)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
# See: https://docs.mongodb.com/manual/installation/
```

#### 2. Upload Code
```bash
# On your local machine
rsync -avz --exclude node_modules --exclude dist ./ user@your-server.com:/var/www/chat-app/
```

#### 3. Build & Run on Server
```bash
# SSH into server
cd /var/www/chat-app

# Install dependencies
npm install --production

# Build
npm run build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start dist/server.js --name chat-app
pm2 save
pm2 startup
```

---

### Option 2: Docker Deployment

#### Create Dockerfile
```dockerfile
# Dockerfile (create this in your project root)
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5050

# Start app
CMD ["npm", "start"]
```

#### Create .dockerignore
```
node_modules
dist
.env
.git
*.md
```

#### Build & Run Docker
```bash
# Build image
docker build -t chat-app .

# Run container
docker run -p 5050:5050 --env-file .env chat-app
```

---

### Option 3: Cloud Platforms

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-chat-app

# Set environment variables
heroku config:set PORT=5050
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret

# Deploy
git push heroku master
```

#### Railway / Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables in dashboard
5. Deploy!

---

## 🔐 Environment Variables

### Required Variables
```env
# Server
PORT=5050
NODE_ENV=production

# Database
MONGO_URI=mongodb://localhost:27017/chat-application

# Security
JWT_SECRET=your-super-secret-key-change-in-production

# CORS (optional)
CORS_ORIGIN=https://your-frontend.com
```

### Setting Environment Variables

**Linux/Mac:**
```bash
export PORT=5050
export MONGO_URI="mongodb://..."
```

**Windows:**
```cmd
set PORT=5050
set MONGO_URI=mongodb://...
```

**Production (PM2):**
```bash
pm2 start dist/server.js --name chat-app --env production
```

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm run build` | Build for production |
| `npm run build:watch` | Build in watch mode |
| `npm start` | Run production build |
| `npm run start:prod` | Run in production mode |
| `npm run clean` | Clean dist folder |
| `npm run type-check` | Check TypeScript types without building |

---

## 🔍 Type Checking

Check for TypeScript errors without building:
```bash
npm run type-check
```

---

## 🧹 Clean Build

Remove all compiled files:
```bash
npm run clean
```

Then rebuild:
```bash
npm run build
```

---

## 🐛 Troubleshooting

### Build Errors

**Issue: `Cannot find module`**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

**Issue: TypeScript errors**
```bash
# Check types
npm run type-check

# Fix errors in source files
```

### Runtime Errors

**Issue: `Cannot find dist/server.js`**
```bash
# Build first
npm run build

# Then start
npm start
```

**Issue: Port already in use**
```bash
# Change port in .env
PORT=5051
```

### Production Issues

**Issue: Environment variables not loading**
- Make sure `.env` file exists in production
- Use `dotenv` in production mode
- Or set environment variables in your hosting platform

**Issue: MongoDB connection fails**
- Check `MONGO_URI` is correct
- Ensure MongoDB is running
- Check firewall/security group settings

---

## 📊 Build Verification

After building, verify the output:

```bash
# Check dist folder exists
ls -la dist/

# Check main file exists
ls -la dist/server.js

# Check all folders compiled
ls -la dist/controllers/
ls -la dist/models/
ls -la dist/routes/
```

Expected output structure:
```
dist/
├── server.js ✅
├── app.js ✅
├── controllers/ ✅
├── models/ ✅
├── routes/ ✅
├── schemas/ ✅
└── utils/ ✅
```

---

## 🎯 Production Checklist

Before deploying to production:

- [ ] Build runs successfully (`npm run build`)
- [ ] All environment variables are set
- [ ] Database connection works
- [ ] JWT secret is changed from default
- [ ] CORS is configured properly
- [ ] Logs are being captured
- [ ] Error handling is in place
- [ ] Health check endpoint works (`/health`)
- [ ] SSL/HTTPS is configured
- [ ] Rate limiting is enabled (if needed)

---

## 🔗 Useful Links

- [Node.js Deployment Guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud MongoDB)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)

---

## 📞 Support

If you encounter issues during build or deployment:
1. Check the error logs
2. Verify all dependencies are installed
3. Ensure environment variables are set correctly
4. Check MongoDB connection

---

**Happy Building! 🚀**

