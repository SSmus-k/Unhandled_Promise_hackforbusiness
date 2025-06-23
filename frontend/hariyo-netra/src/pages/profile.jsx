import React from 'react';

import { useApp } from '../context/AppContext';

import { useCsvData } from '../context/CsvContext';

export default function BusinessProfile() {

  const {user} = useApp()
  const {csvData} = useCsvData()

  const totalWaste = csvData?.reduce((sum, row) => {
    return sum + Number(row["Total Waste (kg)"] || 0);
  }, 0);

  const totalProducts = csvData?.reduce((sum, row) => 
    sum + Number(row["Total Products (units)"] || 0), 0
  );

  const averageWastePercentage = totalProducts 
    ? ((totalWaste / totalProducts) * 100).toFixed(2) 
    : 0;

  // Reusable Waste
  const reusableCategories = ['Plastic', 'Metal']; 
  const totalReusableWaste = csvData?.reduce((sum, monthData) => {
    return sum + reusableCategories.reduce((catSum, cat) => {
      return catSum + (Number(monthData[cat]) || 0);
    }, 0);
  }, 0);

  // Total Carbon Offset
  const totalCarbon = csvData?.reduce((sum, row) => {
    return sum + Number(row["Carbon Offset (kg CO2)"] || 0);
  }, 0);

  // Sustainable percentage
  // 1. Recycling Efficiency
  const recyclePercentage = totalWaste ? (totalReusableWaste / totalWaste) * 100 : 0;

  // 2. Carbon Offset Level
  const carbonOffsetPerProduct = totalProducts ? totalCarbon / totalProducts : 0;

  // 3. Waste per Product Ratio
  const wastePerProduct = totalProducts ? totalWaste / totalProducts : 0;

  // Condition for sustainability
  // Recycling efficiency > 60%, Waste per product < 0.3kg, Carbon offset > 0.02
  const isSustainable = recyclePercentage > 60 && wastePerProduct < 0.3 && carbonOffsetPerProduct > 0.02;

  // Safe Waste Efficiency
  const wasteEfficiency = wastePerProduct ? (1 - (wastePerProduct / 0.3)) * 100 : 0;
  const safeWasteEfficiency = Math.max(0, Math.min(wasteEfficiency, 100));

  // Final Sustainability Percentage
  const sustainabilityPercent = (
    recyclePercentage * 0.4 +
    carbonOffsetPerProduct * 0.3 +
    safeWasteEfficiency * 0.3
  ).toFixed(2);

  // For Ratings
  const starCount = Math.round(Number(sustainabilityPercent) / 20); 



  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-white/70 backdrop-blur-md p-8 space-y-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Reward Points Bar */}

          <img
            src="/Images/Donald.jpg"
            alt="Business Logo"
            className="w-32 h-32 object-cover rounded-2xl border border-green-300 shadow"
          />

          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold text-green-700">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Producing Cement • Dhulikhel • 1990 </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Top Rated</span>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">20+ Projects</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{isSustainable?"Sustainable":"Not Sustainable"}</span>
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
                <p className="text-2xl font-bold text-green-600">{Math.ceil(sustainabilityPercent)}%</p>
                <p className="text-sm text-gray-600">Sustainability</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">{Math.ceil(averageWastePercentage)}%</p>
                <p className="text-sm text-gray-600">Waste Production</p>
              </div>
              <div className="flex items-center justify-center">
  <div className="rating">
    {[...Array(5)].map((_, index) => (
      <input
        key={index}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${index < starCount ? 'bg-orange-400' : 'bg-gray-300'}`}
        defaultChecked={index === starCount - 1}
        readOnly
      />
    ))}
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
              <p className="text-sm text-gray-600">Excessive extra waste</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
