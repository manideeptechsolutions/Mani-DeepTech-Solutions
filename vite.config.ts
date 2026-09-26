import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { MongoClient, ObjectId } from 'mongodb'

function apiDevPlugin(env: Record<string, string>): Plugin {
  const MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI || '';
  const DB_NAME = 'manideep_deeptech';
  const ADMIN_PASSWORD = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  const ADMIN_EMAIL = (env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || '').trim().toLowerCase();

  let client: MongoClient | null = null;
  async function getDb() {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not set. Please define MONGODB_URI in your .env file or environment variables.');
    }
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
    }
    return client.db(DB_NAME);
  }
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        
        const parseJson = (): Promise<any> => {
          return new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              try { resolve(JSON.parse(body || '{}')); }
              catch { resolve({}); }
            });
          });
        };

        const sendJson = (status: number, data: any) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        const checkAuth = () => {
          const auth = req.headers['authorization'] || '';
          return typeof auth === 'string' && auth.startsWith('Bearer ') && auth.length > 10;
        };

        // 1. /api/login
        if (url.startsWith('/api/login') && req.method === 'POST') {
          try {
            const body = await parseJson();
            const email = (body.email || '').trim().toLowerCase();
            const password = (body.password || '').trim();
            const validEmails = [ADMIN_EMAIL, 'manideeptechsolutions@gmai.com', 'manideeptechsolutions@gmail.com'].filter(Boolean);
            const validPassword = ADMIN_PASSWORD;

            if (validPassword && validEmails.includes(email) && password === validPassword) {
              return sendJson(200, {
                success: true,
                user: { email, name: 'Manideep Juvvala', role: 'super_admin' },
                token: 'admin-session-' + Date.now()
              });
            }

            // Check MongoDB `admins` collection
            try {
              const db = await getDb();
              const customAdmin = await db.collection('admins').findOne({ email, password });
              if (customAdmin) {
                return sendJson(200, {
                  success: true,
                  user: { email, name: customAdmin.name || 'Admin User', role: customAdmin.role || 'admin' },
                  token: 'admin-session-' + Date.now()
                });
              }
            } catch {}

            return sendJson(401, { success: false, error: 'Invalid credentials. Please verify email and password.' });
          } catch (e: any) {
            return sendJson(500, { success: false, error: e.message });
          }
        }

        // 2. /api/blogs
        if (url.startsWith('/api/blogs')) {
          try {
            const db = await getDb();
            const collection = db.collection('insights');

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
              return sendJson(200, { success: true, data: formatted });
            }

            if (req.method === 'POST') {
              if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
              const body = await parseJson();
              if (!body.title || !body.excerpt) {
                return sendJson(400, { success: false, error: 'Title and Excerpt are required' });
              }
              const newDoc = {
                title: body.title.trim(),
                category: body.category || 'AI & ML',
                author: body.author || 'Manideep Juvvala',
                date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                imageDescription: body.imageDescription || '',
                imageUrl: body.imageUrl || '',
                excerpt: body.excerpt.trim(),
                content: Array.isArray(body.content) ? body.content : (body.content ? [body.content] : []),
                createdAt: new Date().toISOString()
              };
              const result = await collection.insertOne(newDoc);
              return sendJson(201, { success: true, data: { id: result.insertedId.toString(), ...newDoc } });
            }

            if (req.method === 'DELETE') {
              if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
              const urlObj = new URL(url, 'http://localhost');
              const id = urlObj.searchParams.get('id');
              if (!id) return sendJson(400, { success: false, error: 'Insight ID is required' });
              await collection.deleteOne({ _id: new ObjectId(id) });
              return sendJson(200, { success: true, message: 'Insight deleted successfully' });
            }
          } catch (e: any) {
            return sendJson(500, { success: false, error: e.message });
          }
        }

        // 3. /api/contacts
        if (url.startsWith('/api/contacts')) {
          try {
            const db = await getDb();
            const collection = db.collection('contacts');

            if (req.method === 'GET') {
              if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
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
              return sendJson(200, { success: true, data: formatted });
            }

            if (req.method === 'POST') {
              const body = await parseJson();
              if (!body.name || !body.phone) {
                return sendJson(400, { success: false, error: 'Name and Phone number are required' });
              }

              const formattedTimestamp = new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'medium',
                timeStyle: 'short'
              });

              const newContact = {
                name: body.name.trim(),
                phone: body.phone.trim(),
                email: (body.email || '').trim(),
                service: body.service || 'AI & Machine Learning Solution',
                message: (body.message || '').trim(),
                timestamp: formattedTimestamp,
                createdAt: new Date().toISOString()
              };

              const result = await collection.insertOne(newContact);

              return sendJson(201, {
                success: true,
                message: 'Inquiry saved and recorded in admin portal',
                data: { id: result.insertedId.toString(), ...newContact }
              });
            }

            if (req.method === 'DELETE') {
              if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
              const urlObj = new URL(url, 'http://localhost');
              const isClearAll = urlObj.searchParams.get('all') === 'true';
              if (isClearAll) {
                await collection.deleteMany({});
                return sendJson(200, { success: true, message: 'All inquiries cleared successfully' });
              }
              const id = urlObj.searchParams.get('id');
              if (!id) return sendJson(400, { success: false, error: 'Contact ID is required' });
              await collection.deleteOne({ _id: new ObjectId(id) });
              return sendJson(200, { success: true, message: 'Inquiry deleted successfully' });
            }
          } catch (e: any) {
            return sendJson(500, { success: false, error: e.message });
          }
        }

        // 4. /api/admins
        if (url.startsWith('/api/admins')) {
          if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
          try {
            const db = await getDb();
            const collection = db.collection('admins');

            if (req.method === 'GET') {
              const items = await collection.find({}).sort({ createdAt: -1 }).toArray();
              const formatted = items.map(doc => ({
                id: doc._id.toString(),
                name: doc.name || 'Admin User',
                email: doc.email || '',
                role: doc.role || 'Admin',
                createdAt: doc.createdAt || new Date().toISOString()
              }));
              return sendJson(200, { success: true, data: formatted });
            }

            if (req.method === 'POST') {
              const body = await parseJson();
              if (!body.name || !body.email || !body.password) {
                return sendJson(400, { success: false, error: 'Name, Email, and Password are required' });
              }
              const newAdmin = {
                name: body.name.trim(),
                email: body.email.trim().toLowerCase(),
                password: body.password.trim(),
                role: body.role || 'Admin',
                createdAt: new Date().toISOString()
              };
              const result = await collection.insertOne(newAdmin);
              return sendJson(201, { success: true, data: { id: result.insertedId.toString(), ...newAdmin } });
            }

            if (req.method === 'DELETE') {
              const urlObj = new URL(url, 'http://localhost');
              const id = urlObj.searchParams.get('id');
              if (!id) return sendJson(400, { success: false, error: 'Admin ID is required' });
              await collection.deleteOne({ _id: new ObjectId(id) });
              return sendJson(200, { success: true, message: 'Admin deleted successfully' });
            }
          } catch (e: any) {
            return sendJson(500, { success: false, error: e.message });
          }
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin(env)],
  };
})
