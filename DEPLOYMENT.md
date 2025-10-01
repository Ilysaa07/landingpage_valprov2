# Deployment Guide - Valpro Intertech

## Pre-deployment Checklist

### 1. Build Optimization
- ✅ Meta tags and favicon configured
- ✅ Vite build configuration optimized
- ✅ Code splitting configured
- ✅ Minification enabled

### 2. Environment Setup
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build locally
npm run preview
```

### 3. Deployment Options

#### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)
1. Build the project: `npm run build`
2. Upload the `dist` folder contents to your hosting provider
3. Configure custom domain if needed

#### Option 2: Traditional Web Server (Apache, Nginx)
1. Build the project: `npm run build`
2. Upload `dist` folder contents to web server root
3. Configure server to serve `index.html` for all routes (SPA routing)

#### Option 3: Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. SEO Configuration
- Meta tags configured in `index.html`
- SEO component available in `src/components/SEO.jsx`
- Sitemap available at `/sitemap.xml`
- Robots.txt available at `/robots.txt`

### 5. Performance Optimization
- Code splitting enabled
- Assets minified
- Images optimized
- Lazy loading implemented

### 6. Security Headers (for production)
Add these headers to your server configuration:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## File Structure After Build
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── robots.txt
└── sitemap.xml
```
