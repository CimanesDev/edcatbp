import { useOrders } from '../context/OrderContext'
import { Link } from 'react-router-dom'

function Orders() {
  const { orders, loading } = useOrders()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          When you place an order, it will appear here.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-6)}</h3>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="mt-2 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.product?.images?.[0] || 'https://via.placeholder.com/48x48?text=No+Image'}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>₱{order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders 