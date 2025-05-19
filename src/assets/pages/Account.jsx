import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

function Account() {
  const { user, logout, isAdmin } = useAuth()
  const { orders } = useOrders()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  const userOrders = orders.filter(order => order.userId === user.uid)

  // Helper to get first name
  const getFirstName = (displayName) => displayName ? displayName.split(' ')[0] : ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Profile updated successfully!')
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
        <p className="text-gray-600 mb-8">You need to be logged in to access your account.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Log In
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Welcome, {getFirstName(user.displayName)}</h2>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Profile
              </button>
              {!isAdmin && (
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === 'orders' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Order History
                </button>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                Log Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  Update Profile
                </button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && !isAdmin && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Order History</h2>
              </div>
              {userOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No orders found
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {userOrders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                        </div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : ''}
                          ${order.status === 'Shipped' ? 'bg-green-100 text-green-800' : ''}
                          ${order.status === 'Delivered' ? 'bg-gray-100 text-gray-800' : ''}
                          ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <img
                                src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/48x48?text=No+Image'}
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
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total</span>
                          <span>₱{order.total ? order.total.toFixed(2) : order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account 