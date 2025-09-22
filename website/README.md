# ITR Sathi - Landing Page

A modern, mobile-first landing page for ITR Sathi built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 Mobile-first responsive design
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🔍 SEO optimized with meta tags and JSON-LD
- ♿ Accessibility focused
- 🚀 Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd itrsathi-www
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push to main

### Manual Deployment

```bash
npm run build
npm run start
```

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Store URLs

Update the store URLs in the landing page:

1. Open `app/page.tsx`
2. Find the `StoreBadges` components
3. Update `playStoreUrl` and `appStoreUrl` props with actual store links

### Analytics

To add Google Analytics:

1. Get your GA4 Measurement ID
2. Add it to your environment variables
3. The tracking code will be automatically injected

## Project Structure

```
website/
├── app/                    # Next.js App Router
│   ├── _components/       # Reusable components
│   ├── seo/              # SEO components
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── public/               # Static assets
│   └── assets/          # Images and icons
├── scripts/             # Utility scripts
└── ...config files
```

## Customization

### Colors

The design uses a green primary color scheme. To change colors:

1. Update `tailwind.config.js`
2. Modify the `primary` color palette
3. Colors will be automatically applied throughout

### Content

Key content files to update:

- `app/page.tsx` - Main landing page content
- `app/_components/Footer.tsx` - Footer links and information
- `app/seo/Meta.tsx` - SEO metadata

### Images

Replace placeholder images in `public/assets/`:

- `logo.svg` - Company logo (currently uses Cloudinary URL)
- `og-image.png` - Open Graph image
- `play-store-badge.png` - Google Play Store badge
- `app-store-badge.png` - Apple App Store badge

## SEO

The site includes comprehensive SEO:

- Meta tags for all major platforms
- JSON-LD structured data
- Sitemap generation (see `scripts/generate-sitemap.js`)
- robots.txt
- Open Graph and Twitter Card support

## Performance

- Next.js Image optimization
- Static generation for fast loading
- Minimal JavaScript bundle
- Optimized fonts and assets

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)
- iOS Safari 12+
- Chrome Mobile (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## License

This project is proprietary to ITR Sathi.

## Support

For technical support, please contact the development team or create an issue in the repository.

---

Built with ❤️ by the ITR Sathi team