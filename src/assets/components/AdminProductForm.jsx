import { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'
import { Loader2, X } from 'lucide-react'

function AdminProductForm({ product, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [''],
    stock: '',
    isFeatured: false
  })

  const categories = [
    { id: 'pocket-knives', name: 'Pocket Knives' },
    { id: 'flashlights', name: 'Flashlights' },
    { id: 'coins', name: 'Coins' }
  ]

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        images: product.images || [''],
        stock: product.stock || '',
        isFeatured: product.isFeatured || false
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images.filter(Boolean), imageUrl]
    }))
  }

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      images: formData.images.filter(Boolean)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
            placeholder="Enter stock quantity"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
        <div className="space-y-4">
          <ImageUpload onImageUpload={handleImageUpload} />
          {formData.images.filter(Boolean).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.images.filter(Boolean).map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
          className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded transition-all duration-200"
        />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">Featured Product</label>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {product ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            product ? 'Update Product' : 'Add Product'
          )}
        </button>
      </div>
    </form>
  )
}

export default AdminProductForm 