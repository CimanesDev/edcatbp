import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  )
}

export default NotFound 