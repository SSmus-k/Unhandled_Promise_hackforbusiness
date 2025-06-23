import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Lightbulb, Recycle, Leaf, Users } from 'lucide-react';

import { useCsvData } from '../context/CsvContext';



export default function Insights() {
  const {csvData} = useCsvData()

// Total Waste
  const totalWaste = csvData.reduce((sum, row) => {
  return sum + Number(row["Total Waste (kg)"] || 0);
}, 0);

// Total Carbon Offset
  const totalCarbon = csvData.reduce((sum, row) => {
  return sum + Number(row["Carbon Offset (kg CO2)"] || 0);
}, 0);

// Data for Bar Graph
const categories = ['Plastic', 'Metal', 'Organic',"Glass","E-waste"]; 

const yearlyData = categories.map(category => {
  let total = 0;
  csvData.forEach(monthData => {
    total += Number(monthData[category]) || 0;
  });
  return {
    name: category,
    waste: total
  };
});

// Reusable Waste
const reusableCategories = ['Plastic', 'Metal']; // Define your reusable waste categories

const totalReusableWaste = csvData.reduce((sum, monthData) => {
  return sum + reusableCategories.reduce((catSum, cat) => {
    return catSum + (Number(monthData[cat]) || 0);
  }, 0);
}, 0);


// Recyclable Percentage
const recyclePercentage = Math.round((Number(totalReusableWaste)/Number(totalWaste)) * 100 )



  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] p-6 text-gray-800 font-sans">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 text-center">Insights</h1>
        <p className="text-gray-600 text-lg mt-2 text-center">
          Track, Analyze & Improve your waste practices.
        </p>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Total Waste Generated</h2>
          <p className="text-3xl font-bold">{totalWaste} kg</p>
          <span className="text-sm text-gray-500">Last 12 months</span>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Recycling Efficiency</h2>
          <p className="text-3xl font-bold">{recyclePercentage}%</p>
          <span className="text-sm text-gray-500">Up by 8% from last month</span>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Carbon Offset</h2>
          <p className="text-3xl font-bold">{totalCarbon} kg</p>
          <span className="text-sm text-gray-500">via sustainable disposal</span>
        </div>
      </section>

      {/* Chart */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Waste Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyData}>
            <XAxis dataKey="name" label={{ value: 'Waste Category', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Amount (kg)', angle: -90, position: 'insideLeft', offset: 10 }} />
            <Tooltip />
            <Bar dataKey="waste" fill="#34d399" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Suggestions */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-green-900 mb-8 text-center">Suggestions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Recycle className="text-green-700 w-6 h-6" />,
              title: 'Segregate at Source',
              text: 'Introduce labeled bins for plastics, organics, metals, and e-waste to maximize recycling efficiency.',
            },
            {
              icon: <Leaf className="text-green-700 w-6 h-6" />,
              title: 'Switch to Eco-Packaging',
              text: 'Replace plastic packaging with compostable or biodegradable materials to reduce landfill impact.',
            },
            {
              icon: <Users className="text-green-700 w-6 h-6" />,
              title: 'Engage Your Team',
              text: 'Launch monthly awareness drives and training sessions to involve employees in sustainable practices.',
            },
            {
              icon: <Lightbulb className="text-green-700 w-6 h-6" />,
              title: 'Partner with Recyclers',
              text: 'Collaborate with local recycling vendors for timely pickups and transparent disposal reports.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-4 hover:scale-[1.01] transition"
            >
              <div className="bg-green-100 p-3 rounded-full">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reusability Section */}
      <section className="mt-16 bg-white border-t border-green-200 pt-12 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-green-800 text-center mb-4">
            ♻️ Reusability Opportunities
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Don't just dispose—repurpose. Here’s how your waste can fuel circular economy initiatives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="text-5xl text-green-600 mb-4 text-center">🌱</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Organic → Compost</h3>
              <p className="text-gray-700 text-center">
                Your food and garden waste can help local farms or rooftop gardens grow healthy produce.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="text-5xl text-green-600 mb-4 text-center">🎨</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Plastic → Art & Furniture</h3>
              <p className="text-gray-700 text-center">
                Partner with local artists or studios to turn used plastic into furniture or décor pieces.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
              <div className="text-5xl text-green-600 mb-4 text-center">🏗️</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Metal → Industry</h3>
              <p className="text-gray-700 text-center">
                Scrap metal can be redirected to small manufacturers or workshops for reuse in tools & parts.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-green-200 via-green-100 to-green-200 p-8 rounded-2xl shadow-inner text-center">
            <h4 className="text-2xl font-bold text-green-900 mb-2">Looking to Connect?</h4>
            <p className="text-gray-700 mb-4">
              We’ll connect you with local reuse networks, artists, and composting initiatives.
            </p>
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition"
            >
              {showContacts ? 'Hide Contacts' : 'Get in Touch →'}
            </button>
          </div>

          {/* Contacts */}
          {showContacts && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm text-center">
                <h5 className="text-xl font-semibold text-green-800 mb-1">GreenGrow Nepal</h5>
                <p className="text-gray-600 mb-2 text-sm">Organic Compost Partner</p>
                <a href="mailto:greengrow@compost.org" className="text-green-700 font-medium hover:underline">
                  greengrow@compost.org
                </a>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm text-center">
                <h5 className="text-xl font-semibold text-green-800 mb-1">Plastic Revival Studio</h5>
                <p className="text-gray-600 mb-2 text-sm">Art & Furniture Upcycling</p>
                <a href="mailto:revival@studioart.com" className="text-green-700 font-medium hover:underline">
                  revival@studioart.com
                </a>
              </div>

              <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm text-center">
                <h5 className="text-xl font-semibold text-green-800 mb-1">Metal Makers Hub</h5>
                <p className="text-gray-600 mb-2 text-sm">Industrial Scrap Reuse</p>
                <a href="mailto:connect@metalmakers.com" className="text-green-700 font-medium hover:underline">
                  connect@metalmakers.com
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
