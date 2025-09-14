import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false, error: null }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'LOGOUT':
      return { ...state, user: null, token: null, error: null }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Set axios default headers
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
      localStorage.setItem('token', state.token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [state.token])

  // Check token validity on app start
  useEffect(() => {
    if (state.token) {
      // You could verify token with backend here
      dispatch({ type: 'SET_LOADING', payload: false })
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await axios.post('/api/auth/login', { email, password })
      const { token } = response.data
      
      dispatch({ type: 'SET_TOKEN', payload: token })
      dispatch({ type: 'SET_USER', payload: { email } })
      return true
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      return false
    }
  }

  const register = async (email, name, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await axios.post('/api/auth/register', { email, name, password })
      
      // Auto-login after registration
      const loginSuccess = await login(email, password)
      return loginSuccess
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const value = {
    ...state,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
