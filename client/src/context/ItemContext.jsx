import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const ItemContext = createContext()

export function useItems() {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider')
  }
  return context
}

const API_BASE_URL = 'http://localhost:5000/api';


export function ItemProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/items`)
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
      
      setDefaultItems()
    } finally {
      setLoading(false)
    }
  }

  const setDefaultItems = () => {
    const defaultItems = [
      {
        _id: '1',
        name: 'Classic White T-Shirt',
        type: 'Shirt',
        description: 'A comfortable classic white t-shirt made from 100% cotton. Perfect for casual wear.',
        coverImage: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
        additionalImages: [
          'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        name: 'Running Shoes',
        type: 'Shoes',
        description: 'Professional running shoes with excellent grip and comfort for all terrains.',
        coverImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
        additionalImages: [
          'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        name: 'Denim Jeans',
        type: 'Pant',
        description: 'Classic blue denim jeans with a modern fit. Durable and stylish for everyday wear.',
        coverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
        additionalImages: [
          'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        createdAt: new Date().toISOString()
      }
    ]
    setItems(defaultItems)
  }

  const addItem = async (itemData) => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, itemData)
      setItems(prevItems => [...prevItems, response.data])
      return { success: true, item: response.data }
    } catch (error) {
      console.error('Error adding item:', error)
      return { success: false, error: error.response?.data?.message || error.message }
    } finally {
      setLoading(false)
    }
  }

  const sendEnquiry = async (item, userMessage = '') => {
    setLoading(true)
    try {
      const enquiryData = {
        itemId: item._id,
        itemName: item.name,
        userMessage,
        userEmail: 'user@example.com' 
      }
      
      await axios.post(`${API_BASE_URL}/enquiries`, enquiryData)
      return { success: true }
    } catch (error) {
      console.error('Error sending enquiry:', error)
      return { success: false, error: error.response?.data?.message || error.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    items,
    loading,
    addItem,
    sendEnquiry,
    fetchItems
  }

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  )
}