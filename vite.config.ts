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
            const password = body.password || '';
            const validEmails = [ADMIN_EMAIL, 'manideeptechsolutions@gmai.com', 'manideeptechsolutions@gmail.com'].filter(Boolean);
            const validPassword = ADMIN_PASSWORD;

            if (validPassword && validEmails.includes(email) && password === validPassword) {
              return sendJson(200, {
                success: true,
                user: { email, name: 'Manideep Juvvala', role: 'admin' },
                token: 'admin-session-' + Date.now()
              });
            }
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

              const textMessage = 
                `🔔 *NEW WEBSITE INQUIRY — MANI DEEPTECH SOLUTIONS*\n\n` +
                `👤 *Name:* ${newContact.name}\n` +
                `📞 *Phone:* ${newContact.phone}\n` +
                `📧 *Email:* ${newContact.email || 'N/A'}\n` +
                `💼 *Service:* ${newContact.service}\n` +
                `📝 *Message:* ${newContact.message || 'No additional message'}\n` +
                `⏰ *Timestamp:* ${newContact.timestamp}`;

              const targetNumber = '919381088104';

              // CallMeBot direct WhatsApp dispatch
              const callMeBotKey = env.CALLMEBOT_API_KEY || process.env.CALLMEBOT_API_KEY;
              if (callMeBotKey) {
                try {
                  const cmUrl = `https://api.callmebot.com/whatsapp.php?phone=${targetNumber}&text=${encodeURIComponent(textMessage)}&apikey=${callMeBotKey}`;
                  await fetch(cmUrl);
                } catch (e: any) {
                  console.error('[WhatsApp CallMeBot Error]:', e.message);
                }
              }

              // Custom WhatsApp API / Webhook dispatch
              const whatsappUrl = env.WHATSAPP_API_URL || process.env.WHATSAPP_API_URL;
              if (whatsappUrl) {
                try {
                  await fetch(whatsappUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ to: targetNumber, from: targetNumber, message: textMessage })
                  });
                } catch (e: any) {
                  console.error('[WhatsApp Gateway Error]:', e.message);
                }
              }

              console.log(`[WhatsApp Direct Message to 9381088104]:\n${textMessage}`);

              return sendJson(201, {
                success: true,
                message: 'Inquiry saved and sent directly to Manideep (9381088104)',
                data: { id: result.insertedId.toString(), ...newContact }
              });
            }

            if (req.method === 'DELETE') {
              if (!checkAuth()) return sendJson(401, { success: false, error: 'Unauthorized: Admin authentication required' });
              const urlObj = new URL(url, 'http://localhost');
              const id = urlObj.searchParams.get('id');
              if (!id) return sendJson(400, { success: false, error: 'Contact ID is required' });
              await collection.deleteOne({ _id: new ObjectId(id) });
              return sendJson(200, { success: true, message: 'Inquiry deleted successfully' });
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
