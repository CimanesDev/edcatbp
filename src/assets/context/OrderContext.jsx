import { createContext, useContext, useState } from 'react'

const OrderContext = createContext()

export function useOrders() {
  return useContext(OrderContext)
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])

  const addOrder = (order) => {
    setOrders(prev => [...prev, { ...order, id: Date.now().toString() }])
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const value = {
    orders,
    addOrder,
    updateOrderStatus
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
} 