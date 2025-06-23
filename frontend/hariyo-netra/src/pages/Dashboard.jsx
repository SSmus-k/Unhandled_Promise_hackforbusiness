import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import { useApp } from '../context/AppContext';
import { BinCard, CsvUpload, StatusCard , WasteCategoryPieChart} from '../components';
import { useCsvData } from '../context/CsvContext';

export default function Dashboard() {
  const {user} = useApp()
  const {csvData} = useCsvData()

const categories = ['Plastic', 'Metal', 'Organic', 'Glass', 'E-waste'];

const monthlyCategoryData = csvData.map((row) => {
  const month = row.Month?.slice(0, 3); // Jan, Feb...
  const entry = { month };

  categories.forEach((cat) => {
    entry[cat] = Number(row[cat]) || 0;
  });

  return entry;
});



// Total Waste
  const totalWaste = csvData.reduce((sum, row) => {
  return sum + Number(row["Total Waste (kg)"] || 0);
}, 0);

// Reusable Waste
const reusableCategories = ['Plastic', 'Metal']; 

const totalReusableWaste = csvData.reduce((sum, monthData) => {
  return sum + reusableCategories.reduce((catSum, cat) => {
    return catSum + (Number(monthData[cat]) || 0);
  }, 0);
}, 0);

const recyclePercentage = (Number(totalReusableWaste)/Number(totalWaste)) * 100 


// Waste Percentage
const totalProducts = csvData.reduce((sum, row) => sum + Number(row["Total Products (units)"] || 0), 0);
const averageWastePercentage = totalProducts ? ((totalWaste / totalProducts) * 100).toFixed(2) : 0;


//  Data for Pie Chart

const categoryTotals = {};

csvData.forEach(row => {
  categories.forEach(category => {
    const amount = Number(row[category]) || 0;
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += amount;
  });
});

const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
  name,
  value,
}));



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
            <CsvUpload/>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="bg-pink-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Total Waste</h3>
            <p className="text-2xl font-bold">{totalWaste} kg</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Reusable Waste</h3>
            <p className="text-2xl font-bold">{totalReusableWaste} kg</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-xl shadow hover:scale-105 transition-all ease-in-out">
            <h3 className="text-md">Waste production rate</h3>
            <p className="text-2xl font-bold">{averageWastePercentage}%</p>
          </div>
        </div>

        {/* Charts */}
       <div className="bg-white rounded-xl p-4 shadow h-fit text-gray-800">
        <h3 className="text-xl text-green-600 font-semibold mb-2">Monthly Category-wise Waste Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
           <LineChart data={monthlyCategoryData}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'Waste (kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
            {categories.map((cat, index) => (
            <Line
             key={cat}
               type="monotone"
                dataKey={cat}
              stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'][index % 5]}
                strokeWidth={2}
              dot={false}
              />
                ))}
            </LineChart>
          </ResponsiveContainer>
</div>

          <div className="bg-white rounded-xl p-4 shadow h-fit flex flex-col items-center justify-center text-gray-400">
            <h3 className='text-xl text-green-600 font-semibold'>Waste Categories</h3>
            <WasteCategoryPieChart data={pieData}/>
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
