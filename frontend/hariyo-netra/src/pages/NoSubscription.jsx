import React from 'react';

export default function NoSubscription() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-10 text-center m-10">

        {/* Welcome Section */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-green-700">🌿 No Active Subscription</h2>
          <p className="text-gray-600 text-lg">Join the green movement and unlock exclusive sustainability tools.</p>
        </div>

        {/* Illustration / Visual Placeholder */}
        <div className="flex justify-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
  <h4 className="text-xl font-semibold mb-2">⚠️ You're missing out!</h4>
  <p className="text-sm">
    Without a subscription, you won’t be able to track your waste, receive reports, or climb the sustainability leaderboard.
  </p>
</div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">Ready to make an impact?</h3>
          <p className="text-sm text-gray-500">Start your eco-journey today with a HariyoNetra subscription.</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition">
            Get Yours Now
          </button>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-green-700">✨ What You’ll Get</h3>
          <ul className="grid md:grid-cols-2 gap-4 text-left">
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Real-time bin tracking and waste analytics.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Monthly eco-reports tailored to your company.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Compete on the green leaderboard.
            </li>
            <li className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
              ✅ Unlock green tools & early beta features.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
