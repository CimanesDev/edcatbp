import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import AdminProductForm from '../components/AdminProductForm'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../../config/firebase'
import toast from 'react-hot-toast'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [lastVisible, setLastVisible] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const productsPerPage = 6

  const categories = [
    { id: 'pocket-knives', name: 'Pocket Knives' },
    { id: 'flashlights', name: 'Flashlights' },
    { id: 'coins', name: 'Coins' }
  ]

  const fetchProducts = async (isInitial = false) => {
    try {
      setLoading(true)
      let q = collection(db, 'products')
      
      if (selectedCategory) {
        q = query(q, where('category', '==', selectedCategory))
      }
      
      if (searchTerm) {
        q = query(q, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'))
      }
      
      q = query(q, orderBy('name'), limit(productsPerPage))
      
      if (!isInitial && lastVisible) {
        q = query(q, startAfter(lastVisible))
      }

      const querySnapshot = await getDocs(q)
      const newProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
      setHasMore(querySnapshot.docs.length === productsPerPage)
      
      if (isInitial) {
        setProducts(newProducts)
      } else {
        setProducts(prev => [...prev, ...newProducts])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(true)
  }, [selectedCategory, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts(true)
  }

  const handleLoadMore = () => {
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
      fetchProducts(true)
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
        fetchProducts(true)
      } catch (error) {
        console.error('Error deleting product:', error)
        toast.error('Failed to delete product')
      }
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminProducts 