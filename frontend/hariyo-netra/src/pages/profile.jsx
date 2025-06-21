import React from 'react';

import { useApp } from '../context/AppContext';



export default function BusinessProfile() {
  const {user} = useApp()
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md p-8 space-y-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Reward Points Bar */}

          <img
            src="/Images/KUSOM.png"
            alt="Business Logo"
            className="w-32 h-32 object-cover rounded-2xl border border-green-300 shadow"
          />

          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold text-green-700">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Producing Enterprenuers • Dhulikhel, Nepal</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Top Rated</span>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">20+ Projects</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Sustainable</span>
            </div>
          </div>
          
        </div>

                        <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center justify-between border border-green-100">
                <div className="text-sm md:text-base font-medium text-gray-700">🎁 Reward Points</div>
                <div className="w-full mx-4 bg-green-100 h-4 rounded-full relative overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="text-sm md:text-base font-semibold text-green-700">350 pts</div>
                </div>
                <h3 className="text-center">Attain 350 points to get 1 week of free premium</h3>


        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-2">
            <h3 className="text-xl font-semibold mb-3">📞 Contact Info</h3>
            <p>Email: <a className="text-green-600 hover:underline" href="mailto:example@gmail.com">{user.email}</a></p>
            <p>Phone: <span className="text-gray-700">(415) 0123-456-789</span></p>
            <p>Website: <a className="text-green-600 hover:underline" href="#">www.example.com</a></p>
            <div className="flex gap-4 mt-2 text-xl text-gray-500">
              <i className="fab fa-facebook hover:text-blue-500"></i>
              <i className="fab fa-instagram hover:text-pink-500"></i>
              <i className="fab fa-linkedin hover:text-blue-700"></i>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">📊 Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">99%</p>
                <p className="text-sm text-gray-600">Sustainability</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">0.1%</p>
                <p className="text-sm text-gray-600">Waste Production</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Report */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4">🗓 Yearly Report</h3>
          <div className="space-y-3">
            <div className="border border-green-100 rounded-xl p-4 hover:bg-green-50 transition">
              <p className="text-sm text-gray-500">2024</p>
              <p className="font-medium">Completely Green Industry</p>
              <p className="text-sm text-gray-600">Minimal waste production</p>
            </div>
            <div className="border border-green-100 rounded-xl p-4 hover:bg-green-50 transition">
              <p className="text-sm text-gray-500">2023</p>
              <p className="font-medium">Almost Ideal</p>
              <p className="text-sm text-gray-600">80% sustainable</p>
            </div>
            <div className="border border-green-100 rounded-xl p-4 hover:bg-green-50 transition">
              <p className="text-sm text-gray-500">2022</p>
              <p className="font-medium">Red zone</p>
              <p className="text-sm text-gray-600">Too much extra waste</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
