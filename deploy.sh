#!/bin/bash

# Deployment script for Valpro Intertech
echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build for production
echo "🏗️ Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' folder"
    echo "🌐 You can now deploy the contents of the 'dist' folder to your web server"
    echo ""
    echo "📋 Deployment options:"
    echo "1. Upload 'dist' folder contents to your web server"
    echo "2. Use Docker: docker build -t valpro-app . && docker run -p 80:80 valpro-app"
    echo "3. Use static hosting services like Netlify, Vercel, or GitHub Pages"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
