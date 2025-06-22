import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userMessage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'responded', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;