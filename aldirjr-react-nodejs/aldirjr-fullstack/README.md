# Aldir Jr - Full-Stack Portfolio Website

Professional portfolio website built with **React** (frontend) and **Node.js/Express** (backend) with **MongoDB** database.

## 🏗️ Project Structure

```
aldirjr/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (state management)
│   │   ├── services/      # API service functions
│   │   ├── styles/        # CSS/SCSS files
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, validation, etc.
│   │   ├── config/        # Configuration files
│   │   ├── utils/         # Helper functions
│   │   └── server.js      # Express app
│   ├── package.json
│   └── .env
│
├── shared/                 # Shared code (optional)
├── .gitignore
├── README.md
└── package.json            # Root package.json (optional)
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB (Atlas or local)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/aldirjr/aldirjr.git
cd aldirjr
```

**2. Install Backend Dependencies**
```bash
cd server
npm install
```

**3. Install Frontend Dependencies**
```bash
cd ../client
npm install
```

**4. Configure Environment Variables**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/aldirjr
JWT_SECRET=your-super-secret-jwt-key-32-characters-min
RECAPTCHA_SECRET=your-recaptcha-secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**5. Run Development Servers**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📦 Technologies

### Frontend
- **React 18** - UI library
- **Vite** - Build tool (faster than Create React App)
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Leaflet** - Interactive maps
- **i18next** - Internationalization

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin requests

## 🔧 Available Scripts

### Backend (server/)
```bash
npm run dev      # Start dev server with nodemon
npm start        # Start production server
npm test         # Run tests
```

### Frontend (client/)
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with reCAPTCHA
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Travel
- `GET /api/travel/posts` - Get all posts
- `GET /api/travel/posts/:slug` - Get single post
- `POST /api/travel/posts` - Create post (auth required)
- `PUT /api/travel/posts/:id` - Update post (auth required)
- `DELETE /api/travel/posts/:id` - Delete post (auth required)

### Pet Sitting
- `GET /api/petsitting/calendar` - Get availability
- `POST /api/petsitting/calendar` - Update availability (auth required)
- `POST /api/petsitting/bookings` - Create booking request
- `GET /api/petsitting/clients` - Get pet clients

### Portfolio
- `GET /api/portfolio/projects` - Get all projects
- `POST /api/portfolio/projects` - Add project (auth required)

### Resume
- `GET /api/resume` - Get resume data
- `PUT /api/resume` - Update resume (auth required)

## 🌍 Deployment

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Railway/Render/Heroku)

**Railway:**
```bash
cd server
railway login
railway init
railway up
```

**Render:**
1. Connect GitHub repo
2. Set root directory to `server`
3. Add environment variables
4. Deploy

### Environment Variables (Production)
Update `client/.env.production`:
```env
VITE_API_URL=https://your-backend.railway.app
VITE_RECAPTCHA_SITE_KEY=your-site-key
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Google reCAPTCHA v3
- CORS protection
- Rate limiting
- Input validation
- XSS protection
- HTTPS enforced (production)

## 🎨 Features

- ✅ Multilingual (EN/PT/FR)
- ✅ Admin dashboard
- ✅ Travel blog with rich text editor
- ✅ Interactive world map
- ✅ Pet sitting booking system
- ✅ Portfolio showcase
- ✅ CV download
- ✅ Responsive design
- ✅ Dark mode (optional)
- ✅ Real-time calendar

## 📝 License

MIT License - feel free to use for your own portfolio!

## 👤 Author

**Aldir Junior**
- GitHub: [@aldirjr](https://github.com/aldirjr)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

**Built with ❤️ using React & Node.js**
