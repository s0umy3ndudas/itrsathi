import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Meta } from './seo/Meta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ITR Sathi - Manage Assessee with Speed | CA Management Software',
  description: 'ITR Sathi is the complete CA assessee management software for Indian Chartered Accountants. Manage multiple clients, guided filing, auto calculations, and secure storage all in one place.',
  keywords: 'CA software, ITR filing, tax software, chartered accountant, assessee management, tax return, GST',
  authors: [{ name: 'ITR Sathi Team' }],
  creator: 'ITR Sathi',
  publisher: 'ITR Sathi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.itrsathi.in',
    title: 'ITR Sathi - Manage Assessee with Speed',
    description: 'Complete CA assessee management software for Indian Chartered Accountants. Streamline your practice with guided filing, auto calculations, and secure storage.',
    siteName: 'ITR Sathi',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ITR Sathi - CA Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITR Sathi - Manage Assessee with Speed',
    description: 'Complete CA assessee management software for Indian Chartered Accountants.',
    images: ['/assets/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  alternates: {
    canonical: 'https://www.itrsathi.in',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Meta />
        {/* Google Analytics - Add your GA4 Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}