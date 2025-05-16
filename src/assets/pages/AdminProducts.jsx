import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import AdminProductForm from '../components/AdminProductForm'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import toast from 'react-hot-toast'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const PRODUCTS_PER_PAGE = 6

  const categories = [
    { id: 'pocket-knives', name: 'Pocket Knives' },
    { id: 'flashlights', name: 'Flashlights' },
    { id: 'coins', name: 'Coins' }
  ]

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let q = collection(db, 'products')
      
      if (selectedCategory) {
        q = query(q, where('category', '==', selectedCategory))
      }
      
      const querySnapshot = await getDocs(q)
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Filter products based on search term
      const filteredProducts = searchTerm
        ? fetchedProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : fetchedProducts

      setProducts(filteredProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    fetchProducts()
  }, [selectedCategory, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  const handleSubmit = async (data) => {
    try {
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
        await updateDoc(doc(db, 'products', editingProduct.id), productData)
        toast.success('Product updated successfully')
      } else {
        await addDoc(collection(db, 'products'), productData)
        toast.success('Product added successfully')
      }

      setShowForm(false)
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    }
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId))
        toast.success('Product deleted successfully')
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
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
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
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
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <AdminProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
            />
          </div>
        </div>
      )}

      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map(product => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-2 flex items-center gap-2">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/40x40?text=No+Image'}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded mr-2"
                />
                <span>{product.name}</span>
              </td>
              <td className="px-4 py-2 capitalize">{product.category.replace('-', ' ')}</td>
              <td className="px-4 py-2 font-medium">₱{product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setEditingProduct(product)
                    setShowForm(true)
                  }}
                  className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
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