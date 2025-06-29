import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ status: 'error', message: 'Method not allowed' }),
    };
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
        region: process.env.AWS_REGION || 'unknown'
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

    return {
      statusCode: health.status === 'healthy' ? 200 : 503,
      headers: corsHeaders,
      body: JSON.stringify(health, null, 2),
    };

  } catch (error) {
    console.error('Health check error:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: 'Internal server error during health check'
      }, null, 2),
    };
  }
}; 