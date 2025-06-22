import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Accessories', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }]
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema);
export default Item;