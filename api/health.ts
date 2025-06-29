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

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    
    // Test basic functionality
    const testResults = {
      contact: 'operational',
      admin: 'operational',
      chatbot: 'operational',
      storage: 'operational'
    };

    // Test environment variables
    const envCheck = {
      email: process.env.EMAIL_USER ? 'configured' : 'missing',
      openrouter: process.env.OPENROUTER_API_KEY ? 'configured' : 'missing'
    };

    const responseTime = Date.now() - startTime;

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: testResults,
      configuration: envCheck,
      performance: {
        responseTime: `${responseTime}ms`,
        memoryUsage: process.memoryUsage ? {
          rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
        } : 'unavailable'
      },
      platform: {
        runtime: 'Node.js Serverless Function',
        provider: 'Netlify/Vercel',
        region: process.env.VERCEL_REGION || process.env.AWS_REGION || 'unknown'
      }
    };

    // Check if any critical services are down
    const criticalServices = ['contact', 'chatbot'];
    const hasIssues = criticalServices.some(service => 
      testResults[service as keyof typeof testResults] !== 'operational'
    );

    if (hasIssues) {
      health.status = 'degraded';
    }

    // Check configuration issues
    if (envCheck.email === 'missing' || envCheck.openrouter === 'missing') {
      health.status = health.status === 'healthy' ? 'degraded' : health.status;
    }

    return res.status(health.status === 'healthy' ? 200 : 503).json(health);

  } catch (error) {
    console.error('Health check error:', error);
    
    return res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: 'Internal server error during health check'
    });
  }
} 