import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { X, Search, Filter, ChevronDown } from 'lucide-react'

function AdminOrders() {
  const { user } = useAuth()
  const { orders, loading, updateOrderStatus } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">You need to be an admin to access this page.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or order ID..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status} className="capitalize">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.userName}</div>
                      <div className="text-sm text-gray-500">{order.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">Order Information</h3>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-medium">#{selectedOrder.id.slice(-6)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.userName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{selectedOrder.userEmail}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Order Status</h3>
                <div className="mt-2">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value)
                      setSelectedOrder({ ...selectedOrder, status: e.target.value })
                    }}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 rounded-md"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status} className="capitalize">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Order Items</h3>
                <div className="mt-2 space-y-2">
                  {selectedOrder.items.map((item) => (
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
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>₱{selectedOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders 