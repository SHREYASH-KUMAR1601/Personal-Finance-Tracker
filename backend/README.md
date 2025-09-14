# Personal Finance Tracker Backend - Setup Instructions

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**:
   - Copy `.env` file and update values for production
   - Ensure MongoDB is running locally or update `MONGODB_URI`

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Start**:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── env.js       # Environment variables
│   │   ├── db.js        # Database connection
│   │   ├── cors.js      # CORS configuration
│   │   └── multer.js    # File upload config
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── index.js         # App entry point
├── uploads/             # File uploads (created automatically)
├── package.json         # Dependencies
└── .env                # Environment variables
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Summary
- `GET /api/summary` - Get financial summary

### Receipts
- `POST /api/receipts/upload` - Upload receipt
- `GET /api/receipts` - List receipts
- `POST /api/receipts/:id/confirm` - Confirm parsed receipt

### Imports
- `POST /api/imports` - Import transactions from file
- `GET /api/imports` - List import jobs

## 🛡️ Security

- JWT-based authentication
- Bcrypt password hashing
- CORS protection
- Input validation
- User-scoped data access

## 🔄 Development

- Uses nodemon for hot reloading
- Structured error handling
- MongoDB with Mongoose ODM
- File upload with multer
- OCR support for receipts
