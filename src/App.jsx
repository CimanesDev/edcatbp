import { Routes, Route, Navigate } from 'react-router-dom'
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
import Account from './assets/pages/Account'
import NotFound from './assets/pages/NotFound'
import Wishlist from './assets/pages/Wishlist'
import Contact from './assets/pages/Contact'
import { useAuth } from './assets/context/AuthContext'
import { OrderProvider } from './assets/context/OrderContext'

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
    <OrderProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <CartSidebar />
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
  )
}

export default App