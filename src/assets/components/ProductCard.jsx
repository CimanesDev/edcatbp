import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { Heart } from 'lucide-react'
import { toast } from 'react-hot-toast'

function ProductCard({ product }) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()

  const handleWishlist = (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please log in to add items to wishlist')
      return
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const productImage = product.images?.[0] || product.image

  return (
    <Link to={`/products/${product.id}`} className="group h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3 w-full">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-48 object-cover object-center"
            />
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition"
          >
            <Heart
              className={`w-6 h-6 ${
                isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-900 transition line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">In Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard