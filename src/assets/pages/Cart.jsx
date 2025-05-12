import { useCart } from "../context/CartContext"
import { Link } from 'react-router-dom'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-extrabold mb-6">Your Cart is Empty</h1>
        <Link
          to="/products"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center">Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex items-center space-x-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-xl border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-600 mb-1">${item.price}</p>
              <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-700 uppercase tracking-wide mb-1">{item.category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Remove
              </button>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold">Total:</span>
          <span className="text-3xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="block w-full bg-gray-900 text-white text-center py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart