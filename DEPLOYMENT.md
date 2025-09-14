# Deployment Guide

## GitHub Pages Deployment (Frontend Only)

Since GitHub Pages only supports static files, you'll need to deploy the frontend and backend separately.

### Frontend Deployment to GitHub Pages

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deployment scripts to frontend/package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/personal-finance-tracker"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

### Backend Deployment Options

#### Option 1: Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy with Git

#### Option 2: Railway
1. Connect GitHub repository
2. Set environment variables
3. Auto-deploy on push

#### Option 3: Vercel (Serverless)
1. Install Vercel CLI
2. Configure vercel.json
3. Deploy with `vercel --prod`

### Environment Variables for Production

**Backend (.env)**:
```
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
PORT=5000
NODE_ENV=production
```

**Frontend (update API_URL)**:
```javascript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.herokuapp.com/api'
  : 'http://localhost:5000/api';
```

### Full Stack Deployment Recommendations

1. **Backend**: Deploy to Heroku, Railway, or Vercel
2. **Database**: Use MongoDB Atlas (free tier available)
3. **Frontend**: Deploy to Netlify, Vercel, or GitHub Pages
4. **File Storage**: Use cloud storage for uploaded receipts

### Pre-deployment Checklist

- [ ] Update API URLs in frontend
- [ ] Set production environment variables
- [ ] Test in production-like environment
- [ ] Configure CORS for production domains
- [ ] Optimize build sizes
- [ ] Set up error monitoring
- [ ] Configure SSL certificates
