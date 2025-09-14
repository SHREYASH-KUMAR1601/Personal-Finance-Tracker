# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for free account
3. Create a new cluster (free M0 tier)

## Step 2: Database Configuration
1. **Database Name**: `personal-finance-tracker`
2. **Collections**: Will be auto-created by your app
   - users
   - transactions  
   - receipts
   - importjobs

## Step 3: Network Access
1. Go to "Network Access" in Atlas dashboard
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your deployment service IPs

## Step 4: Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and strong password
4. Give "Read and write to any database" permissions

## Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Select "Connect your application"
3. Copy the connection string
4. Replace <password> with your user password
5. Replace <dbname> with "personal-finance-tracker"

## Example Connection String:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-finance-tracker?retryWrites=true&w=majority
```

## Step 6: Test Connection
Add this connection string to your backend environment variables as MONGODB_URI
