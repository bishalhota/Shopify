import express from 'express'
const router = express.Router()
import Item from '../models/Item.js'


// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new item
router.post('/', async (req, res) => {
  try {
    const { name, type, description, coverImage, additionalImages } = req.body

   
    if (!name || !type || !description || !coverImage) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }

    const item = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages: additionalImages || [coverImage]
    })

    const savedItem = await item.save()
    res.status(201).json(savedItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    
    res.json(item)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    
    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router