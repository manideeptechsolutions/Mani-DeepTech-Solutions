import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/db';
import { sendDirectWhatsAppNotification } from './lib/whatsapp';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('contacts');

    // GET /api/contacts - List all contact submissions
    if (req.method === 'GET') {
      const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
      const formatted = items.map(doc => ({
        id: doc._id.toString(),
        name: doc.name || 'Anonymous',
        phone: doc.phone || '',
        email: doc.email || '',
        service: doc.service || 'General Inquiry',
        message: doc.message || '',
        timestamp: doc.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        createdAt: doc.createdAt || new Date().toISOString()
      }));
      return res.status(200).json({ success: true, data: formatted });
    }

    // POST /api/contacts - Record contact submission
    if (req.method === 'POST') {
      const { name, phone, email, service, message } = req.body || {};

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: 'Name and Phone number are required' });
      }

      const formattedTimestamp = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const newContact = {
        name: name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        service: service || 'AI & Machine Learning Solution',
        message: (message || '').trim(),
        timestamp: formattedTimestamp,
        createdAt: new Date().toISOString()
      };

      const result = await collection.insertOne(newContact);

      // Directly send WhatsApp message to Manideep (9381088104) from server
      await sendDirectWhatsAppNotification(newContact);

      return res.status(201).json({
        success: true,
        message: 'Inquiry saved successfully and notification sent to 9381088104',
        data: {
          id: result.insertedId.toString(),
          ...newContact
        }
      });
    }

    // DELETE /api/contacts - Remove inquiry
    if (req.method === 'DELETE') {
      const id = (req.query.id as string) || req.body?.id;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Contact ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Database error' });
  }
}
