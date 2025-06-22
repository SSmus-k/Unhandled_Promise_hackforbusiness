import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const daysLeft = 12; // Replace with real data if needed
  const totalDays = 30;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - daysLeft / totalDays);

  const navigate = useNavigate();

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-10 mt-20">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-green-700">🌱 Your Subscription</h2>
          {daysLeft > 0 ? (
            <p className="text-lg text-gray-600">
              You have <span className="text-green-600 font-semibold">{daysLeft} days</span> remaining.
            </p>
          ) : (
            <p className="text-lg text-red-500 font-medium">Your subscription has expired.</p>
          )}
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full bg-green-100 flex items-center justify-center shadow-inner">
            <div className="absolute w-40 h-40 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-700">{daysLeft}d</p>
                <p className="text-xs text-gray-500">remaining</p>
              </div>
            </div>
            <svg className="absolute top-0 left-0 w-full h-full animate-[spin_2s_linear_infinite]">
              <circle
                className="text-green-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="96"
                cy="96"
              />
              <circle
                className="text-green-500"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="96"
                cy="96"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 96 96)"
              />
            </svg>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">
              {daysLeft > 0 ? 'Want more insights?' : 'Subscribe again to unlock all features!'}
            </h3>
            <p className="text-sm text-gray-500">
              Extend your journey with HariyoNetra and empower your business with premium tools.
            </p>
          </div>
          <div className="space-x-3 flex">
            <button
              onClick={() => navigate('/subpage')}
              className="border border-green-600 text-green-700 hover:bg-green-100 px-6 py-2 rounded-full font-semibold transition"
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Why Subscribe */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-green-700">🌟 Why Go Premium?</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Access real-time bin tracking and usage analytics.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Monthly sustainability reports tailored for your business.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Participate in eco-leaderboards and earn recognition.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Early access to new features and green tools.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
