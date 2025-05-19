import { useState, useEffect } from 'react'
import { Plus, Search, Loader2, Pencil, Trash2, X } from 'lucide-react'
import AdminProductForm from '../components/AdminProductForm'
import { useProducts } from '../context/ProductContext'
import toast from 'react-hot-toast'

function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, loading: productsLoading } = useProducts()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const PRODUCTS_PER_PAGE = 6

  const categories = [
    { id: 'pocket-knives', name: 'Pocket Knives' },
    { id: 'flashlights', name: 'Flashlights' },
    { id: 'coins', name: 'Coins' }
  ]

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
  }

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      const productData = {
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        stock: parseInt(data.stock),
        isFeatured: data.isFeatured,
        images: data.images.filter(Boolean)
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
      } else {
        await addProduct(productData)
      }

      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setIsDeleting(true)
        await deleteProduct(productId)
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        <div className="flex gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <AdminProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {productsLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/40x40?text=No+Image'}
                            alt={product.name}
                            className="h-10 w-10 rounded-full object-contain bg-white"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₱{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product)
                            setShowForm(true)
                          }}
                          className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                          title="Edit product"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-md hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete product"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!productsLoading && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === idx + 1
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

export default AdminProducts 