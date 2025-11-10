# Brince Solutions Website

A modern, high-end, fully responsive business website for Brince Solutions - a professional technology and consulting company.

## Features

- 🎨 Modern, luxurious design with premium animations
- 🌓 Dark and light mode support
- 📱 Fully responsive (mobile-first)
- ⚡ Performance optimized with lazy loading
- 🎭 Smooth animations using Framer Motion
- 📧 Formspree integration for contact forms
- 🗺️ Google Maps integration
- 🍪 Cookie consent banner
- ♿ Accessible and SEO optimized

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Formspree** for form submissions

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up Formspree:
   - Create an account at [Formspree](https://formspree.io/)
   - Create a new form and get your form ID
   - Update `src/components/ContactForm.tsx` and replace `YOUR_FORMSPREE_ID` with your actual form ID

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main` or `master` branch

3. **Update Base Path (if needed):**
   - If your repository name is different from `brince_landing_page`, update the base path in `vite.config.ts`:
   ```typescript
   base: process.env.GITHUB_PAGES === 'true' ? '/YOUR_REPO_NAME/' : '/',
   ```

4. **Manual Deployment:**
   - You can also trigger deployment manually by going to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

### Important Notes

- The site uses **HashRouter** for routing, which ensures all routes work correctly on GitHub Pages
- The deployment workflow runs automatically on every push to the main branch
- Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Project Structure

```
src/
  components/       # Reusable components
  pages/            # Page components
  context/          # React context providers
  utils/            # Utility functions and constants
  App.tsx           # Main app component with routing
  main.tsx          # Entry point
```

## Configuration

### Formspree Setup

1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Copy your form ID
4. Update `src/components/ContactForm.tsx`:
   ```tsx
   const [state, handleSubmit] = useForm('YOUR_FORMSPREE_ID');
   ```

### Google Maps

The Google Maps embed URL in `src/pages/Contact.tsx` uses the company address. Update the `mapUrl` variable if needed.

### Customization

- **Colors**: Update theme colors in `tailwind.config.js`
- **Content**: Update company information in `src/utils/constants.ts`
- **Images**: All images use Unsplash. Update URLs in `constants.ts` or replace with your own images

## Pages

- **Home** (`/`) - Hero section, services preview, statistics, testimonials, news
- **About** (`/about`) - Company overview, mission, vision, team, testimonials, partners
- **Services** (`/services`) - Detailed service descriptions and appointment booking
- **Contact** (`/contact`) - Contact form and company information
- **News** (`/news`) - Latest news and blog posts
- **BrightHR** (`/brighthr`) - Partnership information and demo booking

## Features Details

### Dark Mode

Toggle dark/light mode using the theme toggle button in the navbar. Preference is saved in localStorage.

### Animations

Smooth scroll animations, hover effects, and transitions are implemented throughout using Framer Motion.

### SEO

- Meta tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images

### Performance

- Lazy loading for images
- Code splitting with React Router
- Optimized bundle size

## License

Copyright © 2025 Brince Solutions Ltd - All Rights Reserved.

## Support

For support, email info@brincesolutions.com or visit our website.
