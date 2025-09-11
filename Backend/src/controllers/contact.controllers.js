 import nodemailer from 'nodemailer';
import Contact from '../models/contact.models.js';

export const createInquiry = async (req, res) => {
  const { patientName, mobileNo, email, message } = req.body;

  // Validate input
  if (!patientName || !mobileNo || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save inquiry to database
    const newContact = new Contact({
      patientName,
      mobileNo,
      email,
      message,
    });

    await newContact.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });

    // Email content
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // Hospital/admin email
      subject: 'New Contact Inquiry Received',
      text: `
Dear Admin,

You have received a new contact inquiry on:

Ashaali Hospital - Best Orthopedic Surgeon, Eye Care, Obstetrician And Gynecologist, Neuro-spine Brain Hospital In Lucknow

Patient Name: ${patientName}
Email: ${email}
Mobile No: ${mobileNo}
Message: ${message}

Please follow up with the patient as soon as possible.

Thank you,
Your Hospital Website
      `,
    };

    // Send email (do not crash if fails)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });

    // Respond to frontend
    res.status(201).json({
      message: 'Inquiry sent successfully!',
      contact: newContact,
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ message: 'Error creating inquiry', error });
  }
};

// Get all inquiries
export const getAllInquiry = async (req, res) => {
  try {
    const inquiries = await Contact.find();
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
};

// Delete an inquiry
export const deleteInquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ message: 'Error deleting inquiry', error });
  }
};
