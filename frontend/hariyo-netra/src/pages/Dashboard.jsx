import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
   <div className="flex min-h-screen bg-[radial-gradient(circle_at_center,_#bbf7d0,_#ecfdf5)] font-sans">

      {/* Sidebar */}
<aside className="w-64 bg-transparent border-r-2 border-black p-6">
        
        <h1 className="text-2xl font-bold mb-6 text-green">HariyoNetra</h1>
        <nav className="space-y-4">
          {['Dashboard', 'Profile', 'Insights', 'Bin Tracking', 'Subscription', 'Leaderboard', 'Settings'].map(item => (
            <Link to={`/${item}`} key={item} className="block text-gray-700 hover:text-purple-600">
              {item}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-pink-500 text-white p-4 rounded-xl shadow">
            <h3 className="text-sm">Total Waste</h3>
            <p className="text-2xl font-bold">2 tons</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
            <h3 className="text-sm">Reusable Waste</h3>
            <p className="text-2xl font-bold">0.5 tons</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
            <h3 className="text-sm">Waste production rate</h3>
            <p className="text-2xl font-bold">60%</p>
          </div>
          <div className="bg-orange-400 text-white p-4 rounded-xl shadow">
            <h3 className="text-sm">SOMETHING</h3>
            <p className="text-2xl font-bold">SOMETHING</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-xl p-4 shadow h-64 flex items-center justify-center text-gray-400">
             <img
              src="/Images/linechartexample.jpg"
              alt="Favicon"
              className="max-h-60 max-w-400 object-contain mb-4"
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow h-64 flex items-center justify-center text-gray-400">
            <img
              src="/Images/piechartexample.png"
              alt="Favicon"
              className="max-h-100 max-w-100 object-contain mb-4 mt-10"
            />
          </div>
        </div>
        {/* Info Boxes Below Charts */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {/* Subscription Info Box */}
  <div className="bg-white rounded-xl p-4 shadow h-80 flex flex-col justify-center items-center">
    <h1 className="text-3xl font-serif font-semibold">Subscription status: PRO ⭐</h1>
    <br/>
    <img
              src="/Images/daysremainingexample.svg"
              alt="Favicon"
              className="max-h-30 max-w-30 object-contain mb-4"
            />
    <p className="text-3xl font-bold text-green-600">Days Remaining</p>
  </div>

  {/* Bin Tracking Info Box */}
  <div className="bg-white rounded-xl p-4 shadow h-80 flex flex-col justify-center items-center">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">Bin Tracking</h3>
    <p className="text-sm text-gray-600">3 Bins approaching full capacity</p>
  </div>
</div>

        </main>
        </div>
  );
}
