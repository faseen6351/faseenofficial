// Custom types for Vercel API routes
interface ApiRequest {
  method?: string;
  headers: { [key: string]: string | string[] | undefined };
  body: any;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  end: () => void;
  setHeader: (name: string, value: string) => void;
}

interface LoginAttempt {
  timestamp: string;
  ip: string;
  userAgent: string;
  username: string;
  success: boolean;
}

// In-memory storage
const loginAttempts = new Map<string, { count: number; lockoutTime: number }>();
const sessions = new Map<string, { authenticated: boolean; timestamp: number }>();

const ADMIN_USERNAME = 'fasin_admin';
const ADMIN_PASSWORD = 'SecurePass2025!';
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 600000; // 10 minutes
const SESSION_DURATION = 3600000; // 1 hour

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function isAuthenticated(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session || !session.authenticated) return false;
  
  if (Date.now() - session.timestamp > SESSION_DURATION) {
    sessions.delete(sessionId);
    return false;
  }
  
  return true;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-ID');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const getClientIp = (header: string | string[] | undefined): string => {
    if (Array.isArray(header)) return header[0] || 'unknown';
    return header || 'unknown';
  };

  const clientIp = getClientIp(req.headers['x-forwarded-for']) || getClientIp(req.headers['x-real-ip']) || 'unknown';
  const userAgent = getClientIp(req.headers['user-agent']) || 'unknown';
  const sessionId = getClientIp(req.headers['x-session-id']) || '';

  try {
    if (req.method === 'POST') {
      // Login attempt
      const currentTime = Date.now();
      const attemptData = loginAttempts.get(clientIp) || { count: 0, lockoutTime: 0 };

      if (attemptData.lockoutTime > currentTime) {
        const remaining = Math.ceil((attemptData.lockoutTime - currentTime) / 1000);
        return res.status(423).json({
          status: 'locked',
          message: 'Account locked due to multiple failed attempts',
          remainingTime: remaining
        });
      }

      const { username, password } = req.body;

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const newSessionId = generateSessionId();
        sessions.set(newSessionId, {
          authenticated: true,
          timestamp: currentTime
        });

        loginAttempts.delete(clientIp);

        return res.status(200).json({
          status: 'success',
          message: 'Login successful',
          sessionId: newSessionId
        });
      } else {
        attemptData.count++;
        
        if (attemptData.count >= MAX_LOGIN_ATTEMPTS) {
          attemptData.lockoutTime = currentTime + LOCKOUT_DURATION;
          attemptData.count = 0;
        }
        
        loginAttempts.set(clientIp, attemptData);

        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials',
          attemptsRemaining: Math.max(0, MAX_LOGIN_ATTEMPTS - attemptData.count)
        });
      }

    } else if (req.method === 'GET') {
      if (!isAuthenticated(sessionId)) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication required'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          submissions: [],
          securityLogs: [],
          loginAttempts: Array.from(loginAttempts.entries()).map(([ip, data]) => ({ ip, ...data })),
          analytics: {
            totalSubmissions: 0,
            securityEvents: 0,
            lastLogin: new Date().toISOString()
          }
        }
      });

    } else if (req.method === 'DELETE') {
      if (sessionId && sessions.has(sessionId)) {
        sessions.delete(sessionId);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });

    } else {
      return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Admin panel error:', error);
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
    });
  }
} 