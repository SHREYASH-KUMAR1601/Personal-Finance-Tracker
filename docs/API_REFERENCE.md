# API Documentation

## Overview
This document provides comprehensive API documentation for the Personal Finance Tracker backend service.

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com", 
  "password": "securepassword123"
}
```

### Transactions

#### GET /transactions
Get all transactions for authenticated user.

**Query Parameters:**
- `category` (optional) - Filter by category
- `type` (optional) - Filter by type (income/expense)
- `limit` (optional) - Limit number of results
- `page` (optional) - Page number for pagination

#### POST /transactions
Create a new transaction.

**Request Body:**
```json
{
  "amount": 2500,
  "type": "expense",
  "category": "Food",
  "note": "Grocery shopping",
  "date": "2025-09-14T10:30:00Z"
}
```

### Receipts

#### POST /receipts/upload
Upload and process a receipt file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file field with image/PDF

**Response:**
```json
{
  "_id": "receipt_id",
  "originalName": "receipt.pdf",
  "text": "extracted_text_here",
  "parsed": {
    "amountMinor": 57500,
    "currency": "INR",
    "category": "Food"
  },
  "status": "parsed"
}
```

## Error Handling

All API errors follow this format:
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "status": 400
}
```

## Rate Limiting
- 100 requests per 15 minutes per IP
- 1000 requests per hour for authenticated users

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error
