import { createContext, useContext, useState, useEffect } from 'react'
import { getDocuments, addDocument, updateDocument } from '../../utils/database'
import { useAuth } from './AuthContext'
import { useCart } from './CartContext'
import { where } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const { user, isAdmin } = useAuth()
  const { cart, clearCart, updateCartQuantities } = useCart()

  // Load orders from Firestore
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setOrders([])
        setLoading(false)
        return
      }

      try {
        let ordersData
        if (isAdmin) {
          // Admins can see all orders
          ordersData = await getDocuments('orders')
        } else {
          // Regular users can only see their orders
          ordersData = await getDocuments('orders', [
            where('userId', '==', user.uid)
          ])
        }
        setOrders(ordersData)
        setError(null)
      } catch (error) {
        console.error('Error loading orders:', error)
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [user, isAdmin])

  // Add notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  const createOrder = async (orderData) => {
    if (!user) {
      toast.error('Please log in to checkout')
      throw new Error('You must be logged in to create an order')
    }

    try {
      const order = {
        ...orderData,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        items: cart,
        status: 'pending',
        createdAt: new Date()
      }

      const orderId = await addDocument('orders', order)
      const newOrder = { id: orderId, ...order }
      setOrders(prev => [...prev, newOrder])

      // Decrement stock for each product and notify other users
      for (const item of cart) {
        const newStock = (item.stock || 0) - item.quantity
        await updateDocument('products', item.id, {
          stock: newStock
        })
        // Notify other users about stock change
        updateCartQuantities(item.id, newStock)
      }

      clearCart() // Clear the cart after successful order
      toast.success('Order placed successfully!')
      return newOrder
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to place order. Please try again.')
      throw error
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    if (!isAdmin) {
      throw new Error('Only admins can update order status')
    }

    try {
      await updateDocument('orders', orderId, {
        status,
        updatedAt: new Date()
      })
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      )
      addNotification(`Order #${orderId} status updated to ${status}`, 'success')
    } catch (error) {
      console.error('Error updating order status:', error)
      addNotification('Failed to update order status', 'error')
      throw error
    }
  }

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const getUserOrders = () => {
    if (!user) return []
    return orders.filter(order => order.userId === user.uid)
  }

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status)
  }

  const value = {
    orders,
    loading,
    error,
    notifications,
    createOrder,
    updateOrderStatus,
    getOrder,
    getUserOrders,
    getOrdersByStatus
  }

  return (
    <OrderContext.Provider value={value}>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
        </div>
      ) : children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
} 