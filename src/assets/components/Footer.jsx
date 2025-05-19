import { Link } from 'react-router-dom'
import logo from '../images/transparentwhite.png'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-white hover:text-white">
              <img src={logo} alt="EDC atbp. Logo" className="h-16 w-auto" />
              EDC atbp.
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Your one-stop shop for premium everyday carry essentials. Quality gear for the modern explorer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: cimanesdev@gmail.com</li>
              <li>Phone: 09338694664</li>
              <li>Address: EPSA Detergent Products, Binondo, Manila</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EDC atbp. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="/contact" className="text-gray-400 hover:text-white transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 