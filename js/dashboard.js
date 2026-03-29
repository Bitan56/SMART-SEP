/**
 * WAYMAKERS Dashboard Logic
 * Handles data fetching, map updates, and chart visualizations.
 */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFpwQsHeIK-y7qaP07qpte_DSX2YC8PXR7FmmCKntpannXbq4qbOorDgpeK4FZf8jn/exec";
const POLL_INTERVAL = 10000; // 10 seconds as requested

let map, marker;
let wasteChart, methaneChart;
let allData = [];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    initCharts();
    fetchData();
    setInterval(fetchData, POLL_INTERVAL);
});

// Initialize Leaflet Map
function initMap() {
    // Default center (Kolkata as per React code)
    const defaultLat = 22.5726;
    const defaultLng = 88.3639;
    
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([defaultLat, defaultLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        className: 'map-tiles'
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    marker = L.marker([defaultLat, defaultLng], { icon: customIcon }).addTo(map);
    marker.bindPopup("<b style='color:#22c55e'>WAYMAKERS VEHICLE</b><br>Status: Active").openPopup();
}

// Initialize Chart.js
function initCharts() {
    const ctx1 = document.getElementById('wasteChart').getContext('2d');
    wasteChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Bio-Waste',
                    data: [],
                    backgroundColor: '#22c55e',
                    borderRadius: 8,
                    barThickness: 12
                },
                {
                    label: 'Non-Bio',
                    data: [],
                    backgroundColor: '#3b82f6',
                    borderRadius: 8,
                    barThickness: 12
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
                }
            }
        }
    });

    const ctx2 = document.getElementById('methaneChart').getContext('2d');
    methaneChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Methane (PPM)',
                    data: [],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 0
                },
                {
                    label: 'Temp (°C)',
                    data: [],
                    borderColor: '#f59e0b',
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
                }
            }
        }
    });
}

// Fetch Data from Google Sheets
async function fetchData() {
    try {
        const response = await fetch(SCRIPT_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            allData = data;
            updateDashboard(data[data.length - 1]);
            updateCharts(data);
            hideLoader();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update UI Elements
function updateDashboard(latest) {
    // Update Values
    const bio = latest.bio || 0;
    const nonbio = latest.nonbio || 0;
    const temp = latest.temp || 0;
    const humid = latest.humid || 0;
    const methane = latest.methane || 0;

    document.getElementById('val-bio').innerText = bio;
    document.getElementById('val-nonbio').innerText = nonbio;
    document.getElementById('val-temp').innerText = temp;
    document.getElementById('val-humid').innerText = humid;
    document.getElementById('val-methane').innerText = methane;

    // Update Progress Bars
    document.getElementById('bar-bio').style.width = `${bio}%`;
    document.getElementById('bar-nonbio').style.width = `${nonbio}%`;
    document.getElementById('bar-temp').style.width = `${Math.min((temp/50)*100, 100)}%`;
    document.getElementById('bar-humid').style.width = `${humid}%`;
    document.getElementById('bar-methane').style.width = `${Math.min((methane/1000)*100, 100)}%`;

    // Update Timestamp
    document.getElementById('last-updated').innerText = new Date().toLocaleTimeString();

    // Update System Health
    // OPTIMAL when temp=25, humid=50, bio=50, nonbio=50, methane=0
    const isOptimal = (temp === 25 && humid === 50 && bio === 50 && nonbio === 50 && methane === 0);
    const healthText = document.getElementById('system-health-text');
    const healthIconContainer = document.getElementById('system-health-icon-container');
    
    if (healthText && healthIconContainer) {
        if (isOptimal) {
            healthText.innerText = 'OPTIMAL';
            healthText.className = 'text-[#22c55e] font-bold';
            healthIconContainer.className = 'w-10 h-10 bg-[#22c55e]/10 rounded-xl flex items-center justify-center text-[#22c55e]';
        } else {
            healthText.innerText = 'OPTIMAL';
            healthText.className = 'text-[#22c55e] font-bold';
            healthIconContainer.className = 'w-10 h-10 bg-[#ef4444]/10 rounded-xl flex items-center justify-center text-[#ef4444]';
        }
    }

    // Trigger Red Blinking on Data Update
    const statusDot = document.querySelector('.animate-ping');
    if (statusDot) {
        statusDot.classList.remove('bg-[#22c55e]');
        statusDot.classList.add('bg-[#ef4444]');
        // Keep it red for 2 seconds then back to green (optional, but user said "at that particular time")
        setTimeout(() => {
            statusDot.classList.remove('bg-[#ef4444]');
            statusDot.classList.add('bg-[#22c55e]');
        }, 2000);
    }

    // Update Map
    if (latest.lat && latest.lng && latest.lat !== 0 && latest.lng !== 0) {
        const pos = [latest.lat, latest.lng];
        marker.setLatLng(pos);
        map.panTo(pos);
    }
}

// Update Charts with historical data (Last 1 hour / Last 60 entries)
function updateCharts(data) {
    // Get last 60 entries (assuming 10s interval, 60 entries = 10 mins, but we'll show what we have)
    const recentData = data.slice(-60);
    
    const labels = recentData.map(d => {
        const time = new Date(d.time);
        return isNaN(time.getTime()) ? '' : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    // Update Waste Chart
    wasteChart.data.labels = labels.filter((_, i) => i % 10 === 0); // Show every 10th label
    wasteChart.data.datasets[0].data = recentData.map(d => d.bio);
    wasteChart.data.datasets[1].data = recentData.map(d => d.nonbio);
    wasteChart.update('none');

    // Update Methane/Temp Chart
    methaneChart.data.labels = labels;
    methaneChart.data.datasets[0].data = recentData.map(d => d.methane);
    methaneChart.data.datasets[1].data = recentData.map(d => d.temp);
    methaneChart.update('none');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
}
