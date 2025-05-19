import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      alert('Please log in or create an account to checkout')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (loading || !cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow divide-y">
            {cart.map(item => (
              <div key={item.id} className="p-6 flex gap-6">
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/96x96?text=No+Image'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-medium mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">₱{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₱{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₱{getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {user ? 'Proceed to Checkout' : 'Log in to Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart