# 📡 **Personal Finance Tracker Backend - Postman Testing Guide**

## 🚀 **Prerequisites**
1. **Start your backend server**: `npm run dev` (runs on http://localhost:5000)
2. **MongoDB running**: Make sure MongoDB is running locally
3. **Postman installed**: Download from https://postman.com

---

## 📋 **Step-by-Step Testing Instructions**

### 1️⃣ **Health Check** (Test if server is running)
```
Method: GET
URL: http://localhost:5000/health
Headers: None needed
```
**Expected Response:**
```json
{
  "ok": true
}
```

---

### 2️⃣ **User Registration**
```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: 
  Content-Type: application/json
Body (raw JSON):
{
  "email": "test@example.com",
  "name": "Test User",
  "password": "password123"
}
```
**Expected Response:**
```json
{
  "id": "user_id_here",
  "email": "test@example.com"
}
```

---

### 3️⃣ **User Login** (Get JWT Token)
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: 
  Content-Type: application/json
Body (raw JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```
**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**🔑 IMPORTANT**: Copy this token! You'll need it for all authenticated requests.
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzZiZTY4NDE1MDFhMDllMWU4OTg0YiIsImlhdCI6MTc1Nzg1NTQwMCwiZXhwIjoxNzU4NDYwMjAwfQ.P2dDD7LgVrnOaFuiI5Ji555C5QhRmu3ZZNjhGgiwRDg"
---

### 4️⃣ **Create Transaction** (Requires Authentication)
```
Method: POST
URL: http://localhost:5000/api/transactions
Headers: 
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_HERE
Body (raw JSON):
{
  "type": "expense",
  "amountMinor": 15000,
  "currency": "INR",
  "category": "Food",
  "note": "Lunch at restaurant",
  "date": "2025-09-14T12:00:00Z"
}
```
**Expected Response:**
```json
{
  "_id": "transaction_id",
  "userId": "user_id",
  "type": "expense",
  "amountMinor": 15000,
  "currency": "INR",
  "category": "Food",
  "note": "Lunch at restaurant",
  "date": "2025-09-14T12:00:00.000Z",
  "source": "manual",
  "createdAt": "2025-09-14T...",
  "updatedAt": "2025-09-14T..."
}
```

---

### 5️⃣ **Get All Transactions**
```
Method: GET
URL: http://localhost:5000/api/transactions
Headers: 
  Authorization: Bearer YOUR_TOKEN_HERE
Query Parameters (optional):
  - from: 2025-09-01
  - to: 2025-09-30
  - page: 1
  - limit: 50
```

---

### 6️⃣ **Get Summary**
```
Method: GET
URL: http://localhost:5000/api/summary
Headers: 
  Authorization: Bearer YOUR_TOKEN_HERE
Query Parameters (optional):
  - from: 2025-09-01
  - to: 2025-09-30
```
**Expected Response:**
```json
{
  "totals": {
    "income": 50000,
    "expense": 25000
  },
  "expensesByCategory": [
    {
      "category": "Food",
      "totalMinor": 15000
    }
  ]
}
```

---

### 7️⃣ **Upload Receipt**
```
Method: POST
URL: http://localhost:5000/api/receipts/upload
Headers: 
  Authorization: Bearer YOUR_TOKEN_HERE
Body: form-data
  Key: file
  Value: [Select an image or PDF file]
```

---

## 🔧 **Postman Collection Setup**

### Create Environment Variables:
1. Click "Environments" in Postman
2. Create new environment "Personal Finance Tracker"
3. Add variables:
   - `baseUrl`: `http://localhost:5000`
   - `token`: `(leave empty initially)`

### Auto-Set Token After Login:
In your login request, add this to the "Tests" tab:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.token);
}
```

### Use Variables in Requests:
- URL: `{{baseUrl}}/api/auth/login`
- Authorization: `Bearer {{token}}`

---

## ⚠️ **Common Issues & Solutions**

### 1. **Server Not Starting**
```bash
cd backend
npm install
npm run dev
```

### 2. **MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check `.env` file has correct `MONGODB_URI`

### 3. **401 Unauthorized**
- Make sure token is included in Authorization header
- Token format: `Bearer YOUR_TOKEN_HERE`

### 4. **CORS Error**
- Check CORS settings in `src/config/cors.js`

---

## 📊 **Sample Test Data**

### Income Transaction:
```json
{
  "type": "income",
  "amountMinor": 500000,
  "currency": "INR",
  "category": "Salary",
  "note": "Monthly salary",
  "date": "2025-09-01T00:00:00Z"
}
```

### Expense Transaction:
```json
{
  "type": "expense",
  "amountMinor": 25000,
  "currency": "INR", 
  "category": "Transportation",
  "note": "Uber ride",
  "date": "2025-09-14T10:30:00Z"
}
```

---

## 🎯 **Testing Workflow**
1. ✅ Test health endpoint
2. ✅ Register new user
3. ✅ Login to get token
4. ✅ Create income transaction
5. ✅ Create expense transaction
6. ✅ Get all transactions
7. ✅ Get summary
8. ✅ Test receipt upload
9. ✅ Test edge cases (invalid data, missing auth, etc.)

**Your backend is now ready for comprehensive testing! 🎉**
