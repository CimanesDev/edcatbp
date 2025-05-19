import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Heart className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Save items you like by clicking the heart icon on any product.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeFromWishlist(product.id)
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 text-pink-500 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">₱{product.price.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product)
                    }}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist 