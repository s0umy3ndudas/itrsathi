'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from './_components/Header';
import Footer from './_components/Footer';
import StoreBadges from './_components/StoreBadges';

export default function Home() {
  // Simple scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              ITR Sathi —{' '}
              <span className="text-primary-600">File ITRs Fast.</span>{' '}
              <span className="text-primary-600">Securely.</span>
            </h1>
            
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
              India's fastest and most secure ITR filing platform. Get guided assistance, 
              automated calculations, and secure storage for all your tax documents.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="https://app.itrsathi.in" 
                className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open App
              </Link>
              <Link 
                href="#features" 
                className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>

            {/* Store Badges */}
            <div className="mt-12">
              <StoreBadges 
                playStoreUrl="https://play.google.com/store/apps/details?id=com.itrsathi"
                appStoreUrl="https://apps.apple.com/app/idXXXXXXXXX"
                className="justify-center"
              />
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ITR Sathi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the easiest way to file your income tax returns with our comprehensive features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card animate-on-scroll text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Guided Filing</h3>
              <p className="text-gray-600 leading-relaxed">Step-by-step guidance through the entire ITR filing process with expert assistance.</p>
            </div>

            {/* Feature 2 */}
            <div className="card animate-on-scroll text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Auto Calculations</h3>
              <p className="text-gray-600 leading-relaxed">Automated tax calculations with real-time validation and error checking.</p>
            </div>

            {/* Feature 3 */}
            <div className="card animate-on-scroll text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Storage</h3>
              <p className="text-gray-600 leading-relaxed">Bank-level security with encrypted storage for all your tax documents and data.</p>
            </div>

            {/* Feature 4 */}
            <div className="card animate-on-scroll text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast KYC</h3>
              <p className="text-gray-600 leading-relaxed">Quick identity verification process with minimal documentation required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              See ITR Sathi in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our intuitive interface designed for effortless tax filing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="card text-center">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 p-8">
                <Image
                  src="/assets/og-image.png"
                  alt="ITR Sathi App Preview - Dashboard showing tax filing interface"
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-xl shadow-2xl"
                  priority
                />
              </div>
              <p className="text-gray-600 mt-6 text-lg">
                Our clean, user-friendly dashboard makes tax filing simple and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the growing community of satisfied users who have simplified their tax filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">RS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Rahul Sharma</h4>
                  <p className="text-gray-500 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "ITR Sathi made filing my taxes incredibly simple. The guided process saved me hours of confusion and stress."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">PG</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Priya Gupta</h4>
                  <p className="text-gray-500 text-sm">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "The automatic calculations feature is a game-changer. No more worrying about mathematical errors in my returns."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">AK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Amit Kumar</h4>
                  <p className="text-gray-500 text-sm">Consultant</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Secure storage and easy access to my tax history. ITR Sathi has everything I need in one place."
              </p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to File Your ITR?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied users and experience the easiest way to file your income tax returns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="https://app.itrsathi.in" 
                className="bg-white text-primary-600 hover:bg-gray-50 btn text-lg px-8 py-4 w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Filing Now
              </Link>
              <Link 
                href="#contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 btn text-lg px-8 py-4 w-full sm:w-auto"
              >
                Contact Us
              </Link>
            </div>

            <StoreBadges 
              playStoreUrl="https://play.google.com/store/apps/details?id=com.itrsathi"
              appStoreUrl="https://apps.apple.com/app/idXXXXXXXXX"
              className="justify-center"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}