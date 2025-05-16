import { createContext, useContext, useState, useEffect } from 'react'
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../../utils/database'
import { useAuth } from './AuthContext'
import { toast } from 'react-hot-toast'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAdmin } = useAuth()

  const loadProducts = async () => {
    try {
      const productsData = await getDocuments('products')
      setProducts(productsData)
      setError(null)
    } catch (error) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  const addProduct = async (productData) => {
    if (!isAdmin) {
      toast.error('Only admins can add products')
      throw new Error('Only admins can add products')
    }
    try {
      const { id, ...dataWithoutId } = productData
      const product = { ...dataWithoutId, createdAt: new Date() }
      const productId = await addDocument('products', product)
      toast.success('Product added successfully!')
      await loadProducts()
      return { id: productId, ...product }
    } catch (error) {
      toast.error('Failed to add product')
      throw error
    }
  }

  const updateProduct = async (productId, productData) => {
    if (!isAdmin) {
      toast.error('Only admins can update products')
      throw new Error('Only admins can update products')
    }
    try {
      const product = { ...productData, updatedAt: new Date() }
      await updateDocument('products', productId, product)
      toast.success('Product updated successfully!')
      await loadProducts()
    } catch (error) {
      toast.error('Failed to update product')
      throw error
    }
  }

  const deleteProduct = async (productId) => {
    if (!isAdmin) {
      toast.error('Only admins can delete products')
      throw new Error('Only admins can delete products')
    }
    try {
      await deleteDocument('products', productId)
      toast.success('Product deleted successfully!')
      await loadProducts()
    } catch (error) {
      toast.error('Failed to delete product')
      throw error
    }
  }

  const getProduct = (productId) => products.find(product => product.id === productId)
  const getProductsByCategory = (category) => products.filter(product => product.category === category)
  const searchProducts = (query) => {
    const searchTerm = query.toLowerCase()
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    )
  }

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsByCategory,
    searchProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
        </div>
      ) : children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProducts must be used within a ProductProvider')
  return context
}