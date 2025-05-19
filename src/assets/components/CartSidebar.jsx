import { useState, useEffect } from 'react'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) setIsVisible(true)
    else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible && !isOpen) return null

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl rounded-l-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50 rounded-tl-2xl">
          <h2 className="text-xl font-bold tracking-tight">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-200 transition"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {cart.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-400 text-lg font-medium">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 shadow-sm">
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/80x80?text=No+Image'}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">${item.price} x {item.quantity}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded p-1 bg-gray-200 hover:bg-gray-300 transition"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded p-1 bg-gray-200 hover:bg-gray-300 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full p-1 text-red-500 hover:bg-red-100 transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <span className="text-base font-semibold text-gray-900">₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-white p-6 sticky bottom-0 rounded-bl-2xl">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-gray-900">₱{getCartTotal().toFixed(2)}</span>
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full rounded-lg bg-gray-200 px-4 py-2 text-center text-gray-900 font-semibold shadow hover:bg-gray-300 transition"
            >
              View Entire Cart
            </Link>
          </div>
          <Link
            to="/checkout"
            onClick={onClose}
            className={`block w-full rounded-lg bg-gray-900 px-4 py-3 text-center text-lg font-semibold shadow hover:bg-gray-800 transition text-white ${
              cart.length === 0 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={cart.length === 0}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  )
}