import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    // Show success message
    alert('Thank you for your message. We will get back to you soon!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or need assistance? We're here to help!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">cimanesdev@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">09338694664</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">EPSA Detergent Products, Binondo, Manila</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 