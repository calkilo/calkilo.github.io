# Calkilo Landing Page - Next.js

A modern, responsive landing page for Calkilo AI Calorie Calculator built with Next.js, React, and TypeScript.

## Features

- 🚀 Next.js 14 with App Router
- ⚛️ React 18 with TypeScript
- 🌍 Internationalization (i18n) support for 10 languages
- 📱 Fully responsive design
- 🎨 Modern UI with Bootstrap Icons
- ⚡ Optimized performance with Next.js Image optimization
- 🔍 SEO optimized with meta tags and structured data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
calkilo-landing/
├── components/          # React components
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx       # Footer component
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Next.js pages
│   ├── index.tsx       # Home page
│   ├── contact.tsx     # Contact page
│   ├── faq.tsx         # FAQ page
│   └── ...             # Other pages
├── public/             # Static assets
│   └── assest/         # Images and logos
├── styles/             # Global styles
│   └── globals.css     # Main stylesheet
└── locales/            # i18n translation files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The app can be deployed to Vercel, Netlify, GitHub Pages, or any platform that supports Next.js.

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages using GitHub Actions:

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy your site on every push to `main`

The site will be available at:
- `https://<username>.github.io/<repository-name>/` (default)
- `https://calkilo.com/` (if using custom domain)

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the .next folder
```

## Internationalization

The app supports 10 languages:
- English (en)
- Persian/Farsi (fa)
- Chinese (zh)
- Russian (ru)
- Italian (it)
- French (fr)
- German (de)
- Arabic (ar)
- Spanish (es)
- Dutch (nl)

Language switching is handled automatically based on the URL path or user preference.

## License

Copyright © 2025 Calkilo. All rights reserved.
