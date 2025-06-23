import React from 'react';

export default function SuggestionCard({ suggestions }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow text-gray-800">
      <h2 className="text-xl font-semibold text-green-600 mb-4">💡 Improvement Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-500">No suggestions. Keep up the good work!</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {suggestions.map((tip, idx) => (
            <li key={idx} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
