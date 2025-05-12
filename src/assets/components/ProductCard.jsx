import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [wishlist, setWishlist] = useState(false)
  // Mock rating for demo
  const getRating = () => 4 + (product.id % 2 ? 0.5 : 0)

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden flex flex-col group border border-gray-100 hover:border-gray-200">
      {/* Wishlist Heart */}
      <button
        onClick={() => setWishlist(w => !w)}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow transition ${wishlist ? 'text-pink-500' : 'text-gray-400'}`}
        aria-label="Add to wishlist"
      >
        <svg className="w-6 h-6" fill={wishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" /></svg>
      </button>
      {/* Quick View Overlay */}
      <Link to={`/products/${product.id}`} className="block relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition flex items-center justify-center z-10">
          <span className="bg-white/90 text-gray-900 px-6 py-2 rounded-full font-semibold shadow-lg text-lg opacity-90 group-hover:scale-105 transition-transform">Quick View</span>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <span className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full mb-2 text-gray-700 uppercase tracking-wide self-start">{product.category}</span>
        <h3 className="text-lg font-semibold mb-1 text-gray-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className={`w-4 h-4 ${getRating() >= i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 0 0 .95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 0 0-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 0 0-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 0 0-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 0 0 .95-.69l1.286-3.967z" /></svg>
          ))}
          <span className="ml-2 text-xs text-gray-500">{getRating().toFixed(1)}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="ml-2 px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard