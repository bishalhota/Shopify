import { useState } from 'react'
import { useItems } from '../context/ItemContext'
import SuccessMessage from '../components/SuccessMessage'

function AddItems() {
  const { addItem, loading } = useItems()
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: ['']
  })

  const itemTypes = ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.additionalImages]
    newImages[index] = value
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }))
  }

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }))
  }

  const removeImageField = (index) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // validation
    if (!formData.name || !formData.type || !formData.description || !formData.coverImage) {
      alert('Please fill in all required fields')
      return
    }


    const filteredImages = formData.additionalImages.filter(img => img.trim() !== '')
    
    const itemData = {
      ...formData,
      additionalImages: filteredImages.length > 0 ? filteredImages : [formData.coverImage]
    }

    const result = await addItem(itemData)
    
    if (result.success) {
      setShowSuccess(true)
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: ['']
      })
      
     
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } else {
      alert('Error adding item: ' + result.error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Add New Item</h1>
        <p className="text-gray-600 text-lg">Fill in the details below to add a new item to your collection.</p>
      </div>

      {showSuccess && (
        <SuccessMessage message="Item successfully added!" />
      )}

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter item name"
              required
            />
          </div>

          {/* item type*/}
          <div>
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-3">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select item type</option>
              {itemTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* item desc */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
              Item Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="input-field resize-none"
              placeholder="Describe your item in detail"
              required
            />
          </div>

          {/* coverimg */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700 mb-3">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="input-field"
              placeholder="https://example.com/image.jpg"
              required
            />
            {formData.coverImage && (
              <div className="mt-4">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          {/* extraimgss */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Additional Images
            </label>
            <div className="space-y-4">
              {formData.additionalImages.map((image, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.additionalImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add another image
              </button>
            </div>
          </div>

          {/* submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary text-lg py-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Item...
                </div>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItems