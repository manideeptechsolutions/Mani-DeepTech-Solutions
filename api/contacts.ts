import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/db';
import { 
  verifyAdminToken, 
  sanitizeString, 
  isValidObjectId, 
  checkRateLimit 
} from './lib/security';

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

    // GET /api/contacts - List all contact submissions (PROTECTED: Admin Only)
    if (req.method === 'GET') {
      const auth = verifyAdminToken(req.headers.authorization);
      if (!auth.valid) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required to view leads' });
      }

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

    // POST /api/contacts - Record contact submission (PUBLIC with Rate Limiting & Sanitization)
    if (req.method === 'POST') {
      // Rate Limit: 10 inquiries per hour per IP
      const allowed = checkRateLimit(req, 10, 60 * 60 * 1000);
      if (!allowed) {
        return res.status(429).json({ 
          success: false, 
          error: 'Rate limit exceeded: Please wait before submitting another inquiry or reach out directly on WhatsApp.' 
        });
      }

      const { name, phone, email, service, message } = req.body || {};

      if (!name || typeof name !== 'string' || !phone || typeof phone !== 'string') {
        return res.status(400).json({ success: false, error: 'Valid Name and Phone number are required' });
      }

      const cleanName = sanitizeString(name, 100);
      const cleanPhone = sanitizeString(phone, 25);
      const cleanEmail = sanitizeString(email, 150);
      const cleanService = sanitizeString(service || 'AI & Machine Learning Solution', 100);
      const cleanMessage = sanitizeString(message, 3000);

      if (!cleanName || !cleanPhone) {
        return res.status(400).json({ success: false, error: 'Name and Phone number cannot be empty' });
      }

      const formattedTimestamp = new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const newContact = {
        name: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        service: cleanService,
        message: cleanMessage,
        timestamp: formattedTimestamp,
        createdAt: new Date().toISOString()
      };

      const result = await collection.insertOne(newContact);

      return res.status(201).json({
        success: true,
        message: 'Inquiry saved successfully and recorded in admin portal',
        data: {
          id: result.insertedId.toString(),
          ...newContact
        }
      });
    }

    // DELETE /api/contacts - Remove inquiry (PROTECTED: Admin Only)
    if (req.method === 'DELETE') {
      const auth = verifyAdminToken(req.headers.authorization);
      if (!auth.valid) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required to delete leads' });
      }

      // Check for bulk clear all option
      const isClearAll = req.query.all === 'true' || req.body?.all === true;
      if (isClearAll) {
        await collection.deleteMany({});
        return res.status(200).json({ success: true, message: 'All inquiries cleared successfully' });
      }

      const id = (req.query.id as string) || req.body?.id;
      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({ success: false, error: 'Valid 24-character Contact ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Internal database processing error' });
  }
}
