import { CheckAuth } from '@/api/services/checkAuth.api'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

const UserDataContext = createContext(null)

const UserContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true) // Start as true
  const [authError, setAuthError] = useState('')

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setAuthError('')
  }

  const checkAuthUser = async () => {
    try {
      const data = await CheckAuth()
      console.log("data is this", data);
      setUser(data.user)
      setIsAuthenticated(data.isAuthenticated)
      console.log(user, isAuthenticated)
    } catch (err) {
      console.log("err is this", err)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setAuthLoading(false)
    }
  }

  useEffect(() => {
    checkAuthUser() // runs on app load
  }, [])

  const value = useMemo(
    () => ({
      authError,
      authLoading,
      isAuthenticated,
      logout,
      setAuthError,
      setAuthLoading,
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

export default UserContext

export const useUserData = () => {
  const context = useContext(UserDataContext)

  if (!context) {
    throw new Error('useUserData must be used inside UserContext')
  }

  return context
}
