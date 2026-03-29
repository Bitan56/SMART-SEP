# WAYMAKERS | Smart Waste Management System

A professional, real-time IoT dashboard for monitoring waste collection, environmental sensors, and vehicle tracking. This is a complete standalone HTML/CSS/JavaScript implementation of the WAYMAKERS system.

## 📋 Project Structure

```
waymakers_full/
├── index.html                 # Home page
├── pages/
│   ├── how-it-works.html     # How It Works page
│   └── dashboard.html         # Live Dashboard page
├── css/
│   └── style.css              # Global styles
├── js/
│   ├── common.js              # Shared utilities
│   ├── how-it-works.js        # How It Works page logic
│   └── dashboard.js           # Dashboard logic
├── assets/                    # Images and resources
└── README.md                  # This file
```

## 🚀 Features

- **Multi-Page Website**: Home, How It Works, and Live Dashboard pages
- **Live Data Integration**: Fetches real-time data from Google Sheets API every 10 seconds
- **Interactive Leaflet Map**: Live GPS tracking with custom dark-themed tiles
- **Real-time Analytics**: Dynamic charts for waste collection trends and methane/temperature analysis using Chart.js
- **Responsive UI**: Modern, dark-themed interface built with Tailwind CSS
- **Professional Design**: Smooth animations and transitions throughout

## 📖 Pages

### 1. Home Page (index.html)
- Hero section with call-to-action buttons
- About section showcasing system features
- System architecture flow diagram
- Applications showcase
- Team member profiles

### 2. How It Works (pages/how-it-works.html)
- Context-specific implementation details
- 4-step process visualization
- Dynamic content based on URL parameters
- Call-to-action buttons

### 3. Live Dashboard (pages/dashboard.html)
- Real-time sensor data display
- 5 sensor cards: Bio-Waste, Non-Bio, Temperature, Humidity, Methane
- Interactive Leaflet.js map with GPS tracking
- Live waste collection trends chart
- Methane and temperature analysis chart
- Auto-updating every 10 seconds

## 🛠️ How to Run

1. **No build process required!** Simply open `index.html` in any modern web browser.
2. The dashboard will automatically fetch live data from the Google Sheets API.
3. All pages are fully functional and responsive.

## 📊 Data Source

The dashboard connects to the following Google Apps Script endpoint:
```
https://script.google.com/macros/s/AKfycbxFpwQsHeIK-y7qaP07qpte_DSX2YC8PXR7FmmCKntpannXbq4qbOorDgpeK4FZf8jn/exec
```

Expected data structure:
```json
{
  "date": "2026-03-12T18:30:00.000Z",
  "time": "1899-12-30T08:54:22.000Z",
  "temp": 24.8,
  "humid": 57,
  "methane": 0,
  "bio": 0,
  "nonbio": 25,
  "lat": 0,
  "lng": 0
}
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS
- **JavaScript (Vanilla)**: No frameworks required
- **Leaflet.js**: Interactive maps
- **Chart.js**: Data visualization
- **Lucide Icons**: Beautiful SVG icons

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 Update Frequency

- Dashboard data updates every **10 seconds**
- Charts display the last 60 data points
- Smooth animations and transitions throughout

## 📝 Notes

- All data fetching is done client-side
- No backend server required
- Fully responsive design for mobile and desktop
- Dark theme optimized for eye comfort
- GPS tracking requires valid latitude/longitude data

## 👥 Team

- Anubhab Kundu - Project Lead
- Sumit Pal - IoT & Hardware Engineer
- Arijita Paria - Web Developer
- Supriyo Paramanik - ML Engineer

## 📄 License

© 2026 WAYMAKERS Smart Waste Management System. All rights reserved.
