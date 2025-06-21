import React from 'react'

export default function About() {
    return (
      <section className="bg-white text-gray-800 px-6 md:px-20 py-16 space-y-20">

      {/* Header and Intro */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">About Us</h2>
        <p className="text-lg leading-relaxed">
          HariyoNetra is a smart waste management platform built to help businesses, municipalities, and recyclers optimize how waste is tracked, handled, and reduced. Our system transforms waste data into meaningful insights, promotes recycling, and encourages eco-friendly behavior through rewards and actionable suggestions.
        </p>
      </div>

      {/* Section 1 – Impact-Oriented */}
      <div className="bg-green-50 p-8 rounded-2xl shadow-sm max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">🌍 Impact-Oriented</h3>
        <p className="text-gray-700 text-base">
          From small companies to large facilities, HariyoNetra helps users make smarter decisions by visualizing bin status, tracking collection routes, and reducing overflow incidents. Our tools empower users to act before problems arise, leading to cleaner communities.
        </p>
      </div>

      {/* Section 2 – Data-Driven */}
      <div className="bg-green-100 p-8 rounded-2xl shadow-sm max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">📊 Data-Driven</h3>
        <p className="text-gray-700 text-base">
          We turn mock waste data into smart, meaningful suggestions. Our platform evaluates patterns in waste types — plastic, organic, paper — and provides businesses with personalized ways to improve their sustainability footprint and reduce unnecessary disposal.
        </p>
      </div>

      {/* Section 3 – Gamified Rewards */}
      <div className="bg-green-200 p-8 rounded-2xl shadow-sm max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">🏆 Gamified Rewards</h3>
        <p className="text-gray-700 text-base">
          Our built-in reward system encourages businesses to engage in responsible waste management. From leaderboard rankings to badges and redeemable eco-points, HariyoNetra creates a fun and motivating experience around sustainability.
        </p>
      </div>
    </section>
  )
}
