# URL-Based Language Routing

This document explains how URL-based language routing works for the Calkilo landing page.

## Overview

Each language is now accessible via a URL path:
- English: `/en` (or `/` which redirects to `/en`)
- Persian: `/fa`
- Chinese: `/zh`
- Russian: `/ru`
- Italian: `/it`
- French: `/fr`
- German: `/de`
- Arabic: `/ar`
- Spanish: `/es`
- Dutch: `/nl`

## How It Works

### Client-Side Routing

The JavaScript in `i18n.js` handles URL-based language detection:

1. **URL Detection**: When the page loads, it checks the URL path for a language code
2. **Language Priority**: 
   - First checks URL path (highest priority)
   - Then checks localStorage (saved preference)
   - Finally checks browser language
3. **URL Updates**: When language is changed via the language selector, the URL updates automatically using the History API (no page reload)

### Server Configuration

Server configuration files are included for different hosting platforms:

- **`.htaccess`**: For Apache servers
- **`_redirects`**: For Netlify
- **`netlify.toml`**: For Netlify (alternative configuration)

These files ensure that:
- Root path `/` redirects to `/en`
- Language paths like `/fa`, `/zh`, etc. serve `index.html` (client-side routing handles the rest)
- All routes fall back to `index.html` for SPA behavior

## Examples

- Visit `https://calkilo.com/fa` → Persian version loads
- Visit `https://calkilo.com/zh` → Chinese version loads
- Visit `https://calkilo.com/` → Redirects to `/en` → English version loads
- Change language via selector → URL updates to `/fa`, `/zh`, etc.

## Browser Support

- Uses History API for URL updates (no page reload)
- Falls back gracefully for older browsers
- Works with browser back/forward buttons

## SEO Benefits

- Each language has its own URL
- Search engines can index different language versions separately
- Better for sharing specific language versions

## Testing

To test locally:

1. Start a local server (e.g., `python -m http.server` or `npx serve`)
2. Visit `http://localhost:8000/fa` - should show Persian version
3. Visit `http://localhost:8000/zh` - should show Chinese version
4. Change language via selector - URL should update
5. Use browser back button - should navigate language history

Note: For full server redirect functionality, you'll need to deploy to a server that supports the configuration files (Apache, Netlify, etc.).
