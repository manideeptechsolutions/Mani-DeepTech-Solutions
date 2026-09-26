import crypto from 'crypto';
import type { VercelRequest } from '@vercel/node';

const SECRET_SALT = process.env.ADMIN_PASSWORD || 'mdt_deeptech_secure_signature_salt_2026';

/**
 * Strips MongoDB operator keys ($gt, $ne, $where, etc.) and dot notation
 * to prevent NoSQL query injection
 */
export function sanitizeNoSql<T>(input: T): T {
  if (typeof input !== 'object' || input === null) {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(item => sanitizeNoSql(item)) as unknown as T;
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    // Block any MongoDB query operator or dot notation
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }
    sanitized[key] = sanitizeNoSql(value);
  }
  return sanitized as T;
}

/**
 * Validates and sanitizes a string input, stripping dangerous HTML/script injection
 */
export function sanitizeString(val: any, maxLength = 2500): string {
  if (typeof val !== 'string') return '';
  return val
    .trim()
    .slice(0, maxLength)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\0/g, '');
}

/**
 * Strict 24-character hexadecimal MongoDB ObjectId validator
 */
export function isValidObjectId(id: any): boolean {
  return typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Cryptographically signs an admin session token (HMAC-SHA256)
 */
export function generateAdminToken(email: string): string {
  const payload = JSON.stringify({
    email,
    role: 'admin',
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24-hour expiration
  });

  const b64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_SALT).update(b64Payload).digest('base64url');
  return `${b64Payload}.${signature}`;
}

/**
 * Verifies the cryptographically signed admin session token
 */
export function verifyAdminToken(tokenOrHeader: string | undefined): { valid: boolean; email?: string } {
  if (!tokenOrHeader || typeof tokenOrHeader !== 'string') return { valid: false };

  const token = tokenOrHeader.replace(/^Bearer\s+/i, '').trim();
  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [b64Payload, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SECRET_SALT).update(b64Payload).digest('base64url');

  if (signature !== expectedSignature) return { valid: false };

  try {
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return { valid: false };
    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}

/**
 * In-memory sliding-window IP rate limiter
 */
const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(req: VercelRequest, maxRequests: number, windowMs: number): boolean {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress) || '127.0.0.1';

  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitCache.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}
