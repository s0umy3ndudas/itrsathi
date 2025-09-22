'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 focus-ring rounded-lg">
            <Image
              src="https://res.cloudinary.com/dqec3i92u/image/upload/v1758514427/itrsathi__1_-removebg-preview_qqrcer.png"
              alt="ITR Sathi Logo"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ITR Sathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-1">
              Home
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-1">
              Blogs
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-1">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-1">
              Contact
            </Link>
            <Link 
              href="https://app.itrsathi.in" 
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open App
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus-ring rounded p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/blogs" 
                className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link 
                href="#pricing" 
                className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#contact" 
                className="text-gray-700 hover:text-primary-600 transition-colors focus-ring rounded px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="https://app.itrsathi.in" 
                className="btn btn-primary mt-4"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Open App
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}