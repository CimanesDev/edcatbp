import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (email, password) => {
    //For demo purposes, hardcoded credentials
    if (email === 'admin@edc.com' && password === 'admin123') {
      setUser({ email, role: 'admin' })
      setIsAdmin(true)
      return true
    } else if (email === 'user@edc.com' && password === 'user123') {
      setUser({ email, role: 'user' })
      setIsAdmin(false)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}