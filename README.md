# Valpro Company Profile Landing Page

A modern, responsive company profile landing page built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern and responsive design
- 📱 Mobile-first approach
- ⚡ Fast loading with Vite
- 🎯 SEO-friendly structure
- 📧 Contact form functionality
- 🎪 Interactive components

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with mobile menu
│   ├── Hero.jsx            # Hero section with call-to-action
│   ├── About.jsx           # Company information and stats
│   ├── Services.jsx        # Services showcase
│   ├── Portfolio.jsx       # Project portfolio
│   ├── Contact.jsx         # Contact form and information
│   ├── Footer.jsx          # Footer with links and social media
│   └── Home.jsx            # Additional home content
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── index.css               # Global styles with Tailwind
└── main.jsx                # Application entry point
```

## Technologies Used

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Customization

### Colors
The main brand colors used in this project:
- Primary Blue: `#2563eb` (blue-600)
- Secondary Blue: `#1d4ed8` (blue-700)
- Accent Yellow: `#fbbf24` (yellow-400)
- Text Gray: `#374151` (gray-700)

### Content
Update the following files to customize content:
- `src/components/Hero.jsx` - Main headline and description
- `src/components/About.jsx` - Company information and statistics
- `src/components/Services.jsx` - Services offered
- `src/components/Portfolio.jsx` - Project showcase
- `src/components/Contact.jsx` - Contact information and form

### Styling
All styling is done with Tailwind CSS classes. You can:
- Modify colors in component files
- Add custom CSS in `src/index.css`
- Extend Tailwind configuration in `tailwind.config.js`

## Deployment

This project can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## License

This project is open source and available under the [MIT License](LICENSE).