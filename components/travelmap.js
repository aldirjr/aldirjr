'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icons in Next.js
import 'leaflet/dist/leaflet.css';

export default function TravelMap() {
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // 1. Fetch markers from your MongoDB API
    fetch('/api/travel')
      .then(res => res.json())
      .then(data => setVisitedCountries(data));

    // 2. Fetch GeoJSON for country boundaries (from your travel.js logic)
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  // Styling logic from your travel.js
  const geojsonStyle = (feature) => {
    const countryName = feature.properties.ADMIN;
    const visited = visitedCountries.find(c => c.name === countryName);
    return {
      fillColor: visited ? (visited.color || '#D3D3D3') : 'transparent',
      fillOpacity: visited ? 0.4 : 0,
      color: '#ccc',
      weight: 0.5
    };
  };

  return (
    <MapContainer 
      center={[0, 20]} 
      zoom={2} 
      style={{ height: '600px', width: '100%' }}
      minZoom={2}
      worldCopyJump={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Render Country Fills */}
      {geoData && <GeoJSON data={geoData} style={geojsonStyle} />}

      {/* Render Markers from MongoDB */}
      {visitedCountries.map((country, idx) => {
        const flagIcon = L.divIcon({
          html: `<div style="font-size: 2rem; text-shadow: 0 0 3px white;">${country.flag}</div>`,
          className: 'flag-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        return (
          <Marker key={idx} position={country.coords} icon={flagIcon}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem' }}>{country.flag}</div>
                <h3>{country.name}</h3>
                <p><strong>Visited:</strong> {country.year}</p>
                {country.note && <p><em>{country.note}</em></p>}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}