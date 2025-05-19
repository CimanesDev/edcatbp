import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductContext'
import { X, Frown } from 'lucide-react'

function Products() {
  const [searchParams] = useSearchParams()
  const { products } = useProducts()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const PRODUCTS_PER_PAGE = 9

  // Categories should match admin product form
  const categories = [
    { id: 'pocket-knives', name: 'Pocket Knives' },
    { id: 'flashlights', name: 'Flashlights' },
    { id: 'coins', name: 'Coins' }
  ]

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    if (category) {
      setSelectedCategories([category])
    }
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      default:
        return 0
    }
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const removeSearchFilter = () => {
    setSearchQuery('')
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('search')
    window.history.replaceState(null, '', `?${newParams.toString()}`)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategories, priceRange, sortBy, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <label htmlFor={category.id} className="ml-2 text-gray-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Min"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId)
                  return (
                    <button
                      key={categoryId}
                      onClick={() => toggleCategory(categoryId)}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                      {category.name}
                      <X className="w-4 h-4 ml-1" />
                    </button>
                  )
                })}
                {searchQuery && (
                  <button
                    onClick={removeSearchFilter}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    Search: {searchQuery}
                    <X className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedProducts.length} Products
            </h2>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx + 1}
                        onClick={() => handlePageChange(idx + 1)}
                        className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                          currentPage === idx + 1
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products