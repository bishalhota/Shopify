import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

import Enquiry from '../models/Enquiry.js'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})


router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('itemId')
      .sort({ createdAt: -1 })
    res.json(enquiries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


router.post('/', async (req, res) => {
  try {
    const { itemId, itemName, userEmail, userMessage } = req.body

    
    const enquiry = new Enquiry({
      itemId,
      itemName,
      userEmail,
      userMessage
    })

    const savedEnquiry = await enquiry.save()

    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'admin@itemmanager.com', 
      subject: `New Enquiry for ${itemName}`,
      html: `
        <h2>New Item Enquiry</h2>
        <p><strong>Item:</strong> ${itemName}</p>
        <p><strong>User Email:</strong> ${userEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${userMessage || 'No specific message provided.'}</p>
        <p><strong>Enquiry Date:</strong> ${new Date().toLocaleString()}</p>
      `
    }

   
    try {
      await transporter.sendMail(mailOptions)
      console.log('Enquiry email sent successfully')
    } catch (emailError) {
      console.log('Email service not configured or failed:', emailError.message)
     
    }

    res.status(201).json(savedEnquiry)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }
    
    res.json(enquiry)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router;