'use client';

import { useState } from 'react';
import Image from 'next/image';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container-responsive py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 focus-visible">
            <Image
              src="https://res.cloudinary.com/dqec3i92u/image/upload/v1758514427/itrsathi__1_-removebg-preview_qqrcer.png"
              alt="ITR Sathi Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">ITR Sathi</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">
              Home
            </a>
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">
              Features
            </a>
            <a href="/blogs" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">
              Blogs
            </a>
            <a href="/pricing" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">
              Pricing
            </a>
            <a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors focus-visible">
              Contact
            </a>
            <a 
              href="https://app.itrsathi.in" 
              className="btn-primary focus-visible"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open App
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus-visible"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100 fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="/" 
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2 focus-visible"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#features" 
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2 focus-visible"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="/blogs" 
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2 focus-visible"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </a>
              <a 
                href="/pricing" 
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2 focus-visible"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="/contact" 
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2 focus-visible"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://app.itrsathi.in" 
                className="btn-primary text-center mt-4 focus-visible"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Open App
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}