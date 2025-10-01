@echo off
echo 🚀 Starting deployment process...

echo 🧹 Cleaning previous build...
if exist dist rmdir /s /q dist

echo 📦 Installing dependencies...
call npm ci

echo 🔍 Running linter...
call npm run lint

echo 🏗️ Building for production...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📁 Build files are in the 'dist' folder
    echo 🌐 You can now deploy the contents of the 'dist' folder to your web server
    echo.
    echo 📋 Deployment options:
    echo 1. Upload 'dist' folder contents to your web server
    echo 2. Use Docker: docker build -t valpro-app . ^&^& docker run -p 80:80 valpro-app
    echo 3. Use static hosting services like Netlify, Vercel, or GitHub Pages
) else (
    echo ❌ Build failed! Please check the errors above.
    exit /b 1
)
