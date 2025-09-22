# ITR Sathi - CA Management Software Landing Page

A modern, mobile-first landing page for ITR Sathi, built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS.

## 🚀 Features

- **Mobile-First Design**: Optimized for all screen sizes starting from mobile
- **Modern UI/UX**: Clean, green-themed design with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- **Accessibility**: WCAG compliant with proper ARIA labels and focus states
- **Performance**: Optimized images, fonts, and assets
- **Production Ready**: Configured for Vercel deployment

## 📱 Pages & Components

- **Landing Page** (`app/page.tsx`): Hero, features, testimonials, and app preview
- **Header** (`app/_components/Header.tsx`): Responsive navigation with mobile menu
- **Footer** (`app/_components/Footer.tsx`): Links, contact info, and legal pages
- **Store Badges** (`app/_components/StoreBadges.tsx`): Play Store and App Store download buttons
- **SEO Meta** (`app/seo/Meta.tsx`): Comprehensive meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel
- **Icons**: Lucide React + Custom SVGs

## 📦 Installation & Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd itrsathi-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## 🎨 Customization

### Brand Colors
The website uses a green theme defined in `app/globals.css`:
- Primary Green: `#059669`
- Secondary Green: `#d1fae5`
- Accent Green: `#34d399`

### Logo
Update the logo URLs in the components:
- Green logo: `https://res.cloudinary.com/dqec3i92u/image/upload/v1758514427/itrsathi__1_-removebg-preview_qqrcer.png`
- White logo: `https://res.cloudinary.com/dqec3i92u/image/upload/v1758514867/itrsathi_green__1_-removebg-preview_qinpju.png`

### Store Links
Update the store URLs in `app/page.tsx`:
- Play Store: Currently set to `https://play.google.com/store/apps/details?id=com.itrsathi`
- App Store: Currently set to `https://apps.apple.com/app/idXXXXXXXXX` (placeholder)

## 📊 Analytics Setup

To enable Google Analytics:

1. **Add environment variable**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **The tracking code is already configured** in `app/layout.tsx` and will automatically load when the environment variable is present.

## 🗂️ Assets

Place the following assets in `public/assets/`:
- `logo.svg` - Main logo
- `og-image.png` - Open Graph image (1200x630)
- `play-store-badge.png` - Google Play Store badge
- `app-store-badge.png` - Apple App Store badge

## 📄 SEO Configuration

### Sitemap Generation
Generate sitemap automatically:
```bash
node scripts/generate-sitemap.js
```

### Robots.txt
The robots.txt file is automatically configured to:
- Allow search engine crawling
- Block sensitive areas (/api/, /admin/, etc.)
- Reference the sitemap location

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your GitHub repository** to Vercel
2. **Configure environment variables** (if using Analytics)
3. **Deploy** - Vercel will automatically build and deploy

### Domain Setup
The `vercel.json` includes redirects to ensure:
- `itrsathi.in` → `https://www.itrsathi.in`
- Proper security headers
- Asset caching optimization

## 📱 Mobile Optimization

- **Responsive Design**: Breakpoints at 640px, 768px, 1024px, 1280px
- **Touch-Friendly**: Minimum 44px touch targets
- **Performance**: Optimized images with Next.js Image component
- **Accessibility**: Screen reader compatible and keyboard navigable

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- Frame options
- Referrer policy
- HTTPS enforcement

## 📋 Todo / Next Steps

- [ ] Replace placeholder app store URLs with actual store links
- [ ] Add real testimonials and customer logos
- [ ] Create blog section (`/blogs`)
- [ ] Add pricing page (`/pricing`)
- [ ] Set up contact form functionality
- [ ] Add Google Analytics measurement ID
- [ ] Upload real app screenshots and assets
- [ ] Set up proper favicon files
- [ ] Add loading states and error boundaries
- [ ] Implement blog CMS integration

## 📞 Support

For support and questions:
- Email: support@itrsathi.in
- Website: [www.itrsathi.in](https://www.itrsathi.in)

## 📄 License

© 2025 ITR Sathi. All rights reserved.