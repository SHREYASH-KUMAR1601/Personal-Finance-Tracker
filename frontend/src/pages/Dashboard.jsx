import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totals: { income: 0, expense: 0 },
    expensesByCategory: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const data = await api.getSummary()
      setSummary(data)
    } catch (error) {
      toast.error('Failed to load summary')
    } finally {
      setLoading(false)
    }
  }

  const balance = (summary.totals.income || 0) - (summary.totals.expense || 0)

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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your financial status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{api.formatAmount(balance)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{api.formatAmount(summary.totals.income || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{api.formatAmount(summary.totals.expense || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-purple-600">
                {summary.expensesByCategory?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses by Category */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses by Category</h3>
        {summary.expensesByCategory && summary.expensesByCategory.length > 0 ? (
          <div className="space-y-4">
            {summary.expensesByCategory.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.category}</span>
                    <span className="text-sm text-gray-600">₹{api.formatAmount(item.totalMinor)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(item.totalMinor / (summary.totals.expense || 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No expenses recorded yet</p>
        )}
      </div>
    </div>
  )
}
