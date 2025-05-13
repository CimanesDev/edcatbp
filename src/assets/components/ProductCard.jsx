import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

function ProductCard({ product }) {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()

  const handleWishlist = (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please log in to add items to wishlist')
      return
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Link to={`/products/${product.id}`} className="group h-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
        <div className="relative">
          <div className="aspect-w-4 aspect-h-3 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover object-center"
            />
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition"
          >
            <svg
              className={`w-6 h-6 ${
                isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
              }`}
              fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
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