import axios from 'axios'

// Set base URL
axios.defaults.baseURL = 'http://localhost:5000'

// API service functions
export const api = {
  // Transactions
  getTransactions: async (params = {}) => {
    const response = await axios.get('/api/transactions', { params })
    return response.data
  },

  createTransaction: async (transaction) => {
    const response = await axios.post('/api/transactions', transaction)
    return response.data
  },

  updateTransaction: async (id, transaction) => {
    const response = await axios.patch(`/api/transactions/${id}`, transaction)
    return response.data
  },

  deleteTransaction: async (id) => {
    await axios.delete(`/api/transactions/${id}`)
  },

  // Summary
  getSummary: async (params = {}) => {
    const response = await axios.get('/api/summary', { params })
    return response.data
  },

  // Receipts
  getReceipts: async () => {
    const response = await axios.get('/api/receipts')
    return response.data
  },

  uploadReceipt: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post('/api/receipts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  confirmReceipt: async (id, data) => {
    const response = await axios.post(`/api/receipts/${id}/confirm`, data)
    return response.data
  },

  // Utility functions
  formatAmount: (amountMinor) => {
    return (amountMinor / 100).toFixed(2)
  },

  parseAmount: (amount) => {
    return Math.round(parseFloat(amount) * 100)
  }
}
