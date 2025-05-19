import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ProductDetails() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  const product = products.find(p => p.id === id)
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    )
  }

  const images = product.images || [product.image]

  const nextImage = () => setSelectedImageIndex(prev => (prev + 1) % images.length)
  const prevImage = () => setSelectedImageIndex(prev => (prev - 1 + images.length) % images.length)

  return (
    <div className="max-w-5xl mx-auto py-12">
      <nav className="mb-8 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-full">
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-96 object-contain rounded-2xl shadow-md mb-4 bg-white"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg border-2 transition ${index === selectedImageIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-contain rounded-lg bg-white"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <span className="px-4 py-2 bg-gray-100 text-xs font-semibold rounded-full text-gray-700 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-2">₱{product.price.toFixed(2)}</p>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium">{product.stock}</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Link to={`/products/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.images?.[0] || relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{relatedProduct.description}</p>
                    <p className="text-xl font-bold text-gray-900">₱{relatedProduct.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails