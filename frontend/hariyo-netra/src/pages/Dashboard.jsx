import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { useApp } from '../context/AppContext';
import { BinCard, StatusCard } from '../components';

export default function Dashboard() {
  const {user} = useApp()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const wasteGraph = [
    {month:"Jan",waste:user.waste_amount - 10},
    {month:"Feb",waste:user.waste_amount + 10},
    {month:"Mar",waste:user.waste_amount - 40},
    {month:"Apr",waste:user.waste_amount + 40},
    {month:"May",waste:user.waste_amount - 50},
  ]
  

  return (
    <div className="flex flex-1 min-h-screen bg-gradient-to-br from-white to-[#e6f8e6] font-sans">

     {/* <Sidebar/> */}

      {/* Main Dashboard */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold text-gray-800">Dashboard Overview</h2>
          <br />
          <h3 className='text-xl font-bold text-gray-800'>Welcome, {user.name}</h3>
        </div>

        {/* Top Cards */}
          <div className="bg-orange-400 text-white flex  justify-center p-4 gap-4 items-center rounded-xl ">
            <h3 className="text-lg font-semibold">Enter your company's report (.csv):</h3>
            <form className="text-md font-bold flex gap-4 ">
              <p><input type="file" accept=".csv" className="file-input" /></p>
              <button className="btn" type='submit'>Upload</button>
            </form>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="bg-pink-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Total Waste</h3>
            <p className="text-2xl font-bold">{user?.waste_amount} kg</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Reusable Waste</h3>
            <p className="text-2xl font-bold">0.5 tons</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Waste production rate</h3>
            <p className="text-2xl font-bold">60%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="flex justify-around gap-4">
            <div className="w-full h-[300px] bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-green-700 mb-2">Monthly Waste Production Trend</h2>
      <p className="text-sm text-gray-500 mb-4">Total waste generated each month (in kg)</p>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={wasteGraph}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="waste" stroke="#16a34a" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subscription Info Box */}
          <StatusCard/>
          {/* Bin Tracking Info Box */}
          <BinCard binName={"Bin 1"} location ={"Dhulikhel"} lastCollected={"2025-06-21"} status={"Full"} fillLevel={"90"}/>
        </div>

      </main>
    </div>
  );
}
