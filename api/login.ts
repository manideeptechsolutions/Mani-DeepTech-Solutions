import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const validEmails = [adminEmail, 'manideeptechsolutions@gmai.com', 'manideeptechsolutions@gmail.com'].filter(Boolean);
    const validPassword = process.env.ADMIN_PASSWORD;

    const normalizedEmail = (email || '').trim().toLowerCase();

    if (validPassword && validEmails.includes(normalizedEmail) && password === validPassword) {
      return res.status(200).json({
        success: true,
        user: {
          email: normalizedEmail,
          name: 'Manideep Juvvala',
          role: 'admin'
        },
        token: 'admin-session-' + Date.now()
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please verify email and password.'
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
