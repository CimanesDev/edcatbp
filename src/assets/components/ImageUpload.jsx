import { useState } from 'react'

function ImageUpload({ onImageUpload }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()
      if (data.secure_url) {
        onImageUpload(data.secure_url)
      } else {
        throw new Error('Upload failed')
      }
    } catch (err) {
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
            ) : (
              <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
              </>
            )}
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default ImageUpload 