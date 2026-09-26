import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateAdminToken, checkRateLimit } from './lib/security';

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

  // 1. Rate Limiting Protection (Max 6 login attempts per 15 minutes per IP)
  const isAllowed = checkRateLimit(req, 6, 15 * 60 * 1000);
  if (!isAllowed) {
    return res.status(429).json({
      success: false,
      error: 'Security alert: Too many login attempts. Access temporarily restricted. Try again later.'
    });
  }

  try {
    const { email, password } = req.body || {};

    // 2. Strict Input Type Validation (Prevent NoSQL operator object injections)
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid input format.'
      });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const validEmails = [adminEmail, 'manideeptechsolutions@gmai.com', 'manideeptechsolutions@gmail.com'].filter(Boolean);
    const validPassword = (process.env.ADMIN_PASSWORD || '').trim();

    const normalizedEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    if (validPassword && validEmails.includes(normalizedEmail) && inputPassword === validPassword) {
      const token = generateAdminToken(normalizedEmail);
      return res.status(200).json({
        success: true,
        user: {
          email: normalizedEmail,
          name: 'Manideep Juvvala',
          role: 'admin'
        },
        token
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please verify email and password.'
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Authentication service encountered an error' });
  }
}
