import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../../config/firebase'
import { signIn, signUp, logOut, getCurrentUser } from '../../utils/auth'
import { getDocument, setDocument } from '../../utils/database'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          const userData = await getDocument('users', authUser.uid)
          if (userData) {
            const combinedUserData = {
              ...authUser,
              ...userData,
              role: userData.role || 'user'
            }
            setUser(combinedUserData)
            setIsAdmin(combinedUserData.role === 'admin')
          } else {
            setUser(authUser)
            setIsAdmin(false)
          }
        } else {
          setUser(null)
          setIsAdmin(false)
        }
        setError(null)
      } catch {
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const authUser = await signIn(email, password)
      const userData = await getDocument('users', authUser.uid)
      if (userData) {
        const combinedUserData = {
          ...authUser,
          ...userData,
          role: userData.role || 'user'
        }
        setUser(combinedUserData)
        setIsAdmin(combinedUserData.role === 'admin')
        toast.success('Logged in successfully!')
        navigate('/')
      }
      return authUser
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, displayName) => {
    try {
      setLoading(true)
      setError(null)
      const user = await signUp(email, password, displayName)
      await setDocument('users', user.uid, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: 'user',
        createdAt: new Date()
      })
      return user
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      setError(null)
      await logOut()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data) => {
    try {
      setLoading(true)
      setError(null)
      if (!user) throw new Error('No user logged in')
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        ...data,
        updatedAt: new Date()
      }, { merge: true })
      setUser(prev => ({ ...prev, ...data }))
      if (data.role) setIsAdmin(data.role === 'admin')
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    isAdmin,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
        </div>
      ) : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}