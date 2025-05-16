import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const { products } = useProducts()

  // Get featured products from actual product list
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 3)

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [featuredProducts.length])

  const handleWishlist = (product) => {
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
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="EDC Gear Collection"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Premium EDC Gear for the Modern Explorer
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover our curated collection of high-quality everyday carry essentials. From tactical gear to survival tools, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/products?category=featured"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-xl hover:bg-white/10 transition duration-300"
              >
                Featured Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0 px-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Pocket Knives', id: 'pocket-knives' },
            { name: 'Flashlights', id: 'flashlights' },
            { name: 'Coins', id: 'coins' }
          ].map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative h-64 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 group-hover:opacity-70 transition"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home