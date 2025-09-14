# Personal Finance Tracker

A comprehensive web application for managing personal finances with receipt scanning capabilities.

## Features

- 💰 **Transaction Management** - Add, edit, and categorize income and expenses
- 📊 **Dashboard Analytics** - Visual insights into your spending patterns
- 🧾 **Receipt Scanning** - Upload and automatically parse receipts using OCR
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 💾 **Data Import/Export** - Import transactions from CSV files

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast development and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **PDF-Parse & Tesseract.js** - Document processing and OCR

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Account Management
1. **Register** - Create a new account with email and password
2. **Login** - Access your personal dashboard
3. **Secure Sessions** - JWT-based authentication

### Transaction Management
1. **Add Transactions** - Record income and expenses manually
2. **Categorize** - Organize transactions by categories (Food, Transportation, etc.)
3. **Edit & Delete** - Modify existing transactions
4. **Real-time Balance** - Automatic balance calculations

### Receipt Processing
1. **Upload Receipts** - Drag and drop PDF or image files
2. **OCR Processing** - Automatic text extraction from receipts
3. **Amount Detection** - Smart parsing of total amounts
4. **One-click Conversion** - Transform receipts into transactions

### Analytics Dashboard
1. **Financial Overview** - View total income, expenses, and balance
2. **Visual Charts** - Graphical representation of spending patterns
3. **Category Breakdown** - Understand where your money goes
4. **Trend Analysis** - Track financial progress over time

## API Documentation

### Authentication Endpoints
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
```

### Transaction Endpoints
```
GET    /api/transactions     - Get all user transactions
POST   /api/transactions     - Create new transaction
PUT    /api/transactions/:id - Update transaction
DELETE /api/transactions/:id - Delete transaction
```

### Receipt Endpoints
```
POST /api/receipts/upload        - Upload receipt file
POST /api/receipts/:id/confirm   - Convert receipt to transaction
GET  /api/receipts               - Get all receipts
```

### Summary Endpoints
```
GET /api/summary - Get financial summary
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   └── services/        # Business logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/personal-finance-tracker](https://github.com/yourusername/personal-finance-tracker)
- See financial overview
- Check balance and trends
- Analyze spending by category

## 🔒 **Security Features:**

✅ **Backend Security:**
- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- User-scoped data access

✅ **Frontend Security:**
- Protected routes
- Token-based auth
- Automatic logout
- XSS protection

## 🎉 **Congratulations!**

You now have a complete **MERN Stack Personal Finance Tracker** with:
- ✅ Secure authentication
- ✅ Transaction management
- ✅ Receipt processing
- ✅ Financial dashboard
- ✅ Modern UI/UX
- ✅ Full CRUD operations
- ✅ Professional codebase

**Your application is production-ready for personal use and can be extended with additional features!**

---

**🌟 Happy coding! Your MERN stack journey is complete!** 🌟
