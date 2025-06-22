import React from 'react'
import { MapPin, Trash2, Clock } from 'lucide-react'
import {Link} from 'react-router-dom'

export default function BinCard({ binName, location, lastCollected, status, fillLevel }) {
  const statusColor = status === 'Full' ? 'text-red-600' : status === 'Half' ? 'text-yellow-500' : 'text-green-600'
  const fillBarWidth = `${Math.min(Math.max(fillLevel, 0), 100)}%`

  return (
    <div className=" bg-white shadow-lg rounded-xl p-6 flex flex-col justify-center gap-4 w-full  border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-green-600" />
          {binName}
        </h3>
        <span className={`text-sm font-semibold ${statusColor}`}>{status}</span>
      </div>

      {/* Location */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-gray-400" />
        {location}
      </div>

      {/* Last Collected */}
      <div className="text-sm text-gray-600 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-400" />
        Last Collected: <span className="font-medium text-gray-800">{lastCollected}</span>
      </div>

      {/* Fill Level */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-600 h-full transition-all"
          style={{ width: fillBarWidth }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-600">
        Fill Level: {fillLevel}%
      </div>
        <Link className='py-2 px-4 rounded-lg text-sm font-semibold text-white shadow text-center bg-green-600 hover:bg-green-700' to={'/bin'}>See More</Link>
    </div>
  )
}
