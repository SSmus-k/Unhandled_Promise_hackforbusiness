import React from 'react'
import { CheckCircle, Lock, BarChart4, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NoSubscription() {
  const navigate = useNavigate()

  const features = [
    { icon: <Lock className="text-green-600 w-5 h-5" />, label: 'Manual & Smart Waste Tracking' },
    { icon: <BarChart4 className="text-green-600 w-5 h-5" />, label: 'Analytics & Visual Reports' },
    { icon: <CheckCircle className="text-green-600 w-5 h-5" />, label: 'Reward System for Eco Practices' },
    { icon: <ShieldAlert className="text-green-600 w-5 h-5" />, label: 'Priority Support & Alerts' },
  ]

  return (
    <div className="flex-1 bg-gradient-to-br from-white to-[#e6f8e6] px-6 py-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 space-y-10 text-center">

        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-green-700">🌿 No Active Subscription</h2>
          <p className="text-gray-600 text-lg">
            Unlock powerful sustainability tools designed for your business growth.
          </p>
        </div>

        {/* Alert Box */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-sm mx-auto max-w-2xl">
          <h4 className="text-xl font-semibold mb-2">⚠️ You're missing out!</h4>
          <p className="text-sm">
            Without a subscription, you can’t track your waste, receive data insights, or get on the leaderboard.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="text-left max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 text-center">What you’ll unlock:</h3>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-center space-x-2 text-sm">
                {f.icon}
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe CTA */}
        <div className="pt-4">
          <button
            onClick={() => navigate('/subpage')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow transition"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
