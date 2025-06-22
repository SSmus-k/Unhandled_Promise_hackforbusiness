import React from 'react'
import { useApp } from '../context/AppContext'
import { BadgeCheck, AlertCircle, CalendarClock } from 'lucide-react'

export default function StatusCard() {
  const { user } = useApp()

  const plan = user?.plan || 'Basic'
  const isSubscribed = user?.isSubscribed
  const nextBilling = user?.nextBillingDate || 'N/A'
  const joined = user?.joined || '2025-06-01'

  const planColors = {
    Basic: 'bg-gray-100 text-gray-800',
    Pro: 'bg-yellow-100 text-yellow-800',
    Enterprise: 'bg-purple-100 text-purple-800',
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Your Subscription</h3>
          <p className="text-sm text-gray-500">Overview of your plan</p>
        </div>
        <div className="flex items-center space-x-1">
          {isSubscribed ? (
            <span className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <BadgeCheck className="w-4 h-4 mr-1" /> Active
            </span>
          ) : (
            <span className="flex items-center bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              <AlertCircle className="w-4 h-4 mr-1" /> Inactive
            </span>
          )}
        </div>
      </div>

      {/* Plan Info */}
      <div className={`rounded-lg px-4 py-3 text-sm font-medium w-fit ${planColors[plan] || planColors.Basic}`}>
        Plan: {plan}
      </div>

      {/* Details */}
      <div className="space-y-1 text-sm text-gray-600">
        <p><strong>Joined:</strong> {joined}</p>
        {isSubscribed && (
          <p className="flex items-center">
            <CalendarClock className="w-4 h-4 mr-1 text-green-600" />
            Next Billing: <span className="ml-1 font-medium">{nextBilling}</span>
          </p>
        )}
        {!isSubscribed && (
          <p className="text-red-600">Subscribe now to unlock features like analytics and bin tracking.</p>
        )}
      </div>

      {/* CTA */}
      <div className="pt-3">
        <button
          className={`w-full py-2 px-4 rounded-lg text-sm font-semibold text-white shadow ${
            isSubscribed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
          } transition`}
        >
          {isSubscribed ? 'Manage Subscription' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  )
}
