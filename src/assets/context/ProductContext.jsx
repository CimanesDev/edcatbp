import { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

const categories = [
  "Knives",
  "Cutlery",
  "Watches",
  "Travel Gear",
  "Fragrances",
  "Bestsellers"
];

// Mock data
const initialProducts = [
  {
    id: 1,
    name: "Benchmade Bugout",
    price: 149.99,
    description: "Lightweight everyday carry knife with premium materials.",
    image: "https://placehold.co/400x300",
    stock: 10,
    category: "Knives"
  },
  {
    id: 2,
    name: "Spyderco Para 3",
    price: 129.99,
    description: "Compact folding knife with excellent ergonomics.",
    image: "https://placehold.co/400x300",
    stock: 15,
    category: "Bestsellers"
  },
  // Add more mock products as needed, each with a category
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}