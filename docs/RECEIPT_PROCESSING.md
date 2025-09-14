# 🧾 **Receipt Processing Testing Guide**

## 📋 **How to Test PDF Receipt Processing**

### 1️⃣ **Using the Sample PDF I Created:**
- I've created a sample receipt PDF: `sample-receipt.pdf` in your project root
- This contains a restaurant receipt with amount Rs. 575.00
- Use this file to test the upload functionality

### 2️⃣ **Testing Steps:**

#### **Frontend Testing:**
1. **Start both servers**:
   ```bash
   # Terminal 1 - Backend
   cd "C:\Users\ASUS\Personal Finance Tracker\backend"
   npm run dev
   
   # Terminal 2 - Frontend  
   cd "C:\Users\ASUS\Personal Finance Tracker\frontend"
   npm run dev
   ```

2. **Test in Browser** (http://localhost:3000):
   - Register/Login to your account
   - Go to **Receipts** page
   - Click the upload area
   - Select `sample-receipt.pdf` from project root
   - Watch it upload and process

#### **Backend API Testing with Postman:**

**Step 1: Upload Receipt**
```
Method: POST
URL: http://localhost:5000/api/receipts/upload
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
Body: form-data
  Key: file
  Value: [Upload sample-receipt.pdf]
```

**Expected Response:**
```json
{
  "_id": "receipt_id_here",
  "userId": "user_id",
  "originalName": "sample-receipt.pdf",
  "mimeType": "application/pdf",
  "storagePath": "/path/to/uploaded/file",
  "text": "Restaurant Receipt Date: September 14, 2025 Items: Pizza Margherita - Rs. 450.00 Coke - Rs. 50.00 Tax - Rs. 75.00 Total Amount: Rs. 575.00 Payment: Cash Thank you for dining with us!",
  "parsed": {
    "amountMinor": 57500,
    "currency": "INR",
    "category": "Misc"
  },
  "status": "parsed",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Step 2: Confirm Receipt to Transaction**
```
Method: POST
URL: http://localhost:5000/api/receipts/{receipt_id}/confirm
Headers:
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
Body:
{
  "category": "Food",
  "note": "Restaurant meal from receipt"
}
```

### 3️⃣ **Create Additional Test Files:**

#### **Create Test Receipt Image:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Receipt Generator</title>
    <style>
        .receipt { 
            width: 300px; 
            padding: 20px; 
            border: 1px solid #000; 
            font-family: monospace; 
            background: white;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <h3 style="text-align: center;">GROCERY STORE</h3>
        <p>Date: 14/09/2025</p>
        <hr>
        <p>Milk 1L          Rs. 65.00</p>
        <p>Bread            Rs. 30.00</p>
        <p>Eggs 12pc        Rs. 90.00</p>
        <p>Tomatoes 1kg     Rs. 40.00</p>
        <hr>
        <p><strong>TOTAL: Rs. 225.00</strong></p>
        <p>Payment: Card</p>
        <p style="text-align: center;">Thank You!</p>
    </div>
</body>
</html>
```

Save this as HTML, open in browser, take a screenshot, and use that image file for testing.

### 4️⃣ **Testing Different Scenarios:**

#### **Test Cases:**
1. **✅ Valid PDF**: Upload `sample-receipt.pdf`
2. **✅ Valid Image**: Upload screenshot of receipt  
3. **❌ Invalid File**: Try uploading a .txt file (should fail)
4. **❌ Large File**: Try uploading file > 5MB (should fail)
5. **❌ No File**: Submit without selecting file (should fail)

#### **Expected Behaviors:**
- ✅ PDF files should extract text using pdf-parse
- ✅ Image files should extract text using Tesseract OCR
- ✅ Amount detection should work with "Total", "Rs.", numbers
- ✅ Files should be stored in `/backend/uploads/` directory
- ✅ Receipt status should change from "uploaded" → "parsed" → "confirmed"

### 5️⃣ **Debug OCR Issues:**

#### **Check Uploaded Files:**
```bash
# Check if files are being saved
ls "C:\Users\ASUS\Personal Finance Tracker\backend\uploads\"
```

#### **Test OCR Manually:**
Add this test endpoint to your backend for debugging:

```javascript
// Add to backend/src/routes/receipts.js
router.post('/test-ocr', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  
  const fs = require('fs');
  const pdfParse = require('pdf-parse');
  const Tesseract = require('tesseract.js');
  
  let text = '';
  
  try {
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdfParse(fs.readFileSync(req.file.path));
      text = data.text;
    } else {
      const ocr = await Tesseract.recognize(req.file.path, 'eng');
      text = ocr.data.text;
    }
    
    res.json({ 
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      text: text,
      textLength: text.length 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 6️⃣ **Common Issues & Solutions:**

#### **PDF Not Processing:**
- Check if `pdf-parse` dependency is installed
- Verify PDF file is not corrupted
- Check backend console for errors

#### **OCR Not Working:**
- Tesseract.js requires good image quality
- Text should be clear and readable
- Try different image formats (PNG, JPEG)

#### **Amount Not Detected:**
- Current regex looks for patterns like:
  - "Total Rs. 575.00"
  - "Amount 575.00"  
  - "575.00" (any number with decimals)
- Modify regex in receipt parsing logic if needed

### 7️⃣ **Verify Full Workflow:**

1. **Upload Receipt** → Should extract text and detect amount
2. **Review Parsed Data** → Check if amount and category are correct
3. **Confirm Receipt** → Should create transaction in database
4. **Check Transactions** → Verify transaction appears in transactions list
5. **Check Dashboard** → Balance should update to reflect new expense

### 🎯 **Success Indicators:**

- ✅ File uploads without errors
- ✅ Text extraction shows readable content
- ✅ Amount detection finds correct value (57500 for Rs. 575.00)
- ✅ Receipt status changes to "parsed"
- ✅ Confirmation creates transaction
- ✅ Dashboard reflects new expense

**Your receipt processing system should now be fully testable! 🎉**
