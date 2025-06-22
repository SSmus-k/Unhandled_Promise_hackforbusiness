import React from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const bins = [
  { id: 1, lat: 27.7138, lng: 85.3157, status: 'full' },
  { id: 2, lat: 27.7145, lng: 85.3175, status: 'warning' },
  { id: 3, lat: 27.7129, lng: 85.3163, status: 'empty' },
];

const statusColors = {
  full: '#ef4444',     // Tailwind Red 500
  warning: '#f97316',  // Tailwind Orange 500
  empty: '#22c55e',    // Tailwind Green 500
};

const statusLabels = {
  full: 'Full',
  warning: 'Almost Full',
  empty: 'Empty',
};

export default function Bin() {
  // Count bins by status
  const statusCount = bins.reduce(
    (acc, bin) => {
      acc[bin.status] = (acc[bin.status] || 0) + 1;
      return acc;
    },
    { full: 0, warning: 0, empty: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold text-green-900 text-center mb-2 drop-shadow-md">
            🗺️ Bin Tracking Dashboard
          </h1>
          <p className="text-center text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto">
            Monitor your waste bins live and optimize collection routes by knowing the fill status of each bin.
          </p>
        </header>

        {/* Summary Stats */}
        <section className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {['full', 'warning', 'empty'].map((status) => (
            <div
              key={status}
              className="bg-white rounded-2xl shadow-lg p-6 border-t-8"
              style={{ borderTopColor: statusColors[status] }}
            >
              <h3 className="text-3xl font-bold text-gray-900">{statusCount[status]}</h3>
              <p
                className="text-lg font-semibold"
                style={{ color: statusColors[status] }}
              >
                {statusLabels[status]} Bins
              </p>
            </div>
          ))}
        </section>

        {/* Map Card */}
        <section className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200 mb-12">
          <MapContainer
            center={[27.7138, 85.3157]}
            zoom={16}
            scrollWheelZoom={true}
            className="h-[550px] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {bins.map((bin) => (
              <CircleMarker
                key={bin.id}
                center={[bin.lat, bin.lng]}
                radius={16}
                pathOptions={{ color: statusColors[bin.status], fillOpacity: 0.9 }}
              >
                <Popup>
                  <div className="text-center px-3">
                    <strong className="text-green-800 text-lg mb-1 block">Bin #{bin.id}</strong>
                    <span
                      className="font-semibold px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: statusColors[bin.status] }}
                    >
                      {statusLabels[bin.status]}
                    </span>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </section>

       
      </div>
    </div>
  );
}
