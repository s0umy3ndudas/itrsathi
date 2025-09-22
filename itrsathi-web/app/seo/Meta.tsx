export function Meta() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.itrsathi.in/#organization",
        "name": "ITR Sathi",
        "url": "https://www.itrsathi.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dqec3i92u/image/upload/v1758514427/itrsathi__1_-removebg-preview_qqrcer.png"
        },
        "description": "Complete CA assessee management software for Indian Chartered Accountants. Manage multiple clients, guided filing, auto calculations, and secure storage all in one place.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-XXXX-XXXXXX",
          "contactType": "Customer Service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://twitter.com/itrsathi",
          "https://linkedin.com/company/itrsathi"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.itrsathi.in/#website",
        "url": "https://www.itrsathi.in",
        "name": "ITR Sathi - CA Management Software",
        "description": "ITR Sathi is the complete CA assessee management software for Indian Chartered Accountants. Manage multiple clients with guided filing, auto calculations, and secure storage.",
        "publisher": {
          "@id": "https://www.itrsathi.in/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.itrsathi.in/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "ITR Sathi",
        "operatingSystem": "Android, iOS, Web",
        "applicationCategory": "BusinessApplication",
        "description": "Complete CA assessee management software for Indian Chartered Accountants with guided filing, auto calculations, and secure storage.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150"
        }
      }
    ]
  };

  return (
    <>
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#059669" />
      <meta name="msapplication-TileColor" content="#059669" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </>
  );
}