import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  
  const product = products.find(p => p.id === parseInt(id))
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3)

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Gallery */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-md mb-4"
          />
          {/* Gallery thumbnails (if more images) */}
          <div className="flex gap-2 mt-2">
            <img src={product.image} alt="thumb" className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200" />
          </div>
        </div>
        <div className="space-y-6">
          <span className="px-4 py-2 bg-gray-100 text-xs font-semibold rounded-full text-gray-700 uppercase tracking-wide">{product.category}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-2">${product.price}</p>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium">{product.stock}</span>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6 text-gray-900">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map(rp => (
              <Link to={`/products/${rp.id}`} key={rp.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col items-center border border-gray-100 hover:border-gray-200">
                <img src={rp.image} alt={rp.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                <span className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-full mb-1 text-gray-700 uppercase tracking-wide">{rp.category}</span>
                <h3 className="text-base font-semibold mb-1 text-center">{rp.name}</h3>
                <span className="text-gray-900 font-bold">${rp.price}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails