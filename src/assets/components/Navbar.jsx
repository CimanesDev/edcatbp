import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const { cartItems, setIsCartOpen } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-gray-900 hover:text-gray-900">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            EDC atbp.
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            <Link to="/products" className="text-gray-700 hover:text-gray-900 transition">Products</Link>
            {/* Optionally add more links here */}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-gray-900 transition">Admin</Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={logout}
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
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full hover:bg-gray-100 transition group"
              aria-label="Open cart"
            >
              <svg
                className="w-7 h-7 text-gray-700 group-hover:text-gray-900 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center border-2 border-white shadow">{cartItems.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar