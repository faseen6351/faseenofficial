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

// Rate limiting and session storage
const rateLimitStore = new Map<string, number>();
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
    return `I'm having some technical difficulties right now${visitorName ? `, ${visitorName}` : ''}. Mohamed specializes in React, PHP, Python, and 3D development. What specific area would you like to know about?`;
  }

  const systemPrompt = `You are Elly, Mohamed Fasin's AI assistant. Help visitors understand his skills and experience. Keep responses under 150 words.

Mohamed's expertise:
- React (Advanced): Professional experience, TypeScript
- PHP (Advanced): Backend development, API creation
- Python (Advanced): Backend, data analysis, AI/ML
- 3D Development: Three.js, Blender
- Mobile: Flutter development

Current Role: Software Engineer at Absons IT Solutions
Location: Abu Dhabi, UAE (Own Visa Holder)
Origin: Kerala, Thrissur, India
Contact: faseenofficial@gmail.com | +971 50 983 8149`;

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

  return `I'm having some technical difficulties right now${visitorName ? `, ${visitorName}` : ''}. Mohamed specializes in React, PHP, Python, and 3D development. What specific area would you like to know about?`;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const getClientIp = (header: string | string[] | undefined): string => {
      if (Array.isArray(header)) return header[0] || 'unknown';
      return header || 'unknown';
    };
    const clientIp = getClientIp(req.headers['x-forwarded-for']) || getClientIp(req.headers['x-real-ip']) || 'unknown';
    const lastChatTime = rateLimitStore.get(clientIp) || 0;
    const currentTime = Date.now();
    
    if (currentTime - lastChatTime < 2000) {
      return res.status(429).json({
        status: 'error',
        message: 'Please wait before sending another message',
      });
    }

    const { message, sessionId = clientIp } = req.body;
    
    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: 'Message is required',
      });
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

    // Detect intent and generate response
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
    session.conversationContext = session.conversationContext.slice(-10);
    
    session.chatHistory.push(
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: response, timestamp: new Date().toISOString() }
    );

    sessionStore.set(sessionId, session);
    rateLimitStore.set(clientIp, currentTime);

    return res.status(200).json({
      status: 'success',
      response,
      sessionId,
      visitorName: session.visitorName
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
    });
  }
} 