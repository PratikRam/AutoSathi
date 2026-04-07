import React, { createContext, useContext, useMemo, useState } from 'react'
import { loginUser, registerUser } from '../api/services/auth.api'

export const UserDataContext = createContext(null)

const UserContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const login = async userData => {
    setAuthLoading(true)
    setAuthError('')

    try {
      const response = await loginUser(userData)
      setIsAuthenticated(true)
      setUser(response?.user ?? null)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setAuthError(error.message)
      throw error
    } finally {
      setAuthLoading(false)
    }
  }

  const registerAccount = async userData => {
    setAuthLoading(true)
    setAuthError('')

    try {
      const response = await registerUser(userData)
      setIsAuthenticated(true)
      setUser(response?.user ?? null)
      return response
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setAuthError(error.message)
      throw error
    } finally {
      setAuthLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setAuthError('')
  }

  const value = useMemo(
    () => ({
      authError,
      authLoading,
      isAuthenticated,
      login,
      logout,
      registerAccount,
      setAuthError,
      setIsAuthenticated,
      setUser,
      user
    }),
    [authError, authLoading, isAuthenticated, user]
  )

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserData = () => {
  const context = useContext(UserDataContext)

  if (!context) {
    throw new Error('useUserData must be used inside UserContext')
  }

  return context
}

export default UserContext
