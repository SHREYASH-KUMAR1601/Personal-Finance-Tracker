# Personal Finance Tracker Frontend

A modern React frontend for the Personal Finance Tracker MERN stack application.

## 🚀 Features

- **Authentication**: User registration and login
- **Dashboard**: Financial overview with balance, income, expenses
- **Transactions**: Add, edit, delete income and expense transactions
- **Receipts**: Upload and process receipt images/PDFs
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **React Hook Form**: Form handling
- **Lucide React**: Modern icon library
- **React Hot Toast**: Toast notifications
- **Date-fns**: Date utility library

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🔧 Configuration

The frontend is configured to connect to the backend at `http://localhost:4000`. The Vite dev server runs on port 3000 with proxy configuration for API calls.

### Environment Variables (Optional)

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

## 📱 Pages

### Authentication
- `/login` - User login
- `/register` - User registration

### Main Application (Protected)
- `/` - Dashboard with financial overview
- `/transactions` - Manage transactions
- `/receipts` - Upload and manage receipts

## 🎨 Styling

The application uses Tailwind CSS with a custom design system:

- **Primary Colors**: Blue theme
- **Success**: Green for income and positive actions
- **Danger**: Red for expenses and delete actions
- **Typography**: Clean, readable fonts
- **Components**: Reusable button and card styles

## 🔐 Authentication

The app uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatic token attachment to API requests
- Protected routes redirect to login if not authenticated
- Auto-logout functionality

## 📊 API Integration

All API calls go through the `services/api.js` file:
- Centralized HTTP client configuration
- Error handling and response processing
- Helper functions for amount formatting

## 🚀 Getting Started

1. Make sure your backend is running on port 4000
2. Install frontend dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open http://localhost:3000 in your browser
5. Register a new account or login
6. Start tracking your finances!

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main app layout
│   └── ProtectedRoute.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication state
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Transactions.jsx
│   └── Receipts.jsx
├── services/           # API and utilities
│   └── api.js         # API client
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🎯 Next Steps

- Add charts for expense visualization
- Implement budget tracking
- Add export functionality
- Enhance receipt processing with better OCR
- Add mobile app with React Native
- Implement real-time updates with WebSocket

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**: Make sure backend is running and CORS is configured
2. **API Connection**: Check if backend is running on port 4000
3. **Build Issues**: Clear node_modules and reinstall dependencies
4. **Authentication**: Clear localStorage if experiencing token issues

### Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Use network tab to debug API calls
- Tailwind CSS IntelliSense extension recommended for VS Code

## 📄 License

This project is part of the Personal Finance Tracker MERN stack application.
