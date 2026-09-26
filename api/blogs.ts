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

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('insights');

    // GET /api/blogs - List all insights (PUBLIC for website visitors)
    if (req.method === 'GET') {
      const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
      const formatted = items.map(doc => ({
        id: doc._id.toString(),
        title: doc.title,
        category: doc.category || 'AI & ML',
        author: doc.author || 'Manideep Juvvala',
        date: doc.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        imageDescription: doc.imageDescription || '',
        imageUrl: doc.imageUrl || '',
        excerpt: doc.excerpt || '',
        content: Array.isArray(doc.content) ? doc.content : [doc.content || ''],
        createdAt: doc.createdAt || new Date().toISOString()
      }));
      return res.status(200).json({ success: true, data: formatted });
    }

    // POST /api/blogs - Create new insight (PROTECTED: Admin Only)
    if (req.method === 'POST') {
      const auth = verifyAdminToken(req.headers.authorization);
      if (!auth.valid) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required to publish insights' });
      }

      const { 
        title, 
        category, 
        author, 
        date, 
        imageDescription, 
        imageUrl, 
        excerpt, 
        content 
      } = req.body || {};

      if (!title || typeof title !== 'string' || !excerpt || typeof excerpt !== 'string') {
        return res.status(400).json({ success: false, error: 'Valid Title and Excerpt are required' });
      }

      const cleanTitle = sanitizeString(title, 200);
      const cleanExcerpt = sanitizeString(excerpt, 500);
      const cleanCategory = sanitizeString(category || 'AI & ML', 50);
      const cleanAuthor = sanitizeString(author || 'Manideep Juvvala', 100);
      const cleanDate = sanitizeString(date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 50);
      const cleanImageDesc = sanitizeString(imageDescription || '', 500);
      const cleanImageUrl = typeof imageUrl === 'string' && (
        imageUrl.startsWith('http://') || 
        imageUrl.startsWith('https://') || 
        imageUrl.startsWith('/') || 
        imageUrl.startsWith('data:image/')
      ) ? imageUrl.trim().slice(0, 3000000) : '';

      const rawContent = Array.isArray(content) ? content : (content ? [content] : []);
      const cleanContent = rawContent.map((item: any) => sanitizeString(String(item), 5000)).filter((p: string) => p.length > 0);

      const newDoc = {
        title: cleanTitle,
        category: cleanCategory,
        author: cleanAuthor,
        date: cleanDate,
        imageDescription: cleanImageDesc,
        imageUrl: cleanImageUrl,
        excerpt: cleanExcerpt,
        content: cleanContent,
        createdAt: new Date().toISOString()
      };

      const result = await collection.insertOne(newDoc);
      return res.status(201).json({
        success: true,
        data: {
          id: result.insertedId.toString(),
          ...newDoc
        }
      });
    }

    // DELETE /api/blogs - Delete insight (PROTECTED: Admin Only)
    if (req.method === 'DELETE') {
      const auth = verifyAdminToken(req.headers.authorization);
      if (!auth.valid) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required to delete insights' });
      }

      const id = (req.query.id as string) || req.body?.id;
      if (!id || !isValidObjectId(id)) {
        return res.status(400).json({ success: false, error: 'Valid 24-character Insight ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Insight deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Internal database processing error' });
  }
}
