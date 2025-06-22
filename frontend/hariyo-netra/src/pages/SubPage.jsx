import React from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Great for small businesses just getting started.',
    features: [
      '2 Bin entries',
      'Manual waste tracking',
      'Basic dashboard',
      'Reward system',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19/month',
    description: 'Perfect for growing businesses needing more insights.',
    features: [
      '10 Bin entries',
      'Waste usage suggestions',
      'Analytics & export',
      'Recycling marketplace',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$49/month',
    description: 'Advanced tools for large organizations.',
    features: [
      'Unlimited bins',
      'Priority support',
      'AI-based predictions',
      'Custom alerts & reports',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function SubPage() {
  return (
    <div className="py-16 px-6 bg-transparent text-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Choose your plan</h2>
        <p className="text-gray-600">Flexible plans for every stage of your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-8 bg-white flex flex-col justify-between border-2 ${
              plan.highlight ? 'border-green-600 scale-105' : 'border-gray-200'
            } transition-all duration-300`}
          >
            {plan.highlight && (
              <div className="text-sm text-white bg-green-600 px-3 py-1 rounded-full w-fit mb-4">
                Most Popular
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-3xl font-bold my-2">{plan.price}</p>
              <p className="text-gray-500 mb-4">{plan.description}</p>

              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
