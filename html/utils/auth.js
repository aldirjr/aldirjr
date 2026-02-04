// api/utils/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

export function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function verifyRecaptcha(token) {
  if (!token) {
    return { success: false, error: 'No reCAPTCHA token provided' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`
    });

    const data = await response.json();
    
    if (data.success && data.score >= 0.5) {
      return { success: true, score: data.score };
    }
    
    return { success: false, error: 'reCAPTCHA verification failed', score: data.score };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies
  const cookies = parseCookies(req.headers.cookie || '');
  return cookies.token || null;
}

export function parseCookies(cookieHeader) {
  const cookies = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

export async function requireAuth(req) {
  const token = extractToken(req);
  
  if (!token) {
    return { authorized: false, error: 'No token provided' };
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return { authorized: false, error: 'Invalid or expired token' };
  }

  return { authorized: true, user: decoded };
}
