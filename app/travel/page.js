'use client'; // This tells Next.js this is a browser-side component

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS directly

// We load the Map component dynamically so it doesn't run on the server
const TravelMap = dynamic(() => import('@/components/TravelMap'), { 
  ssr: false,
  loading: () => <div style={{ height: '500px', background: '#eee' }}>Loading Map...</div>
});

export default function TravelPage() {
  return (
    <main>
      {/* Header Section */}
      <div className="page-header">
        <div className="container text-center">
          <h1><i className="fas fa-globe-americas"></i> Travel Adventures</h1>
          <p>Exploring the world, one country at a time</p>
        </div>
      </div>

      {/* Map Section */}
      <section className="map-section py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">My Travel Map</h2>
            <p>Countries I've visited are marked on the map</p>
          </div>
          
          {/* The actual Map Component */}
          <div className="map-wrapper shadow-lg rounded-4 overflow-hidden">
             <TravelMap />
          </div>
        </div>
      </section>
    </main>
  );
}