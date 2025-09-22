import { Header } from './_components/Header';
import { Footer } from './_components/Footer';
import { StoreBadges } from './_components/StoreBadges';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16 md:py-24 lg:py-32">
        <div className="container-responsive">
          <div className="text-center fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ITR Sathi —{' '}
              <span className="text-emerald-600">Manage Assessee</span>{' '}
              with Speed
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Complete CA assessee management software for Indian Chartered Accountants. 
              Streamline your practice with guided filing, auto calculations, and secure storage all in one place.
            </p>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href="https://app.itrsathi.in" 
                className="btn-primary text-center min-w-[160px] focus-visible"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open App
              </a>
              <a 
                href="#features" 
                className="btn-secondary text-center min-w-[160px] focus-visible"
              >
                Learn More
              </a>
            </div>
            
            {/* Store Badges */}
            <div className="slide-up">
              <StoreBadges 
                playStoreUrl="https://play.google.com/store/apps/details?id=com.itrsathi"
                appStoreUrl="https://apps.apple.com/app/idXXXXXXXXX"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for CA Practice
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and enhance client management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="card text-center fade-in">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Guided Filing</h3>
              <p className="text-gray-600">Step-by-step guidance for accurate ITR filing with built-in validations.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="card text-center fade-in">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Calculations</h3>
              <p className="text-gray-600">Automated tax calculations with real-time updates and error checking.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="card text-center fade-in">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Storage</h3>
              <p className="text-gray-600">Bank-grade security for all client data and documents with encrypted storage.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="card text-center fade-in">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast KYC</h3>
              <p className="text-gray-600">Quick client onboarding with automated KYC verification and document management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See ITR Sathi in Action
            </h2>
            <p className="text-lg text-gray-600">
              Experience the power of modern CA practice management.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card text-center">
              <div className="relative w-full aspect-video mb-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl overflow-hidden">
                <Image
                  src="/assets/og-image.png"
                  alt="ITR Sathi App Preview - Dashboard showing client management interface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                />
              </div>
              <p className="text-gray-600 font-medium">
                App Preview - Complete dashboard for managing all your clients and their tax filings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by CAs Across India
            </h2>
            <p className="text-lg text-gray-600">
              See what practicing Chartered Accountants say about ITR Sathi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 font-semibold text-lg">RS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">CA Rajesh Sharma</h4>
                  <p className="text-gray-600 text-sm">Mumbai</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "ITR Sathi has transformed my practice. Managing 500+ clients is now effortless with automated calculations and guided filing."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 font-semibold text-lg">PK</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">CA Priya Kumari</h4>
                  <p className="text-gray-600 text-sm">Delhi</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The security features and document management make client data handling worry-free. Highly recommended for modern CA practices."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 font-semibold text-lg">AM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">CA Arjun Mehta</h4>
                  <p className="text-gray-600 text-sm">Bangalore</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Fast KYC and automated validations save hours of manual work. ITR Sathi is essential for any serious CA practice."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}