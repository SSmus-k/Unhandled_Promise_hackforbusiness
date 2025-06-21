import React from 'react';

export default function BusinessProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 border-b">
          <img
            src="/Images/KUSOM.png"
            alt="Business Logo"
            className="w-32 h-32 rounded-xl object-cover border"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">KUSOM Industries</h2>
            <p className="text-sm text-gray-600">Producing Enterprenuers • Dhulikhel, Nepal</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Top Rated</span>
              <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">20+ Projects</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Sustainable</span>
            </div>
          </div>        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
            <p>Email: <a className="text-green-600" href="mailto:example@gmail.com">example@gmail.com</a></p>
            <p>Phone: <span className="text-gray-700">(415) 0123-456-789</span></p>
            <p>Website: <a className="text-green-600" href="#">www.example.com</a></p>
            <div className="flex gap-4 mt-2">
              <i className="fab fa-facebook text-gray-500"></i>
              <i className="fab fa-instagram text-gray-500"></i>
              <i className="fab fa-linkedin text-gray-500"></i>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-xl font-bold">99%</p>
                <p className="text-sm text-gray-600">Sustainability</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-xl font-bold">0.1%</p>
                <p className="text-sm text-gray-600">Waste Production</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <div className="rating">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
                    </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <h3 className="text-lg font-semibold mb-4">Yearly Report</h3>
          <ul className="space-y-3">
            <li className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">2024</p>
              <p className="font-medium">Completely Green Indeustry</p>
              <p className="text-sm text-gray-600">Minimal waste production</p>
            </li>
            <li className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">2023</p>
              <p className="font-medium">Almost Ideal </p>
              <p className="text-sm text-gray-600">80% sustainable</p>
            </li>
            <li className="border rounded-xl p-4">
              <p className="text-sm text-gray-500">2022</p>
              <p className="font-medium">Red zone</p>
              <p className="text-sm text-gray-600">Too much extra waste</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
