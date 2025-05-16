import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getSubcollectionDocs, setSubcollectionDoc, deleteSubcollectionDoc } from '../../utils/database'

const WishlistContext = createContext()

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const { user } = useAuth()

  // Load wishlist from Firestore subcollection when user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (user && user.uid) {
        try {
          const wishlistItems = await getSubcollectionDocs('users', user.uid, 'wishlistItems')
          setWishlist(wishlistItems)
          console.log('Loaded wishlist from Firestore subcollection:', wishlistItems)
        } catch (error) {
          console.error('Error loading wishlist:', error)
        }
      } else {
        setWishlist([])
      }
      setLoading(false)
      setHasLoaded(true)
    }
    loadWishlist()
  }, [user])

  // Add item to wishlist subcollection
  const addToWishlist = async (product) => {
    if (!user || !user.uid) return
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev
      }
      // Save to Firestore
      setSubcollectionDoc('users', user.uid, 'wishlistItems', product.id, product)
      return [...prev, product]
    })
  }

  // Remove item from wishlist subcollection
  const removeFromWishlist = async (productId) => {
    if (!user || !user.uid) return
    setWishlist(prev => prev.filter(item => item.id !== productId))
    await deleteSubcollectionDoc('users', user.uid, 'wishlistItems', productId)
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const clearWishlist = async () => {
    if (!user || !user.uid) return
    for (const item of wishlist) {
      await deleteSubcollectionDoc('users', user.uid, 'wishlistItems', item.id)
    }
    setWishlist([])
  }

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
} 