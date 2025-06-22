import { useState } from 'react'
import { useItems } from '../context/ItemContext'
import ItemModal from '../components/ItemModal'

function ViewItems() {
  const { items, loading } = useItems()
  const [selectedItem, setSelectedItem] = useState(null)

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">View Items</h1>
        <p className="text-gray-600 text-lg">Browse through all your items in the collection.</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="mx-auto h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mb-3">No items found</h3>
          <p className="text-gray-500 text-lg">Get started by adding your first item.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="card p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              onClick={() => openModal(item)}
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-lg">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default ViewItems