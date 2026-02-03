# Junior's World 🌍

A professional, multilingual personal website featuring portfolio, travel blog, and pet sitting services with MongoDB backend and admin panel.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## ✨ Features

### 🎯 Core Functionality
- **4 Main Sections**: Professional Portfolio, Travel Blog, Personal Space, Pet Sitting Services
- **Admin Panel**: Manage content without redeploying
- **MongoDB Database**: Store blog posts, calendar, resume data
- **Multilingual**: English, Portuguese, French
- **Secure Authentication**: JWT + Google reCAPTCHA v3
- **AI Chatbot**: Answer questions about services and content
- **Responsive Design**: Mobile-first, works on all devices

### 🗺️ Enhanced Travel Map
- Interactive world map with Leaflet.js
- 26 countries with custom styling:
  - 🇧🇷 Brazil: Light green (birthplace)
  - 🇦🇺 Australia: Light yellow (current home)
  - Others: Light grey (visited)
- Flag emoji markers (not standard pins!)
- Hong Kong 🇭🇰 and Macau 🇲🇴 with own flags
- Country boundaries filled
- Click countries for details

### 🐶 Pet Sitting Features
- Fixed calendar widget (days properly aligned!)
- Real-time availability from database
- Pet client showcase with photos
- Booking request system
- Admin calendar management

### 🔐 Admin Panel
- Secure login with reCAPTCHA v3
- Create/edit/delete travel blog posts
- Manage pet sitting calendar
- Update resume sections
- Upload pet client photos
- All changes saved to MongoDB

## 📁 Project Structure

```
juniors-world/
├── api/                    # Serverless API endpoints
│   ├── auth/              # Authentication
│   ├── travel/            # Blog posts management
│   ├── petsitting/        # Calendar & bookings
│   ├── chatbot/           # AI chatbot
│   └── utils/             # MongoDB, auth utilities
├── public/                 # Frontend files
│   ├── *.html             # Main pages
│   ├── admin/             # Admin panel
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   ├── images/            # Assets
│   └── locales/           # Translations (en, pt, fr)
├── docs/                   # Documentation
├── .env.example           # Environment template
├── package.json           # Dependencies
├── vercel.json            # Vercel config
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account (free)
- Google reCAPTCHA keys
- Vercel account (free)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/juniors-world.git
cd juniors-world
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/juniors-world
JWT_SECRET=your-random-secret-key-min-32-characters
RECAPTCHA_SECRET=your-recaptcha-secret-key
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=your-secure-password
OPENAI_API_KEY=your-openai-key-optional
NODE_ENV=development
```

### 3. MongoDB Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster (Free M0)
3. Add database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Collections will be created automatically

### 4. Google reCAPTCHA v3 Setup
1. Go to [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register new site
3. Select reCAPTCHA v3
4. Add your domains
5. Copy Site Key and Secret Key

### 5. Run Locally
```bash
npm run dev
```
Open: `http://localhost:3000`

### 6. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
- Go to project → Settings → Environment Variables
- Add all variables from `.env`

### 7. Connect GoDaddy Domain

**In GoDaddy DNS Management:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour

Type: A
Name: @
Value: 76.76.19.19
TTL: 1 Hour
```

**In Vercel Dashboard:**
1. Go to project → Settings → Domains
2. Add your domain (e.g., juniors-world.com)
3. Follow verification steps
4. Wait for DNS propagation (up to 48 hours)

## 📖 Usage Guide

### Admin Login
1. Go to `/admin/login.html`
2. Enter credentials (from .env)
3. Complete reCAPTCHA
4. Access dashboard

### Managing Travel Posts
1. Login to admin panel
2. Go to "Manage Posts"
3. Click "New Post"
4. Fill in title, content (HTML supported!)
5. Translate to Portuguese and French
6. Add country, flag emoji, images
7. Publish

### Managing Pet Calendar
1. Login to admin panel
2. Go to "Manage Calendar"
3. Click dates to toggle availability
4. Add notes (e.g., "Prefer small dogs")
5. Save changes

### Adding Pet Clients
1. Login to admin panel
2. Go to "Pet Clients"
3. Upload photo
4. Add pet name and description
5. Translate descriptions
6. Save

## 🌍 Internationalization

The site automatically detects user's browser language and switches between English, Portuguese, and French.

### Adding New Translations
Edit files in `/public/locales/`:
- `en.json` - English
- `pt.json` - Portuguese
- `fr.json` - French

### In HTML
```html
<h1 data-i18n="home.welcome">Welcome</h1>
<button data-i18n="common.save">Save</button>
```

### In JavaScript
```javascript
const text = i18n.t('home.welcome');
const formatted = i18n.tf('welcome.user', { name: 'Junior' });
```

## 🤖 AI Chatbot Setup

### Option 1: Google Dialogflow (Recommended)
1. Create project at [Dialogflow](https://dialogflow.cloud.google.com/)
2. Create intents for:
   - Pet sitting availability
   - Travel blog questions
   - General inquiries
3. Get service account key
4. Add to API endpoint

### Option 2: OpenAI
1. Get API key from [OpenAI](https://platform.openai.com/)
2. Add to `.env`: `OPENAI_API_KEY=sk-...`
3. Implement in `/api/chatbot/query.js`

### Option 3: Free Alternative
Use Hugging Face Inference API (free tier available)

## 🎨 Customization

### Colors
Edit CSS variables in `/public/css/main.css`:
```css
:root {
    --primary: #2c3e50;
    --secondary: #27ae60;
    --accent: #3498db;
    --light: #ecf0f1;
    --dark: #1a252f;
}
```

### Travel Map
Edit `/public/js/travel-map.js`:
```javascript
const visitedCountries = {
    'Brazil': {
        coords: [-14.2350, -51.9253],
        flag: '🇧🇷',
        color: '#90EE90', // Your color
        year: '1988',
        cities: ['São Paulo', 'Rio']
    },
    // Add more countries...
};
```

### Content
- Update HTML files in `/public/`
- Replace images in `/public/images/`
- Modify translations in `/public/locales/`

## 🔒 Security

- ✅ JWT authentication with 7-day expiry
- ✅ Password hashing with bcrypt
- ✅ Google reCAPTCHA v3 (score ≥ 0.5)
- ✅ MongoDB connection encryption
- ✅ HTTPS enforced by Vercel
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ HttpOnly secure cookies

## 📊 Database Schema

### Collections

**users**
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String,
  createdAt: Date
}
```

**travel_posts**
```javascript
{
  _id: ObjectId,
  title: { en: String, pt: String, fr: String },
  slug: String,
  content: { en: String, pt: String, fr: String },
  country: String,
  flag: String,
  date: Date,
  images: [String],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**pet_calendar**
```javascript
{
  _id: ObjectId,
  date: String (YYYY-MM-DD),
  available: Boolean,
  notes: String,
  updatedAt: Date
}
```

## 🛠️ Development

### Local Development
```bash
npm run dev          # Start dev server
```

### Testing
```bash
# Test API endpoints
curl http://localhost:3000/api/travel/posts

# Test with authentication
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:3000/api/admin/resume
```

### Debugging
- Use browser DevTools (F12)
- Check Vercel logs in dashboard
- Use MongoDB Compass to view database
- Enable verbose logging in `.env`:
  ```
  DEBUG=true
  LOG_LEVEL=debug
  ```

## 📦 Dependencies

### Production
- `mongodb`: Database driver
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `node-fetch`: HTTP requests

### Frontend
- Bootstrap 5.3
- Leaflet.js (maps)
- Font Awesome icons
- Vanilla JavaScript (no framework!)

## 🚨 Troubleshooting

### "Module not found" error
```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection fails
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### reCAPTCHA not working
- Verify Site Key matches domain
- Check HTTPS is enabled
- Test in incognito mode

### Calendar days misaligned
- Clear browser cache
- Check CSS grid is supported
- Verify JavaScript is enabled

### Vercel deployment fails
- Check environment variables are set
- Verify `vercel.json` configuration
- Review build logs in Vercel dashboard

## 📈 Performance

- Serverless functions (instant scaling)
- MongoDB Atlas (optimized queries)
- Static assets on Vercel CDN
- Lazy loading for images
- Minified CSS/JS (production)

## 🎓 For Employers

This project demonstrates:

1. **Full-Stack Development**: Frontend + API + Database
2. **Modern Architecture**: Serverless, RESTful API
3. **Security**: Authentication, authorization, encryption
4. **Database Design**: MongoDB schema modeling
5. **API Development**: CRUD operations, middleware
6. **Internationalization**: Multi-language support
7. **DevOps**: Git, CI/CD, environment management
8. **UI/UX**: Responsive design, accessibility
9. **Problem Solving**: Complex features (map, calendar, admin panel)
10. **Documentation**: Comprehensive README, inline comments

## 📞 Support

- Email: your@email.com
- Instagram: [@juniorsfantasticworld](https://instagram.com/juniorsfantasticworld)
- Portfolio: [juniors-world.com](https://juniors-world.com)

## 📝 License

MIT License - feel free to use for personal projects

## 🙏 Acknowledgments

- Bootstrap for CSS framework
- Leaflet.js for map functionality
- MongoDB for database
- Vercel for hosting
- OpenStreetMap contributors

---

**Built with ❤️ by Junior**

*Last updated: January 2026*
