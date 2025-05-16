import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useState, useEffect } from 'react'
import logo from '../images/transparent.png'
import { ShoppingCart, User, Menu, X, Search, Shield, Package, ClipboardList } from 'lucide-react'

function Navbar({ onCartClick }) {
  const { user, logout, isAdmin } = useAuth()
  const { getCartCount } = useCart()
  const { wishlist } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  // Helper to get first name
  const getFirstName = (displayName) => displayName ? displayName.split(' ')[0] : ''

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-gray-900 hover:text-gray-900">
            <img src={logo} alt="EDC atbp. Logo" className="h-16 w-auto" />
            EDC atbp.
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            {isAdmin ? (
              <>
                <Link 
                  to="/admin/products" 
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                >
                  <Package className="w-5 h-5" />
                  Products
                </Link>
                <Link 
                  to="/admin/orders" 
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                >
                  <ClipboardList className="w-5 h-5" />
                  Orders
                </Link>
              </>
            ) : (
              <>
                <Link to="/products" className="text-gray-700 hover:text-gray-900 transition">
                  Products
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 transition relative">
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition">
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin</span>
                  </div>
                )}
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                >
                  <User className="w-5 h-5" />
                  {getFirstName(user.displayName) || 'Account'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                Login
              </Link>
            )}
            {!isAdmin && (
              <button
                type="button"
                onClick={onCartClick}
                className="relative text-gray-700 hover:text-gray-900"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAdmin ? (
            <>
              <Link
                to="/admin/products"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-5 h-5" />
                Products
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardList className="w-5 h-5" />
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/wishlist"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </>
          )}
          {user ? (
            <>
              {isAdmin && (
                <div className="flex items-center gap-1 px-3 py-2 text-blue-600">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Admin</span>
                </div>
              )}
              <Link
                to="/account"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                {getFirstName(user.displayName) || 'Account'}
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar