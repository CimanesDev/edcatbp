import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { getSubcollectionDocs, setSubcollectionDoc, deleteSubcollectionDoc } from '../../utils/database'
import { toast } from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    const loadCart = async () => {
      if (user && user.uid) {
        try {
          const cartItems = await getSubcollectionDocs('users', user.uid, 'cartItems')
          setCart(cartItems)
        } catch {}
      } else {
        setCart([])
      }
      setLoading(false)
      setHasLoaded(true)
    }
    loadCart()
  }, [user])

  const addToCart = async (product, quantity = 1) => {
    if (!user || !user.uid) {
      toast.error('Please log in to add items to cart')
      return
    }
    if (!product.stock || product.stock <= 0) {
      toast.error('This item is out of stock')
      return
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      const maxQuantity = product.stock || 0
      let newCart
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, maxQuantity)
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        const addQuantity = Math.min(quantity, maxQuantity)
        newCart = [...prevCart, { ...product, quantity: addQuantity }]
      }
      setSubcollectionDoc('users', user.uid, 'cartItems', product.id, {
        ...product,
        quantity: newCart.find(i => i.id === product.id)?.quantity || 1
      })
      return newCart
    })
  }

  const removeFromCart = async (productId) => {
    if (!user || !user.uid) return
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
    await deleteSubcollectionDoc('users', user.uid, 'cartItems', productId)
  }

  const updateQuantity = async (productId, quantity) => {
    if (!user || !user.uid) return
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === productId)
      if (!item) return prevCart
      const maxQuantity = item.stock || 0
      if (quantity < 1) return prevCart
      const newQuantity = Math.min(quantity, maxQuantity)
      setSubcollectionDoc('users', user.uid, 'cartItems', productId, {
        ...item,
        quantity: newQuantity
      })
      return prevCart.map(i =>
        i.id === productId
          ? { ...i, quantity: newQuantity }
          : i
      )
    })
  }

  const clearCart = async () => {
    if (!user || !user.uid) return
    for (const item of cart) {
      await deleteSubcollectionDoc('users', user.uid, 'cartItems', item.id)
    }
    setCart([])
  }

  const getCartTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0)

  const updateCartQuantities = async (productId, newStock) => {
    if (!user || !user.uid) return
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === productId)
      if (!item) return prevCart
      if (item.quantity > newStock) {
        setSubcollectionDoc('users', user.uid, 'cartItems', productId, {
          ...item,
          quantity: newStock
        })
        return prevCart.map(i =>
          i.id === productId
            ? { ...i, quantity: newStock }
            : i
        )
      }
      return prevCart
    })
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    updateCartQuantities
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}