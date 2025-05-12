import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './assets/components/Navbar'    
import Home from './assets/pages/Home'
import Products from './assets/pages/Products'
import ProductDetails from './assets/pages/ProductDetails'
import Cart from './assets/pages/Cart'
import Checkout from './assets/pages/Checkout'
import AdminDashboard from './assets/pages/AdminDashboard'
import CartSidebar from './assets/components/CartSidebar'
import Login from './assets/pages/Login'
import { useAuth } from './assets/context/AuthContext'

//Protected route component
function ProtectedRoute({ children, requireAdmin }) {
  const { user, isAdmin } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />
  }
  
  return children
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-white py-10 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 justify-center mb-2 md:mb-0">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="font-semibold text-gray-700">EDC atbp.</span>
          </div>
          <div className="flex gap-6 justify-center">
            <a href="#" className="hover:text-gray-900 transition">About</a>
            <a href="#" className="hover:text-gray-900 transition">Contact</a>
            <a href="#" className="hover:text-gray-900 transition">Privacy</a>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="#" aria-label="Twitter" className="hover:text-gray-900 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg></a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-900 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.75 2.25a5.25 5.25 0 1 1-5.25 5.25A5.25 5.25 0 0 1 11.5 5.75zm0 1.5a3.75 3.75 0 1 0 3.75 3.75A3.75 3.75 0 0 0 11.5 7.25zm6.25.5a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 7.75z" /></svg></a>
            <a href="#" aria-label="Facebook" className="hover:text-gray-900 transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 2h-11A4.5 4.5 0 0 0 2 6.5v11A4.5 4.5 0 0 0 6.5 22h5.5v-7h-2v-2h2v-1.5c0-2.07 1.23-3.21 3.12-3.21.9 0 1.84.16 1.84.16v2h-1.04c-1.03 0-1.35.64-1.35 1.3V13h2.3l-.37 2h-1.93v7h3.5A4.5 4.5 0 0 0 22 17.5v-11A4.5 4.5 0 0 0 17.5 2z" /></svg></a>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} EDC atbp. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default App