import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="https://res.cloudinary.com/dqec3i92u/image/upload/v1758514867/itrsathi_green__1_-removebg-preview_qinpju.png"
                alt="ITR Sathi Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">ITR Sathi</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              India&apos;s fastest and most secure ITR filing platform. File your returns with confidence.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors focus-ring rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors focus-ring rounded">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors focus-ring rounded">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors focus-ring rounded">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#contact" className="hover:text-white transition-colors focus-ring rounded">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors focus-ring rounded">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors focus-ring rounded">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors focus-ring rounded">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors focus-ring rounded">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors focus-ring rounded">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors focus-ring rounded">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition-colors focus-ring rounded">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} ITR Sathi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="https://app.itrsathi.in" 
              className="text-sm hover:text-white transition-colors focus-ring rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch App
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors focus-ring rounded">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}