import { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export function useProducts() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    // Pocket Knives
    {
      id: 1,
      name: 'Victorinox Swiss Army Knife',
      price: 49.99,
      category: 'pocket-knives',
      description: 'Classic Swiss Army Knife with multiple tools including blade, scissors, and screwdriver.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      stock: 15
    },
    {
      id: 2,
      name: 'Benchmade Mini Griptilian',
      price: 129.99,
      category: 'pocket-knives',
      description: 'Premium folding knife with AXIS lock mechanism and high-quality steel blade.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      stock: 10
    },
    {
      id: 3,
      name: 'Spyderco Paramilitary 2',
      price: 159.99,
      category: 'pocket-knives',
      description: 'Tactical folding knife with compression lock and premium CPM-S30V steel.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      stock: 8
    },

    // Flashlights
    {
      id: 4,
      name: 'Olight Baton Pro',
      price: 89.99,
      category: 'flashlights',
      description: 'Compact rechargeable flashlight with 2000 lumens output and multiple modes.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      stock: 20
    },
    {
      id: 5,
      name: 'Fenix PD36R',
      price: 79.99,
      category: 'flashlights',
      description: 'Professional-grade flashlight with 1600 lumens and USB-C rechargeable battery.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      stock: 12
    },
    {
      id: 6,
      name: 'Streamlight ProTac',
      price: 59.99,
      category: 'flashlights',
      description: 'Tactical flashlight with 1000 lumens and multiple power modes.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      stock: 15
    },

    // Coins
    {
      id: 7,
      name: 'Challenge Coin - Military Edition',
      price: 29.99,
      category: 'coins',
      description: 'Premium military challenge coin with custom design and high-quality finish.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      stock: 25
    },
    {
      id: 8,
      name: 'Tactical Coin - Survival Edition',
      price: 39.99,
      category: 'coins',
      description: 'Multi-functional tactical coin with built-in tools and survival features.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: true,
      stock: 18
    },
    {
      id: 9,
      name: 'Collector\'s Coin Set',
      price: 99.99,
      category: 'coins',
      description: 'Limited edition set of three collector\'s coins with unique designs.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
      stock: 10
    }
  ])

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}