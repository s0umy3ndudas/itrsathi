import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Meta } from './seo/Meta';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ITR Sathi — File ITRs Fast. Securely.',
  description: 'India\'s fastest and most secure ITR filing platform. File your income tax returns with guided assistance, auto calculations, and secure storage.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Meta />
      <body className={inter.className}>
        {children}
        {/* Google Analytics - conditionally loaded */}
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
      </body>
    </html>
  );
}