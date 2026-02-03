// public/js/travel-map.js

// Initialize map with better settings
const map = L.map('map', {
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true,
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 1.0
}).setView([0, 20], 2);

// Add tile layer with better styling
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    noWrap: true
}).addTo(map);

// Countries visited with comprehensive data
const visitedCountries = {
    // Born and lived
    'Brazil': { 
        coords: [-14.2350, -51.9253], 
        flag: '🇧🇷',
        color: '#90EE90', // Light green
        year: '1988',
        note: 'Born here',
        cities: ['São Paulo', 'Rio de Janeiro']
    },
    'Australia': { 
        coords: [-25.2744, 133.7751], 
        flag: '🇦🇺',
        color: '#FFFFE0', // Light yellow
        year: '2017',
        note: 'Currently living',
        cities: ['Melbourne', 'Sydney']
    },
    
    // Americas
    'USA': { 
        coords: [37.0902, -95.7129], 
        flag: '🇺🇸',
        color: '#D3D3D3',
        year: '2022',
        cities: ['New York', 'Los Angeles']
    },
    'Canada': { 
        coords: [56.1304, -106.3468], 
        flag: '🇨🇦',
        color: '#D3D3D3',
        year: '2023',
        cities: ['Toronto', 'Vancouver']
    },
    'Chile': { 
        coords: [-35.6751, -71.5430], 
        flag: '🇨🇱',
        color: '#D3D3D3',
        year: '2019',
        cities: ['Santiago']
    },
    'Argentina': { 
        coords: [-38.4161, -63.6167], 
        flag: '🇦🇷',
        color: '#D3D3D3',
        year: '2019',
        cities: ['Buenos Aires']
    },
    'Uruguay': { 
        coords: [-32.5228, -55.7658], 
        flag: '🇺🇾',
        color: '#D3D3D3',
        year: '2018',
        cities: ['Montevideo']
    },
    'Paraguay': { 
        coords: [-23.4425, -58.4438], 
        flag: '🇵🇾',
        color: '#D3D3D3',
        year: '2020',
        cities: ['Asunción']
    },
    
    // Europe
    'Turkey': { 
        coords: [38.9637, 35.2433], 
        flag: '🇹🇷',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Istanbul']
    },
    'Portugal': { 
        coords: [39.3999, -8.2245], 
        flag: '🇵🇹',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Lisbon', 'Porto']
    },
    'France': { 
        coords: [46.2276, 2.2137], 
        flag: '🇫🇷',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Paris', 'Nice']
    },
    'Netherlands': { 
        coords: [52.1326, 5.2913], 
        flag: '🇳🇱',
        color: '#D3D3D3',
        year: '2023',
        cities: ['Amsterdam']
    },
    'Belgium': { 
        coords: [50.5039, 4.4699], 
        flag: '🇧🇪',
        color: '#D3D3D3',
        year: '2023',
        cities: ['Brussels']
    },
    'Luxembourg': { 
        coords: [49.8153, 6.1296], 
        flag: '🇱🇺',
        color: '#D3D3D3',
        year: '2023',
        cities: ['Luxembourg City']
    },
    'Italy': { 
        coords: [41.8719, 12.5674], 
        flag: '🇮🇹',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Rome', 'Venice']
    },
    'Switzerland': { 
        coords: [46.8182, 8.2275], 
        flag: '🇨🇭',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Zurich']
    },
    'Monaco': { 
        coords: [43.7384, 7.4246], 
        flag: '🇲🇨',
        color: '#D3D3D3',
        year: '2024',
        cities: ['Monaco']
    },
    'England': { 
        coords: [52.3555, -1.1743], 
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        color: '#D3D3D3',
        year: '2023',
        cities: ['London', 'Manchester']
    },
    
    // Asia/Pacific
    'Philippines': { 
        coords: [12.8797, 121.7740], 
        flag: '🇵🇭',
        color: '#D3D3D3',
        year: '2022',
        cities: ['Manila']
    },
    'South Korea': { 
        coords: [35.9078, 127.7669], 
        flag: '🇰🇷',
        color: '#D3D3D3',
        year: '2023',
        cities: ['Seoul']
    },
    'Japan': { 
        coords: [36.2048, 138.2529], 
        flag: '🇯🇵',
        color: '#D3D3D3',
        year: '2025',
        cities: ['Tokyo', 'Kyoto']
    },
    'Hong Kong': { 
        coords: [22.3193, 114.1694], 
        flag: '🇭🇰',
        color: '#D3D3D3',
        year: '2022',
        cities: ['Hong Kong']
    },
    'Macau': { 
        coords: [22.1987, 113.5439], 
        flag: '🇲🇴',
        color: '#D3D3D3',
        year: '2022',
        cities: ['Macau']
    },
    'China': { 
        coords: [35.8617, 104.1954], 
        flag: '🇨🇳',
        color: '#D3D3D3',
        year: '2022',
        cities: ['Beijing', 'Shanghai']
    },
    'New Zealand': { 
        coords: [-40.9006, 174.8860], 
        flag: '🇳🇿',
        color: '#D3D3D3',
        year: '2025',
        cities: ['Auckland', 'Queenstown']
    },
    
    // Africa
    'South Africa': { 
        coords: [-30.5595, 22.9375], 
        flag: '🇿🇦',
        color: '#D3D3D3',
        year: '2021',
        cities: ['Cape Town']
    }
};

// GeoJSON boundaries for country fills (simplified - you'll need actual GeoJSON data)
// This is a placeholder - in production, use actual country boundary data
async function addCountryFills() {
    try {
        // Load GeoJSON for all countries
        const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
        const geojson = await response.json();
        
        L.geoJSON(geojson, {
            style: function(feature) {
                const countryName = feature.properties.ADMIN;
                const country = visitedCountries[countryName];
                
                if (country) {
                    return {
                        fillColor: country.color,
                        fillOpacity: 0.4,
                        color: country.color === '#90EE90' || country.color === '#FFFFE0' ? '#2c3e50' : '#999',
                        weight: 1
                    };
                }
                
                return {
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    color: '#ccc',
                    weight: 0.5
                };
            },
            onEachFeature: function(feature, layer) {
                const countryName = feature.properties.ADMIN;
                const country = visitedCountries[countryName];
                
                if (country) {
                    layer.on('click', function() {
                        layer.bindPopup(`
                            <div style="text-align: center;">
                                <div style="font-size: 3rem;">${country.flag}</div>
                                <h3 style="margin: 0.5rem 0;">${countryName}</h3>
                                <p><strong>Visited:</strong> ${country.year}</p>
                                ${country.note ? `<p><em>${country.note}</em></p>` : ''}
                                ${country.cities ? `<p><strong>Cities:</strong> ${country.cities.join(', ')}</p>` : ''}
                            </div>
                        `).openPopup();
                    });
                }
            }
        }).addTo(map);
        
    } catch (error) {
        console.error('Error loading country boundaries:', error);
        // Fallback to simple circle markers if GeoJSON fails
        addCircleMarkers();
    }
}

// Fallback: Add circle highlights for countries
function addCircleMarkers() {
    Object.entries(visitedCountries).forEach(([country, data]) => {
        L.circle(data.coords, {
            color: data.color,
            fillColor: data.color,
            fillOpacity: 0.3,
            radius: 300000,
            weight: 2
        }).addTo(map);
    });
}

// Add custom flag markers
Object.entries(visitedCountries).forEach(([country, data]) => {
    // Create custom div icon with flag emoji
    const flagIcon = L.divIcon({
        html: `<div style="font-size: 2rem; text-shadow: 0 0 3px white;">${data.flag}</div>`,
        className: 'flag-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
    
    const marker = L.marker(data.coords, { icon: flagIcon }).addTo(map);
    
    marker.bindPopup(`
        <div class="custom-popup" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">${data.flag}</div>
            <h3 style="margin: 0.5rem 0;">${country}</h3>
            <p><strong>Visited:</strong> ${data.year}</p>
            ${data.note ? `<p style="color: #27ae60; font-weight: 600;"><em>${data.note}</em></p>` : ''}
            ${data.cities ? `<p><strong>Cities:</strong><br>${data.cities.join(', ')}</p>` : ''}
        </div>
    `);
});

// Add country fills
addCountryFills();

// Update stats
document.getElementById('countries-count').textContent = Object.keys(visitedCountries).length;
document.getElementById('continents-count').textContent = '6'; // Count manually
document.getElementById('cities-count').textContent = Object.values(visitedCountries)
    .reduce((sum, country) => sum + (country.cities ? country.cities.length : 0), 0);

// Legend
const legend = document.createElement('div');
legend.style.cssText = `
    position: absolute;
    bottom: 30px;
    right: 10px;
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    font-size: 0.9rem;
`;
legend.innerHTML = `
    <h5 style="margin: 0 0 10px 0; font-size: 1rem;">Legend</h5>
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 20px; height: 20px; background: #90EE90; margin-right: 10px; border-radius: 3px;"></div>
        <span>Born here (Brazil)</span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 20px; height: 20px; background: #FFFFE0; margin-right: 10px; border-radius: 3px;"></div>
        <span>Living (Australia)</span>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background: #D3D3D3; margin-right: 10px; border-radius: 3px;"></div>
        <span>Visited</span>
    </div>
`;
document.getElementById('map').appendChild(legend);
