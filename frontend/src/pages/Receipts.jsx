import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { Upload, FileText, Check } from 'lucide-react'
import { format } from 'date-fns'

export default function Receipts() {
  const [receipts, setReceipts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    try {
      const data = await api.getReceipts()
      setReceipts(data)
    } catch (error) {
      toast.error('Failed to load receipts')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.includes('image/') && file.type !== 'application/pdf') {
      toast.error('Please upload an image or PDF file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      await api.uploadReceipt(file)
      toast.success('Receipt uploaded successfully')
      fetchReceipts()
    } catch (error) {
      toast.error('Failed to upload receipt')
    } finally {
      setUploading(false)
      // Reset file input
      e.target.value = ''
    }
  }

  const handleConfirmReceipt = async (receipt) => {
    try {
      const confirmData = {
        amountMinor: receipt.parsed.amountMinor,
        currency: receipt.parsed.currency,
        category: receipt.parsed.category,
        date: new Date().toISOString(),
        note: `Receipt: ${receipt.originalName}`
      }
      
      await api.confirmReceipt(receipt._id, confirmData)
      toast.success('Receipt confirmed and transaction created')
      fetchReceipts()
    } catch (error) {
      toast.error('Failed to confirm receipt')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Receipts</h1>
        <p className="text-gray-600">Upload and manage your receipts</p>
      </div>

      {/* Upload Section */}
      <div className="card">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-2"></div>
              ) : (
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
              )}
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  {uploading ? 'Uploading...' : 'Click to upload'}
                </span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Images or PDF files (MAX. 5MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              accept="image/*,application/pdf"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Receipts List */}
      <div className="space-y-4">
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <div key={receipt._id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {receipt.originalName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        receipt.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : receipt.status === 'parsed'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {receipt.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(receipt.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {receipt.parsed.amountMinor && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ₹{api.formatAmount(receipt.parsed.amountMinor)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {receipt.parsed.category}
                      </p>
                    </div>
                  )}
                  
                  {receipt.status === 'parsed' && receipt.parsed.amountMinor && (
                    <button
                      onClick={() => handleConfirmReceipt(receipt)}
                      className="btn btn-success flex items-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Confirm</span>
                    </button>
                  )}
                </div>
              </div>
              
              {receipt.text && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Extracted Text:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded max-h-20 overflow-y-auto">
                    {receipt.text}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No receipts yet</h3>
            <p className="text-gray-600">Upload your first receipt to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
