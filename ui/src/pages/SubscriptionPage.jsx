import React, { useState } from 'react';
import { Check, Star, Zap, Users, Phone, Mail } from 'lucide-react';

const SubscriptionPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      name: 'Pro',
      price:billingCycle ===  'monthly'  ? 900  : 10800,
      period: 'month',
      description: 'Perfect for small businesses and individual professionals',
      features: [
        'Up to 50 assessees',
        'Basic proceedings tracking',
        'Standard support',
        'Monthly data sync',
        'Basic reports'
      ],
      popular: false,
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'professional',
      name: 'Mega',
      price: billingCycle ===  'monthly'  ? 1500  : 18000,
      period: 'month',
      description: 'Ideal for growing firms and tax consultancies',
      features: [
        'Unlimited assessees',
        'Advanced proceedings & demands tracking',
        'Priority support',
        'Real-time data sync',
        'Advanced analytics & reports',
        'ITR management',
        'Audit tracking',
        'Custom integrations'
      ],
      popular: true,
      color: 'from-green-600 to-green-700'
    },
    {
      id: 'lifetime',
      name: 'Ultimate',
      price: 22500,
      period: 'one-time',
      description: 'Pay once, use forever - best value for long-term users',
      features: [
        'Everything in Professional',
        'Lifetime updates',
        'No recurring fees',
        'Premium support',
        'Early access to new features',
        'Data export capabilities',
        'Advanced customization'
      ],
      popular: false,
      color: 'from-emerald-600 to-emerald-700'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Streamline your tax practice with our comprehensive assessee management platform
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-1 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Annual
               
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 xl:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800 border ${
                plan.popular ? 'border-green-500' : 'border-gray-700'
              } rounded-lg shadow-xl p-8 transform transition-all duration-200 hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-gray-300 ml-2">
                  
                  </span>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {plan.id === 'lifetime' ? 'Get Lifetime Access' : 'Start Free Trial'}
                </button>
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1 p-1 rounded-full bg-gradient-to-r ${plan.color}`}>
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise Solution</h3>
              </div>
              <p className="text-gray-300 text-lg mb-4">
                Need a custom solution for your large organization? We offer tailored packages with dedicated support, 
                custom integrations, and enterprise-grade security.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Custom pricing based on scale</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>Dedicated account manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-400" />
                  <span>On-premise deployment options</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200">
                <Phone size={20} />
                Contact Sales
              </button>
              <button className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200">
                <Mail size={20} />
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 mb-8">
            Have questions? We're here to help you choose the right plan.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Can I switch plans anytime?</h4>
              <p className="text-gray-300 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Is there a free trial?</h4>
              <p className="text-gray-300 text-sm">
                Yes, we offer a 14-day free trial for all paid plans. No credit card required to start.
              </p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-300 text-sm">
                We accept all major credit cards, UPI, net banking, and digital wallets for Indian customers.
              </p>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-2">Is my data secure?</h4>
              <p className="text-gray-300 text-sm">
                Absolutely. We use bank-grade encryption and comply with all data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;