import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                      path="/admin/products" 
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminProducts />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin/orders" 
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminOrders />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/account" 
                      element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
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