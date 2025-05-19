import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

function ProductCard({ product }) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleWishlist = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please log in to add items to wishlist')
      return
    }
    setIsLoading(true)
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
      } else {
        await addToWishlist(product)
      }
    } catch (error) {
      toast.error('Failed to update wishlist')
    } finally {
      setIsLoading(false)
    }
  }

  const nextImage = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  // Get the current image or use a placeholder
  const productImage = product.images && product.images.length > 0 
    ? product.images[currentImageIndex] 
    : 'https://via.placeholder.com/400x300?text=No+Image'

  return (
    <Link to={`/products/${product.id}`} className="group h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3 w-full">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-48 object-contain object-center transition-transform duration-500 group-hover:scale-110 bg-white"
            />
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {product.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleWishlist}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Heart
              className={`w-6 h-6 transition-all duration-300 ${
                isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400 group-hover:text-red-400'
              }`}
            />
          </button>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition-all duration-300 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-1 group-hover:text-gray-700 transition-all duration-300">{product.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-2xl font-bold transition-all duration-300 group-hover:text-gray-900">₱{product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-all duration-300">In Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard