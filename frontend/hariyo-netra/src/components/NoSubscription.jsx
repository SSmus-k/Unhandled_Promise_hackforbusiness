import React from 'react';

export default function NoSubscription() {
  return (
    <div className=" flex-1  bg-gradient-to-br from-white to-[#e6f8e6] p-8 font-sans text-gray-800">
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
      </div>
    </div>
  );
}
