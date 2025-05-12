import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useState } from 'react'

function Home() {
  const { products, categories } = useProducts()
  const featuredProducts = products.slice(0, 3)
  const [wishlist, setWishlist] = useState([])

  // Example images for categories (replace with real ones if available)
  const categoryImages = {
    "Knives": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "Cutlery": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    "Watches": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    "Travel Gear": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "Fragrances": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    "Bestsellers": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  }

  // Mock rating for demo
  const getRating = (id) => 4 + (id % 2 ? 0.5 : 0)

  // Wishlist toggle
  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id])
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-gray-200/80 via-white/90 to-transparent" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-200 via-purple-100 to-transparent rounded-full blur-3xl opacity-40 z-0" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-pink-100 via-yellow-100 to-transparent rounded-full blur-3xl opacity-40 z-0" />
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 drop-shadow-lg animate-fade-in">EDC atbp.</h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in delay-100">Your one-stop shop for premium everyday carry knives and accessories. Discover quality, style, and utility in every product.</p>
          <Link to="/products" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-700 transition animate-fade-in delay-200">Shop Now</Link>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Our Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map(category => (
            <Link
              to={`/products?category=${encodeURIComponent(category)}`}
              key={category}
              className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white"
            >
              <img
                src={categoryImages[category]}
                alt={category}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <span className="absolute bottom-4 left-4 text-2xl font-bold text-white drop-shadow-lg uppercase tracking-wide group-hover:scale-105 group-hover:translate-y-[-4px] transition-transform">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map(product => (
            <div key={product.id} className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col items-center group border border-gray-100 hover:border-gray-200">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow transition ${wishlist.includes(product.id) ? 'text-pink-500' : 'text-gray-400'}`}
                aria-label="Add to wishlist"
              >
                <svg className="w-6 h-6" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" /></svg>
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <span className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full mb-2 text-gray-700 uppercase tracking-wide">{product.category}</span>
              <h3 className="text-lg font-semibold mb-1 text-center">{product.name}</h3>
              <div className="flex items-center mb-2">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-4 h-4 ${getRating(product.id) >= i ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 0 0 .95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 0 0-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 0 0-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 0 0-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 0 0 .95-.69l1.286-3.967z" /></svg>
                ))}
                <span className="ml-2 text-xs text-gray-500">{getRating(product.id).toFixed(1)}</span>
              </div>
              <p className="text-gray-600 mb-4 text-center">${product.price}</p>
              <Link
                to={`/products/${product.id}`}
                className="mt-auto block text-center bg-gray-900 text-white py-2 px-6 rounded-full font-medium hover:bg-gray-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home