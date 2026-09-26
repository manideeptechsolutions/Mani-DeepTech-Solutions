import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/db';
import { 
  verifyAdminToken, 
  sanitizeString, 
  isValidObjectId 
} from './lib/security';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // All Admin Management routes require valid Bearer token
  const auth = verifyAdminToken(req.headers.authorization);
  if (!auth.valid) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Admin authentication required to manage admin accounts' 
    });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('admins');

    // GET /api/admins - List all custom admins
    if (req.method === 'GET') {
      const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
      const formatted = items.map(doc => ({
        id: doc._id.toString(),
        name: doc.name || 'Admin User',
        email: doc.email || '',
        role: doc.role || 'Admin',
        createdAt: doc.createdAt || new Date().toISOString()
      }));

      return res.status(200).json({ 
        success: true, 
        data: formatted 
      });
    }

    // POST /api/admins - Create a new admin
    if (req.method === 'POST') {
      const { name, email, password, role } = req.body || {};

      if (!name || typeof name !== 'string' || !email || typeof email !== 'string' || !password || typeof password !== 'string') {
        return res.status(400).json({ 
          success: false, 
          error: 'Name, Email, and Password are required' 
        });
      }

      const cleanName = sanitizeString(name, 100);
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      const cleanRole = sanitizeString(role || 'Admin', 50);

      if (!cleanName || !cleanEmail || !cleanPassword) {
        return res.status(400).json({ 
          success: false, 
          error: 'Fields cannot be blank' 
        });
      }

      // Check for duplicate email
      const existing = await collection.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({ 
          success: false, 
          error: 'An administrator with this email already exists' 
        });
      }

      const newAdmin = {
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        role: cleanRole,
        createdAt: new Date().toISOString()
      };

      const result = await collection.insertOne(newAdmin);

      return res.status(201).json({
        success: true,
        message: 'New administrator created successfully',
        data: {
          id: result.insertedId.toString(),
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
          createdAt: newAdmin.createdAt
        }
      });
    }

    // DELETE /api/admins - Revoke an admin
    if (req.method === 'DELETE') {
      const id = (req.query.id as string) || req.body?.id;
      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Valid 24-character Admin ID is required' 
        });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ 
        success: true, 
        message: 'Admin access revoked successfully' 
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ 
      success: false, 
      error: 'Internal admin management database error' 
    });
  }
}
