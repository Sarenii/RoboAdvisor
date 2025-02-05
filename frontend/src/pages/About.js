import React from 'react';

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero / Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-300 overflow-hidden">
        <img
          src="/images/about-hero.jpg"
          alt="About hero"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-green-dark bg-opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About RoboAdvisor
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction / Our Mission */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            RoboAdvisor is dedicated to making automated investing accessible 
            to everyone. By merging cutting-edge technology with financial 
            expertise, we simplify wealth-building for newcomers and seasoned 
            investors alike. Our mission is to empower you to achieve your 
            financial goals with minimal hassle and maximum transparency.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Automated Portfolio Management
              </h3>
              <p className="text-gray-700">
                Our algorithms handle portfolio creation, allocation, 
                and rebalancing, ensuring your investments remain 
                aligned with your goals.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Real-Time Data & Analytics
              </h3>
              <p className="text-gray-700">
                Stay updated on market trends, track performance, 
                and get insights into how your portfolio is adapting 
                to market conditions.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-dark">
                Personalized Strategies
              </h3>
              <p className="text-gray-700">
                We customize every portfolio based on your risk tolerance, 
                financial goals, and time horizon—no one-size-fits-all approach.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our diverse group of professionals includes financial analysts, 
            software engineers, product designers, and customer success experts. 
            With experience from leading tech giants and top-tier financial 
            institutions, we bring a wealth of knowledge to help you invest 
            smarter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Example Team Member */}
            <div className="bg-white rounded shadow p-4 text-center">
              <img
                src="/images/team-member-1.jpg"
                alt="Team member 1"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
              <h4 className="font-semibold">Alex Carter</h4>
              <p className="text-sm text-gray-600">Head of Engineering</p>
            </div>
            {/* Repeat for other members */}
            <div className="bg-white rounded shadow p-4 text-center">
              <img
                src="/images/team-member-2.jpg"
                alt="Team member 2"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
              <h4 className="font-semibold">Taylor Johnson</h4>
              <p className="text-sm text-gray-600">Lead Analyst</p>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <img
                src="/images/team-member-3.jpg"
                alt="Team member 3"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
              <h4 className="font-semibold">Jordan Lee</h4>
              <p className="text-sm text-gray-600">Product Manager</p>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <img
                src="/images/team-member-4.jpg"
                alt="Team member 4"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
              />
              <h4 className="font-semibold">Morgan Smith</h4>
              <p className="text-sm text-gray-600">Customer Success</p>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions or feedback? Reach us at{' '}
            <a href="mailto:support@roboadvisor.io" className="text-shade-2 underline">
              support@roboadvisor.io
            </a>. We’d love to hear from you.
          </p>
        </section>
      </div>
    </div>
  );
}
