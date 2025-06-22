import { useState, useRef, useEffect } from 'react'
import { useItems } from '../context/ItemContext'
import ImageCarousel from './ImageCarousel'

function ItemModal({ item, onClose }) {
  const { sendEnquiry, loading } = useItems()
  const [enquiryMessage, setEnquiryMessage] = useState('')
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)

   const [isHambergerClicked,setIsHambergerClicked] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef()

  const handleEnquiry = async () => {
    const result = await sendEnquiry(item, enquiryMessage)

    if (result.success) {
      alert('Enquiry sent successfully! We will get back to you soon.')
      setShowEnquiryForm(false)
      setEnquiryMessage('')
      onClose()
    } else {
      alert('Error sending enquiry: ' + result.error)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleHamberger =() =>{
    setIsHambergerClicked(!isHambergerClicked)
  }

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMobileMenu])

  return (
    <>
      {/* Hamburger for mobile */}
      {!isHambergerClicked && (
        <div className="md:hidden p-4 fixed top-0 left-0 z-50">
        <button
          onClick={handleHamberger}
          className="text-gray-600 bg-white shadow-md p-2 rounded"
        >
          ☰
        </button>
      </div>
      )}

      {/* Mobile sidebar menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex md:hidden">
          <div
            ref={mobileMenuRef}
            className="w-64 h-full bg-white p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button onClick={() => setShowMobileMenu(false)} className="text-xl text-gray-500">✕</button>
              </div>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={onClose}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Close Item View
                  </button>
                </li>
                <li>
                  <a href="/view-items" className="text-gray-700 hover:text-blue-600 font-medium">
                    View Items
                  </a>
                </li>
                <li>
                  <a href="/add-items" className="text-gray-700 hover:text-blue-600 font-medium">
                    Add Item
                  </a>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-400 text-center mt-auto">Item Manager v1.0</p>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[999] backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">{item.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Carousel */}
              <div>
                <ImageCarousel images={item.additionalImages} />
              </div>

              {/* Details */}
              <div>
                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  {item.description}
                </p>

                {item.createdAt && (
                  <p className="text-sm text-gray-500 mb-8">
                    Added on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                )}

                {/* Enquiry Section */}
                {!showEnquiryForm ? (
                  <button
                    onClick={() => setShowEnquiryForm(true)}
                    className="btn-primary w-full text-lg py-4"
                  >
                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enquire
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Your Message (Optional)
                      </label>
                      <textarea
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Any specific questions about this item?"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleEnquiry}
                        disabled={loading}
                        className={`btn-primary flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          'Send Enquiry'
                        )}
                      </button>
                      <button
                        onClick={() => setShowEnquiryForm(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemModal
