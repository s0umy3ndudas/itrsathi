interface MetaProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export function Meta({ 
  title = "ITR Sathi — File ITRs Fast. Securely.",
  description = "India's fastest and most secure ITR filing platform. File your income tax returns with guided assistance, auto calculations, and secure storage.",
  canonical = "https://www.itrsathi.in",
  ogImage = "https://www.itrsathi.in/assets/og-image.png"
}: MetaProps) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ITR Sathi",
    "url": "https://www.itrsathi.in",
    "logo": "https://res.cloudinary.com/dqec3i92u/image/upload/v1758477172/itrsathi_green_1_v5ruil.png",
    "description": description,
    "sameAs": [
      "https://app.itrsathi.in"
    ]
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ITR Sathi",
    "url": "https://www.itrsathi.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://app.itrsathi.in/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ITR Sathi" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#16a34a" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
    </head>
  );
}