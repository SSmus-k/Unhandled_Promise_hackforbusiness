import React from 'react'


export default function About() {
    return (
 <section className="bg-white px-6 md:px-20 py-16 text-gray-800 space-y-20">

      {/* Intro */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-4">HariyoNetra <span className='text-gray-800'>for waste management.</span></h2>
        <p className="text-lg leading-relaxed">
          HariyoNetra is a smart waste management platform helping businesses and communities manage waste efficiently through bin tracking, route optimization, data-driven suggestions, and a gamified reward system.
        </p>
      </div>

            {/* Feature 1 – Monthly Waste Tracking */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">📅 Monthly Waste Production</h3>
          <p className="text-gray-700">
            We visualize how much waste is generated per month using interactive bar graphs. This helps businesses monitor trends and track their impact over time.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/Images/chart.gif" alt="Monthly Waste" className="rounded-xl" />
        </div>
      </div>

      {/* Feature 2 – Bin Tracking */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img src="/Images/location.gif" alt="Bin Tracking" className="rounded-xl shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">📍 Bin Tracking</h3>
          <p className="text-gray-700">
            Monitor the status and location of bins in real time. Ensure timely pickups, prevent overflows, and streamline operations with smart bin tracking.
          </p>
        </div>
      </div>

      {/* Feature 4 – Reward System */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img src="/Images/reward.png" alt="Reward System" className="rounded-xl shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">🏆 Reward System</h3>
          <p className="text-gray-700">
            Encourage eco-friendly actions through a leaderboard and reward system. Earn points for consistent waste reduction and responsible recycling.
          </p>
        </div>
      </div>

      {/* Feature 5 – Waste Suggestions */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">📊 Smart Waste Suggestions</h3>
          <p className="text-gray-700">
            Based on company waste trends, our system offers actionable suggestions like reducing certain waste types or connecting with recyclers.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/Images/suggestions.png" alt="Suggestions" className="rounded-xl shadow-md" />
        </div>
      </div>



    </section>

        
  )
}
