import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useState, useEffect } from 'react'
import logo from '../images/transparent.png'
import { ShoppingCart, User, Menu, X, Search, Shield, Package, ClipboardList, Heart, Mail } from 'lucide-react'

function Navbar({ onCartClick }) {
  const { user, logout, isAdmin } = useAuth()
  const { getCartCount } = useCart()
  const { wishlist } = useWishlist()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) setSearchQuery(search)
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
      console.error('Failed to logout:', error)
    }
  }

  const getFirstName = (displayName) => displayName ? displayName.split(' ')[0] : ''

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-gray-900 hover:text-gray-900">
              <img src={logo} alt="EDC atbp. Logo" className="h-16 w-auto" />
              EDC atbp.
            </Link>
            <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>
            <div className="hidden md:flex space-x-10 text-lg font-medium">
              {isAdmin ? (
                <>
                  <Link to="/admin/products" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                    <Package className="w-5 h-5" /> Products
                  </Link>
                  <Link to="/admin/orders" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                    <ClipboardList className="w-5 h-5" /> Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/products" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                    <Package className="w-5 h-5" /> Products
                  </Link>
                  <Link to="/contact" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                    <Mail className="w-5 h-5" /> Contact
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-8 md:space-x-12">
              {!isAdmin && (
                <Link to="/wishlist" className="text-gray-700 hover:text-gray-900 transition relative ml-8">
                  <Heart className="h-6 w-6" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              )}
              {!isAdmin && (
                <button type="button" onClick={onCartClick} className="relative text-gray-700 hover:text-gray-900">
                  <ShoppingCart className="h-6 w-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              )}
              {user ? (
                <div className="hidden md:flex items-center space-x-8">
                  {isAdmin && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">Admin</span>
                    </div>
                  )}
                  <Link to="/account" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
                    <User className="w-5 h-5" />
                    {getFirstName(user.displayName) || 'Account'}
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="hidden md:inline text-gray-700 hover:text-gray-900 transition">Login</Link>
              )}
              {/* Hamburger menu for mobile */}
              <button
                className="ml-4 md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Sidebar Drawer rendered outside nav for stacking context */}
      {isSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-[9999] flex flex-col p-6 animate-slide-in">
            <button
              className="self-end mb-8 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 text-lg mb-6" onClick={() => setIsSidebarOpen(false)}>
              <Package className="w-5 h-5" /> Products
            </Link>
            <Link to="/contact" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 text-lg mb-6" onClick={() => setIsSidebarOpen(false)}>
              <Mail className="w-5 h-5" /> Contact
            </Link>
            {!user ? (
              <Link to="/login" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 text-lg" onClick={() => setIsSidebarOpen(false)}>
                <User className="w-5 h-5" /> Login
              </Link>
            ) : (
              <Link to="/account" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 text-lg" onClick={() => setIsSidebarOpen(false)}>
                <User className="w-5 h-5" /> Account
              </Link>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Navbar