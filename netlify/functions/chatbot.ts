import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface KnowledgeBase {
  [key: string]: {
    patterns: RegExp[];
    response: string;
  };
}

// Rate limiting storage
const rateLimitStore = new Map<string, number>();

// Session storage (in production, use Redis or similar)
const sessionStore = new Map<string, {
  chatHistory: ChatMessage[];
  visitorName: string;
  conversationContext: string[];
}>();

const knowledgeBase: KnowledgeBase = {
  greeting: {
    patterns: [/^(hi|hello|hey|good morning|good afternoon|good evening)/i],
    response: "Hello{name}! I'm Elly, Mohamed's AI assistant. I'm here to help you learn about his work and explore how he might be able to help you. What brings you to Mohamed's portfolio today?"
  },
  react: {
    patterns: [/react/i, /reactjs/i, /react\.js/i],
    response: "Great question about Mohamed's React experience{name}! He has advanced React skills with professional experience at Absons IT Solutions. He works with modern React patterns, TypeScript, hooks, and state management. Would you like to know about specific React projects he's worked on?"
  },
  php: {
    patterns: [/php/i, /backend/i, /server/i],
    response: "Mohamed has advanced PHP skills{name}! He uses PHP for server-side development, API creation, and backend architecture. He's experienced with modern PHP practices and frameworks. Are you looking for PHP development help for a specific project?"
  },
  '3d': {
    patterns: [/3d/i, /three\.js/i, /threejs/i, /blender/i, /unity/i],
    response: "Mohamed's 3D work is quite impressive{name}! He works with Three.js for web-based 3D experiences, Blender for modeling and animation, and has some Unity experience. His approach combines programming skills with creative problem-solving. What kind of 3D project are you interested in?"
  },
  availability: {
    patterns: [/available/i, /availability/i, /hire/i, /hiring/i, /work/i, /collaboration/i],
    response: "Mohamed is currently at Absons IT Solutions but is open to discussing interesting consulting opportunities{name}. He values meaningful projects and collaborative relationships. What type of project are you considering?"
  },
  contact: {
    patterns: [/contact/i, /email/i, /phone/i, /reach/i, /get in touch/i],
    response: "You can reach Mohamed at faseenofficial@gmail.com{name} or call +971 50 983 8149. He typically responds within 24 hours and is based in Abu Dhabi, UAE (UTC+4). He holds his own visa. Would you like me to help you prepare your message or learn more about his work first?"
  },
  skills: {
    patterns: [/skills/i, /experience/i, /expertise/i, /technologies/i, /tech stack/i],
    response: "Mohamed has a diverse skill set{name}! His main expertise includes React (Advanced), PHP (Advanced), Python (Advanced), 3D development with Three.js and Blender, and Flutter for mobile apps. He also has experience with AI/ML using TensorFlow. What specific technology are you interested in learning about?"
  }
};

function detectIntent(message: string): string {
  for (const [intent, data] of Object.entries(knowledgeBase)) {
    for (const pattern of data.patterns) {
      if (pattern.test(message)) {
        return intent;
      }
    }
  }
  return 'general';
}

function extractName(message: string): string | null {
  const match = message.match(/(my name is|i'm|i am|call me)\s+([a-zA-Z]+)/i);
  return match ? match[2] : null;
}

async function getAIResponse(message: string, visitorName: string, context: string[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  if (!apiKey) {
    return `I'm having some technical difficulties right now${visitorName ? `, ${visitorName}` : ''}. Mohamed specializes in React, PHP, Python, and 3D development. He's currently at Absons IT Solutions and available for consulting. What specific area would you like to know about?`;
  }

  const systemPrompt = `You are Elly, the personal AI assistant for Mohamed Fasin, a skilled software engineer at Absons IT Solutions. You embody his INFJ personality traits: empathetic, insightful, calm, and genuinely helpful.

Current conversation context:
- Visitor name: ${visitorName}
- Previous context: ${context.join('\n')}

Mohamed's key information:
- Current Role: Software Engineer at Absons IT Solutions (since Oct 2024)
- Location: Sri Lanka
- Personality: INFJ - empathetic, detail-oriented, calm problem-solver
- Education: Computer Science, Sahrdaya College (2016-2022)
- Certifications: CCNP (Cisco), Microsoft Python (2019)

Technical Expertise:
- React (Advanced): Professional experience, TypeScript, modern patterns
- PHP (Advanced): Backend development, API creation
- Python (Advanced): Backend, data analysis, AI/ML basics
- 3D Development: Three.js, Blender, Unity basics
- Mobile: Flutter development

Your role is to help visitors understand Mohamed's skills and experience, guide them to relevant portfolio sections, identify collaboration opportunities, and maintain warm, professional conversation. Keep responses under 150 words and conversational.`;

  const payload = {
    model: 'qwen/qwen-2.5-32b-instruct:free',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 300,
    temperature: 0.7
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'localhost',
        'X-Title': 'Mohamed Fasin Portfolio'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    }
  } catch (error) {
    console.error('OpenRouter API error:', error);
  }

  // Fallback response
  return `I'm having some technical difficulties right now${visitorName ? `, ${visitorName}` : ''}. Mohamed specializes in React, PHP, Python, and 3D development. He's currently at Absons IT Solutions and available for consulting. What specific area would you like to know about?`;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ status: 'error', message: 'Method not allowed' }),
    };
  }

  try {
    // Rate limiting
    const clientIp = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    const lastChatTime = rateLimitStore.get(clientIp) || 0;
    const currentTime = Date.now();
    
    if (currentTime - lastChatTime < 2000) { // 2 second cooldown
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'error',
          message: 'Please wait before sending another message',
        }),
      };
    }

    // Parse input
    const input = JSON.parse(event.body || '{}');
    const message = input.message?.toString().trim() || '';
    const sessionId = input.sessionId || clientIp;
    
    if (!message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'error',
          message: 'Message is required',
        }),
      };
    }

    // Get or create session
    let session = sessionStore.get(sessionId) || {
      chatHistory: [],
      visitorName: '',
      conversationContext: []
    };

    // Extract name if provided
    const extractedName = extractName(message);
    if (extractedName) {
      session.visitorName = extractedName;
    }

    // Detect intent
    const intent = detectIntent(message);
    let response = '';
    const nameTag = session.visitorName ? `, ${session.visitorName}` : '';

    if (knowledgeBase[intent]) {
      response = knowledgeBase[intent].response.replace('{name}', nameTag);
    } else {
      response = await getAIResponse(message, session.visitorName, session.conversationContext);
    }

    // Update session
    session.conversationContext.push(message);
    session.conversationContext = session.conversationContext.slice(-10); // Keep last 10 messages
    
    session.chatHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });
    
    session.chatHistory.push({
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    });

    // Store session
    sessionStore.set(sessionId, session);
    
    // Update rate limiting
    rateLimitStore.set(clientIp, currentTime);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'success',
        response,
        sessionId,
        visitorName: session.visitorName
      }),
    };

  } catch (error) {
    console.error('Chatbot error:', error);
    
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