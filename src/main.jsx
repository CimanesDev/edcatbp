import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './assets/context/ProductContext'
import { CartProvider } from './assets/context/CartContext'
import { AuthProvider } from './assets/context/AuthContext'
import { WishlistProvider } from './assets/context/WishlistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)