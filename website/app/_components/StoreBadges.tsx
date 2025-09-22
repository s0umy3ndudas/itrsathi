import Image from 'next/image';

interface StoreBadgesProps {
  playStoreUrl: string;
  appStoreUrl: string;
  className?: string;
}

export default function StoreBadges({ 
  playStoreUrl, 
  appStoreUrl, 
  className = "" 
}: StoreBadgesProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center sm:justify-start ${className}`}>
      {/* Play Store Badge */}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring rounded-lg transition-transform hover:scale-105"
        aria-label="Download ITR Sathi from Google Play Store"
      >
        <Image
          src="/assets/play-store-badge.png"
          alt="Get it on Google Play"
          width={160}
          height={48}
          className="h-12 w-auto"
          priority
        />
      </a>

      {/* App Store Badge */}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring rounded-lg transition-transform hover:scale-105"
        aria-label="Download ITR Sathi from Apple App Store"
      >
        <Image
          src="/assets/app-store-badge.png"
          alt="Download on the App Store"
          width={160}
          height={48}
          className="h-12 w-auto"
          priority
        />
      </a>
    </div>
  );
}