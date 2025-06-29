import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createHash } from 'crypto';

interface LoginAttempt {
  timestamp: string;
  ip: string;
  userAgent: string;
  username: string;
  success: boolean;
}

// In-memory storage (use Redis or database in production)
const loginAttempts = new Map<string, { count: number; lockoutTime: number }>();
const sessions = new Map<string, { authenticated: boolean; timestamp: number }>();

const ADMIN_USERNAME = 'fasin_admin';
const ADMIN_PASSWORD_HASH = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // SecurePass2025!
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 600000; // 10 minutes in milliseconds
const SESSION_DURATION = 3600000; // 1 hour in milliseconds

function generateSessionId(): string {
  return createHash('sha256').update(`${Date.now()}_${Math.random()}`).digest('hex');
}

function verifyPassword(password: string, hash: string): boolean {
  // Simple comparison for demo - in production, use bcrypt
  return password === 'SecurePass2025!';
}

function isAuthenticated(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session || !session.authenticated) return false;
  
  // Check if session expired
  if (Date.now() - session.timestamp > SESSION_DURATION) {
    sessions.delete(sessionId);
    return false;
  }
  
  return true;
}

function detectSecurityThreats(username: string, password: string): string | null {
  // SQL injection patterns
  const sqlPatterns = [/'/g, /OR/gi, /AND/gi, /UNION/gi, /SELECT/gi, /DROP/gi, /INSERT/gi, /DELETE/gi, /--/g, /;/g];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(username) || pattern.test(password)) {
      return 'SQL Injection Attempt';
    }
  }
  
  // Basic attack patterns
  const basicAttacks = [
    ['admin', '1'],
    ['admin', 'admin'],
    ['root', 'root'],
    ['1', '1']
  ];
  
  for (const [user, pass] of basicAttacks) {
    if (username === user && password === pass) {
      return 'Basic Attack Attempt';
    }
  }
  
  return null;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Session-ID',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  const clientIp = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
  const userAgent = event.headers['user-agent'] || 'unknown';
  const sessionId = event.headers['x-session-id'] || '';

  try {
    if (event.httpMethod === 'POST') {
      // Login attempt
      const currentTime = Date.now();
      const attemptKey = clientIp;
      const attemptData = loginAttempts.get(attemptKey) || { count: 0, lockoutTime: 0 };

      // Check if account is locked
      if (attemptData.lockoutTime > currentTime) {
        const remaining = Math.ceil((attemptData.lockoutTime - currentTime) / 1000);
        return {
          statusCode: 423,
          headers: corsHeaders,
          body: JSON.stringify({
            status: 'locked',
            message: 'Account locked due to multiple failed attempts',
            remainingTime: remaining
          }),
        };
      }

      const input = JSON.parse(event.body || '{}');
      const username = input.username?.toString().trim() || '';
      const password = input.password || '';

      // Log the attempt
      const attemptLog: LoginAttempt = {
        timestamp: new Date().toISOString(),
        ip: clientIp,
        userAgent,
        username,
        success: false
      };

      // Detect security threats
      const threat = detectSecurityThreats(username, password);
      if (threat) {
        console.log('Security threat detected:', {
          ...attemptLog,
          threat,
          severity: 'critical'
        });
        
        // Increase attempts for security violations
        attemptData.count += 2;
      }

      // Validate credentials
      if (username === ADMIN_USERNAME && verifyPassword(password, ADMIN_PASSWORD_HASH)) {
        const newSessionId = generateSessionId();
        sessions.set(newSessionId, {
          authenticated: true,
          timestamp: currentTime
        });

        // Reset attempts on successful login
        loginAttempts.delete(attemptKey);
        
        attemptLog.success = true;
        console.log('Successful admin login:', attemptLog);

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({
            status: 'success',
            message: 'Login successful',
            sessionId: newSessionId
          }),
        };
      } else {
        attemptData.count++;
        
        if (attemptData.count >= MAX_LOGIN_ATTEMPTS) {
          attemptData.lockoutTime = currentTime + LOCKOUT_DURATION;
          attemptData.count = 0;
        }
        
        loginAttempts.set(attemptKey, attemptData);
        
        console.log('Failed admin login:', attemptLog);

        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({
            status: 'error',
            message: 'Invalid credentials',
            attemptsRemaining: Math.max(0, MAX_LOGIN_ATTEMPTS - attemptData.count)
          }),
        };
      }

    } else if (event.httpMethod === 'GET') {
      // Get admin dashboard data
      if (!isAuthenticated(sessionId)) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({
            status: 'error',
            message: 'Authentication required'
          }),
        };
      }

      // Mock dashboard data (in production, fetch from database)
      const dashboardData = {
        status: 'success',
        data: {
          submissions: [],
          securityLogs: [],
          loginAttempts: Array.from(loginAttempts.entries()).map(([ip, data]) => ({
            ip,
            ...data
          })),
          analytics: {
            totalSubmissions: 0,
            securityEvents: 0,
            lastLogin: new Date().toISOString()
          }
        }
      };

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(dashboardData),
      };

    } else if (event.httpMethod === 'DELETE') {
      // Logout
      if (sessionId && sessions.has(sessionId)) {
        sessions.delete(sessionId);
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'success',
          message: 'Logged out successfully'
        }),
      };

    } else {
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ status: 'error', message: 'Method not allowed' }),
      };
    }

  } catch (error) {
    console.error('Admin panel error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'error',
        message: 'Internal server error. Please try again later.',
      }),
    };
  }
}; 