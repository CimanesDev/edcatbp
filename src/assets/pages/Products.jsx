import { useState } from 'react'
import { useProducts } from "../context/ProductContext"
import ProductCard from '../components/ProductCard'

function Products() {
  const { products, categories } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-tight">Products</h1>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          className={`px-5 py-2 rounded-full border font-medium transition-all ${selectedCategory === 'All' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-5 py-2 rounded-full border font-medium transition-all ${selectedCategory === category ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-xl py-20">No products found in this category.</div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default Products