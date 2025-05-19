import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './assets/components/Navbar'    
import Footer from './assets/components/Footer'
import Home from './assets/pages/Home'
import Products from './assets/pages/Products'
import ProductDetails from './assets/pages/ProductDetails'
import Cart from './assets/pages/Cart'
import Checkout from './assets/pages/Checkout'
import AdminProducts from './assets/pages/AdminProducts'
import AdminOrders from './assets/pages/AdminOrders'
import CartSidebar from './assets/components/CartSidebar'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Account from './assets/pages/Account'
import NotFound from './assets/pages/NotFound'
import Wishlist from './assets/pages/Wishlist'
import Contact from './assets/pages/Contact'
import PageTransition from './assets/components/PageTransition'
import { AuthProvider } from './assets/context/AuthContext'
import { CartProvider } from './assets/context/CartContext'
import { ProductProvider } from './assets/context/ProductContext'
import { OrderProvider } from './assets/context/OrderContext'
import { WishlistProvider } from './assets/context/WishlistContext'
import { useAuth } from './assets/context/AuthContext'

//Protected route component
function ProtectedRoute({ children, requireAdmin }) {
  const { user, isAdmin, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />
  }
  
  return children
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Toaster position="top-center" />
                <Navbar onCartClick={() => setIsCartOpen(true)} />
                <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                <main className="flex-grow container mx-auto px-4 py-8">
                  <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                      <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                      <Route path="/products/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
                      <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                      <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
                      <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                      <Route 
                        path="/checkout" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><Checkout /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                      <Route 
                        path="/admin/products" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <PageTransition><AdminProducts /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/admin/orders" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <PageTransition><AdminOrders /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/account" 
                        element={
                          <ProtectedRoute>
                            <PageTransition><Account /></PageTransition>
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
              </div>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App