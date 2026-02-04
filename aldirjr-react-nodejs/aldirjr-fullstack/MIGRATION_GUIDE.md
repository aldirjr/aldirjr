# 🚀 Migration Guide: Static HTML → React + Node.js

## 📋 Overview

This guide shows you how to migrate your existing static website to a full-stack React + Node.js application.

## 🏗️ New Architecture

```
OLD (Static):                    NEW (Full-Stack):
═══════════════                  ══════════════════════════════
index.html                       client/src/pages/Home.jsx
professional.html         →      client/src/pages/Professional.jsx
travel.html                      client/src/pages/Travel.jsx
petsitting.html                  client/src/pages/PetSitting.jsx
personal.html                    client/src/pages/Personal.jsx

js/calendar.js           →      client/src/components/Calendar.jsx
js/travel-map.js         →      client/src/components/TravelMap.jsx
js/i18n.js               →      client/src/utils/i18n.js

css/main.css             →      client/src/styles/main.css
css/professional.css     →      client/src/styles/professional.css

api/ (Vercel functions)  →      server/src/ (Express API)
```

## 🔄 Step-by-Step Migration

### Step 1: Set Up New Project Structure

```bash
# Clone the new structure
git clone https://github.com/aldirjr/aldirjr.git
cd aldirjr

# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../client
npm install
```

### Step 2: Migrate HTML → React Components

**OLD (index.html):**
```html
<div class="hero">
  <h1>Welcome to My World</h1>
  <p>Developer • Traveler</p>
</div>
```

**NEW (client/src/pages/Home.jsx):**
```jsx
import React from 'react';
import '../styles/home.css';

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to My World</h1>
      <p>Developer • Traveler</p>
    </div>
  );
}

export default Home;
```

### Step 3: Migrate CSS

**Move your CSS files:**
```bash
# Copy from old project
cp old-project/public/css/*.css client/src/styles/

# Import in components
import './styles/main.css';
```

**Update class references:**
- HTML `class="hero"` → React `className="hero"`
- All CSS stays the same!

### Step 4: Migrate JavaScript → React Components

**OLD (js/calendar.js):**
```javascript
class PetCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    // ...
  }
}
```

**NEW (client/src/components/Calendar.jsx):**
```jsx
import React, { useState, useEffect } from 'react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    // Load availability from API
    fetchAvailability();
  }, [currentDate]);

  return (
    <div className="calendar-widget">
      {/* Calendar JSX */}
    </div>
  );
}

export default Calendar;
```

### Step 5: Migrate API Routes

**OLD (api/auth/login.js - Vercel function):**
```javascript
export default async function handler(req, res) {
  // Vercel serverless function
}
```

**NEW (server/src/routes/auth.routes.js):**
```javascript
import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);

export default router;
```

**NEW (server/src/controllers/auth.controller.js):**
```javascript
export const login = async (req, res) => {
  try {
    // Authentication logic
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Step 6: Update Environment Variables

**OLD (.env):**
```env
MONGODB_URI=...
JWT_SECRET=...
```

**NEW - Split into two:**

**server/.env:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**client/.env:**
```env
VITE_API_URL=http://localhost:5000
VITE_RECAPTCHA_SITE_KEY=your-key
```

## 🎯 Key Differences

### 1. Routing

**OLD:**
```html
<a href="professional.html">Professional</a>
```

**NEW:**
```jsx
import { Link } from 'react-router-dom';

<Link to="/professional">Professional</Link>
```

### 2. State Management

**OLD:**
```javascript
let availability = {};
```

**NEW:**
```jsx
const [availability, setAvailability] = useState({});
```

### 3. API Calls

**OLD:**
```javascript
const response = await fetch('/api/travel/posts');
```

**NEW:**
```javascript
import axios from 'axios';

const response = await axios.get('/api/travel/posts');
```

### 4. Multilingual

**OLD (i18n.js):**
```javascript
class I18n {
  constructor() {
    this.translations = {};
  }
}
```

**NEW (react-i18next):**
```jsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation();
  return <h1>{t('welcome')}</h1>;
}
```

## 📦 Component Examples

### Navbar Component

```jsx
// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Aldir's <span>World</span>
        </Link>
        
        <div className="navbar-nav">
          <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/">Home</Link>
          <Link className={`nav-link ${location.pathname === '/professional' ? 'active' : ''}`} 
                to="/professional">Professional</Link>
          <Link className={`nav-link ${location.pathname === '/travel' ? 'active' : ''}`} 
                to="/travel">Travel</Link>
          <Link className={`nav-link ${location.pathname === '/personal' ? 'active' : ''}`} 
                to="/personal">Personal</Link>
          <Link className={`nav-link ${location.pathname === '/petsitting' ? 'active' : ''}`} 
                to="/petsitting">Pet Sitting</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

### API Service

```javascript
// client/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const travelService = {
  getPosts: () => api.get('/api/travel/posts'),
  getPost: (slug) => api.get(`/api/travel/posts/${slug}`),
  createPost: (data) => api.post('/api/travel/posts', data),
  updatePost: (id, data) => api.put(`/api/travel/posts/${id}`, data),
  deletePost: (id) => api.delete(`/api/travel/posts/${id}`)
};

export default api;
```

## 🚀 Development Workflow

### Starting Dev Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Building for Production

**Backend:**
```bash
cd server
# No build needed - deploy src/ folder
```

**Frontend:**
```bash
cd client
npm run build
# Creates dist/ folder
```

## 🌐 Deployment

### Option 1: Separate Deployment (Recommended)

**Frontend → Vercel:**
```bash
cd client
vercel --prod
```

**Backend → Railway:**
```bash
cd server
railway up
```

### Option 2: Monorepo (Render)

Deploy both from one repo:
- Frontend: Build command `cd client && npm run build`
- Backend: Start command `cd server && npm start`

## ✅ Migration Checklist

### Backend
- [ ] Set up Express server
- [ ] Create MongoDB models
- [ ] Migrate API routes from Vercel functions
- [ ] Add authentication middleware
- [ ] Test all endpoints with Postman
- [ ] Configure CORS
- [ ] Add environment variables

### Frontend
- [ ] Convert HTML pages to React components
- [ ] Move CSS to styles folder
- [ ] Set up React Router
- [ ] Create API service layer
- [ ] Implement auth context
- [ ] Convert vanilla JS to React hooks
- [ ] Test all pages
- [ ] Add loading states
- [ ] Add error handling

### Testing
- [ ] Test backend API endpoints
- [ ] Test frontend components
- [ ] Test authentication flow
- [ ] Test database operations
- [ ] Test file uploads (CV, images)
- [ ] Test responsive design
- [ ] Test in different browsers

### Deployment
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Configure environment variables
- [ ] Test production build
- [ ] Set up custom domain
- [ ] Configure SSL

## 🆘 Common Issues

### Issue: CORS errors
**Solution:** Add client URL to server CORS config
```javascript
cors({
  origin: process.env.CLIENT_URL,
  credentials: true
})
```

### Issue: API calls fail in production
**Solution:** Update API_URL in client/.env.production
```env
VITE_API_URL=https://your-backend.com
```

### Issue: Routes don't work after refresh
**Solution:** Configure Vercel for SPA routing

Create `client/vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Vite Guide](https://vitejs.dev/)

---

**Your existing HTML/CSS/JS will work in React with minimal changes!** 🎉
