import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[500px] bg-gray-200 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="Hero background"
          className="w-full h-full object-cover object-center absolute inset-0"
        />

        {/* Overlay (darker tint) */}
        <div className="absolute inset-0 bg-green-dark bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to RoboAdvisor
          </h1>
          <p className="max-w-2xl mb-6">
            An automated platform that provides personalized investment 
            strategies based on your financial goals and risk tolerance.
          </p>
          <Link
            to="/signup"
            className="bg-shade-5 hover:bg-shade-4 text-green-dark font-semibold px-6 py-3 rounded shadow"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Core Features
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-shade-2"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 15a4 4 0 00 4 4h10a4 4 0 004-4V7a4 4 0 
                    00-4-4H7a4 4 0 00-4 4v8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Investments</h3>
            <p className="text-gray-600">
              RoboAdvisor leverages smart algorithms to allocate your assets 
              in a diversified portfolio tailored to your goals.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-shade-2"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Market Data</h3>
            <p className="text-gray-600">
              Get real-time insights into market performance and track how 
              your portfolio responds to trends and breaking news.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded shadow p-6 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-shade-2"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9.75 17h4.5M9.75 7h4.5m-6.5 5h8.5M12 
                    3v1m0 16v1m8.364-14.364l-.707.707M4.343 
                    17.657l-.707.707"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Strategy</h3>
            <p className="text-gray-600">
              We tailor each portfolio to match your financial goals, 
              time horizon, and risk tolerance.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose RoboAdvisor Section */}
      <div className="bg-shade-9 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose RoboAdvisor?</h2>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            We are committed to providing a seamless investment experience 
            combining cutting-edge technology with expert guidance. Whether you 
            are a seasoned investor or just starting, our platform adapts to your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Low Fees
              </h3>
              <p className="text-gray-700">
                Traditional financial advisors can be expensive. RoboAdvisor 
                keeps costs low with automated systems, passing the savings 
                on to you.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Intelligent Algorithms
              </h3>
              <p className="text-gray-700">
                Our platform constantly monitors market conditions and adjusts 
                portfolios, helping you stay on track even during volatile 
                market cycles.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Transparent Reporting
              </h3>
              <p className="text-gray-700">
                Access detailed performance metrics and real-time tracking, 
                so you always know how your investments are doing.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Expert Support
              </h3>
              <p className="text-gray-700">
                Need guidance beyond automation? Our support team and 
                optional financial advisors are here to help you make 
                informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section (Optional) */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-700 italic">
              “RoboAdvisor simplified my investing process and saved me hours 
              every month. I love how the platform rebalances automatically!”
            </p>
            <p className="mt-4 font-semibold">— Maria W., Freelancer</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-700 italic">
              “As a beginner, I was intimidated by the stock market. 
              RoboAdvisor took away the fear and helped me start small.”
            </p>
            <p className="mt-4 font-semibold">— John D., Student</p>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded shadow">
            <p className="text-gray-700 italic">
              “It’s amazing to see real-time data and how the algorithm 
              adapts my portfolio when the market shifts.”
            </p>
            <p className="mt-4 font-semibold">— Sarah P., Entrepreneur</p>
          </div>
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="bg-green-dark text-white text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Invest Smarter?</h2>
        <p className="mb-6">
          Sign up today or learn more about how RoboAdvisor can help you 
          achieve your financial goals.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-shade-5 text-green-dark px-6 py-3 rounded font-semibold 
                     hover:bg-shade-4"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
