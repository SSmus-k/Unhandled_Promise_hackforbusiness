// File: MonthlyWasteChart.jsx

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', waste: 50 },
  { month: 'Feb', waste: 100 },
  { month: 'Mar', waste: 50 },
  { month: 'Apr', waste: 160 },
  { month: 'May', waste: 110 },
  { month: 'Jun', waste: 80 },
];

export default function Chart1() {
  return (
    <div className="w-full h-[300px] bg-white rounded-xl shadow-md p-6 mb-12">
      <h2 className="text-xl font-bold text-green-700 mb-2">Monthly Waste Production Trend</h2>
      <p className="text-sm text-gray-500 mb-4">Total waste generated each month (in kg)</p>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
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
  );
}
