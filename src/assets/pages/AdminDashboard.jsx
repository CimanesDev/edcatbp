import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useProducts()
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: 'https://placehold.co/400x300',
    stock: '',
    category: categories[0] || ''
  })

  if (!isAdmin) {
    navigate('/')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      updateProduct(editingProduct.id, formData)
      setEditingProduct(null)
    } else {
      addProduct(formData)
    }
    setFormData({
      name: '',
      price: '',
      description: '',
      image: 'https://placehold.co/400x300',
      stock: '',
      category: categories[0] || ''
    })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      stock: product.stock,
      category: product.category
    })
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-700 transition"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6">Product List</h2>
          <div className="space-y-4">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex justify-between items-center hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 mb-1">${product.price}</p>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full text-gray-700 uppercase tracking-wide mb-1">{product.category}</span>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>
                <div className="space-x-2 flex">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard