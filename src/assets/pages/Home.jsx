import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import testimonial2 from '../images/2.jpg'
import testimonial3 from '../images/3.jpg'
import testimonial4 from '../images/4.jpg'
import testimonial5 from '../images/5.jpg'
import testimonial6 from '../images/6.jpg'
import testimonial7 from '../images/7.jpg'

import pocketknives from '../images/pocketknives.jpg'
import flashlights from '../images/flashlights.jpeg'
import coins from '../images/coins.jpg'
import hero from '../images/hero.jpg'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const { products } = useProducts()

  const testimonials = [
    { image: testimonial2, quote: "Ka-bar Stainless Steel Hobo All Purpose Knife" },
    { image: testimonial3, quote: "Victorinox Pioneer Nespresso Livanto Limited Edition 2017" },
    { image: testimonial4, quote: "Victorinox Deluxe Tinker" },
    { image: testimonial5, quote: "Victorinox Mechanic" },
    { image: testimonial6, quote: "Victorinox Classic SD" },
    { image: testimonial7, quote: "Leatherman - Micra" }
  ]

  const ITEMS_PER_PAGE = 3
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

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
            src={hero}
            alt="EDC Gear Collection"
            className="w-full h-full object-cover opacity-90 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Premium EDC Gear for the Modern Explorer
            </h1>
            <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-md">
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
                to="/products?sort=newest"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-xl hover:bg-white/10 transition duration-300"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Pocket Knives', id: 'pocket-knives', image: pocketknives },
            { name: 'Flashlights', id: 'flashlights', image: flashlights },
            { name: 'Coins', id: 'coins', image: coins }
          ].map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60 opacity-75 group-hover:opacity-85 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{category.name}</h3>
                  <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                    Explore Collection
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Satisfied Customers</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <div className="relative rounded-2xl overflow-hidden group">
                    <img
                      src={testimonial.image}
                      alt={`Customer testimonial ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <p className="text-sm font-medium">"{testimonial.quote}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + totalPages) % totalPages)}
              className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    currentTestimonial === idx ? 'bg-gray-900 w-4' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % totalPages)}
              className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home