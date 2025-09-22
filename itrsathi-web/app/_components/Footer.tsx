import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-responsive py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="https://res.cloudinary.com/dqec3i92u/image/upload/v1758514427/itrsathi__1_-removebg-preview_qqrcer.png"
                alt="ITR Sathi Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-gray-900">ITR Sathi</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Complete CA assessee management software for Indian Chartered Accountants.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors focus-visible" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors focus-visible" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Home</a></li>
              <li><a href="/blogs" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Blogs</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Pricing</a></li>
              <li><a href="/docs" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Docs</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Cookie Policy</a></li>
              <li><a href="/refund" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                <strong>Email:</strong> support@itrsathi.in
              </li>
              <li className="text-gray-600">
                <strong>Phone:</strong> +91-XXXX-XXXXXX
              </li>
              <li className="text-gray-600">
                <strong>Address:</strong> Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} ITR Sathi. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Made with ❤️ for Chartered Accountants in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}