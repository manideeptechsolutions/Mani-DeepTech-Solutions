import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './lib/db';

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

    // GET /api/blogs - List all insights
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

    // POST /api/blogs - Create new insight
    if (req.method === 'POST') {
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

      if (!title || !excerpt) {
        return res.status(400).json({ success: false, error: 'Title and Excerpt are required' });
      }

      const newDoc = {
        title: title.trim(),
        category: category || 'AI & ML',
        author: author || 'Manideep Juvvala',
        date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        imageDescription: imageDescription || '',
        imageUrl: imageUrl || '',
        excerpt: excerpt.trim(),
        content: Array.isArray(content) ? content : (content ? [content] : []),
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

    // DELETE /api/blogs - Delete insight
    if (req.method === 'DELETE') {
      const id = (req.query.id as string) || req.body?.id;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Insight ID is required' });
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Insight deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || 'Database error' });
  }
}
