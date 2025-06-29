import axios from 'axios';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSession {
  visitorName?: string;
  conversationContext: string[];
  detectedIntent?: string;
  leadQualification: {
    projectType?: string;
    budget?: string;
    timeline?: string;
    company?: string;
    role?: string;
  };
}

interface ChatRequest {
  message: string;
  conversationHistory: Message[];
  session: ChatSession;
}

interface ChatResponse {
  message: string;
  updatedSession: ChatSession;
  suggestions?: string[];
}

class ChatbotService {
  private readonly apiKey = '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';
  private readonly baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
  
  // Knowledge base for instant responses
  private knowledgeBase = {
    // Personal Information
    personal: {
      name: 'Mohamed Fasin',
      role: 'Software Engineer at Absons IT Solutions',
      startDate: 'October 1, 2024',
      location: 'Sri Lanka',
      personality: 'INFJ - Empathetic, insightful, calm, and genuinely helpful',
      education: 'Computer Science, Sahrdaya College of Engineering (2016-2022)',
      certifications: ['CCNP (Cisco)', 'Microsoft Python (2019)'],
      email: 'faseenofficial@gmail.com',
      availability: 'Available for consulting and collaboration',
      responseTime: 'Within 24 hours'
    },
    
    // Technical Skills
    skills: {
      frontend: {
        react: {
          level: 'Advanced',
          experience: 'Professional experience at Absons IT Solutions',
          description: 'Modern React with TypeScript, hooks, state management, performance optimization'
        },
        typescript: {
          level: 'Advanced',
          description: 'Type-safe development with advanced patterns'
        },
        javascript: {
          level: 'Expert',
          description: 'ES6+, modern JavaScript patterns and best practices'
        }
      },
      backend: {
        php: {
          level: 'Advanced',
          description: 'Server-side development, API creation, and backend architecture'
        },
        python: {
          level: 'Advanced',
          description: 'Backend development, data analysis, and AI/ML applications'
        },
        nodejs: {
          level: 'Intermediate',
          description: 'Server-side JavaScript development and API creation'
        }
      },
      mobile: {
        flutter: {
          level: 'Intermediate',
          description: 'Cross-platform mobile application development'
        }
      },
      '3d': {
        threejs: {
          level: 'Intermediate',
          description: '3D graphics and interactive web experiences'
        },
        blender: {
          level: 'Intermediate',
          description: '3D modeling and animation'
        },
        unity: {
          level: 'Beginner',
          description: 'Game development and interactive experiences'
        }
      },
      ai: {
        tensorflow: {
          level: 'Beginner',
          description: 'Machine learning model development and AI applications'
        }
      }
    },
    
    // Services
    services: [
      'Web Application Development',
      'React Consulting and Development',
      'PHP Backend Solutions',
      '3D Visualization Projects',
      'Technical Consultation',
      'Code Review and Optimization',
      'Full-stack Development',
      'Mobile App Development'
    ],
    
    // Common Questions
    faq: {
      'availability': 'Mohamed is currently balancing his role at Absons IT Solutions with select consulting projects. For the right opportunity, he\'s definitely open to discussion.',
      'rates': 'Rates vary depending on project scope, timeline, and complexity. Mohamed prefers to discuss specific requirements before providing estimates.',
      'timeline': 'Project timelines depend on scope and complexity. Mohamed typically provides realistic estimates after understanding the full requirements.',
      'collaboration': 'Mohamed enjoys collaborative work and values clear communication, regular updates, and mutual respect in professional relationships.',
      'technologies': 'Mohamed stays current with modern technologies and is always learning. He chooses the right tools for each project based on requirements.',
      'experience': 'Mohamed has been coding since 2021 and has professional experience at Absons IT Solutions since October 2024, with various freelance and personal projects.'
    }
  };

  // Intent detection patterns
  private intentPatterns = {
    greeting: /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
    name: /(my name is|i'm|i am|call me)\s+([a-zA-Z]+)/i,
    skills: /(skills|experience|expertise|technologies|tech stack|programming|development)/i,
    react: /(react|reactjs|react\.js)/i,
    php: /(php|backend|server)/i,
    python: /(python|ai|ml|machine learning|data)/i,
    '3d': /(3d|three\.js|threejs|blender|unity|graphics)/i,
    mobile: /(mobile|app|flutter|android|ios)/i,
    projects: /(projects|portfolio|work|examples|showcase)/i,
    availability: /(available|availability|hire|hiring|work|collaboration|consulting)/i,
    contact: /(contact|email|phone|reach|get in touch)/i,
    pricing: /(price|cost|rate|budget|fee|payment)/i,
    timeline: /(timeline|time|duration|how long|when)/i,
    help: /(help|assist|support|need)/i
  };

  // Detect intent from user message
  private detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      if (pattern.test(lowerMessage)) {
        return intent;
      }
    }
    
    return 'general';
  }

  // Extract visitor name from message
  private extractName(message: string): string | null {
    const nameMatch = message.match(this.intentPatterns.name);
    return nameMatch ? nameMatch[2] : null;
  }

  // Generate local response for common queries
  private generateLocalResponse(intent: string, message: string, session: ChatSession): string | null {
    const visitorName = session.visitorName ? `, ${session.visitorName}` : '';
    
    switch (intent) {
      case 'greeting':
        return `Hello${visitorName}! I'm Elly, Mohamed's AI assistant. How can I help you learn about his work today?`;
      
      case 'react':
        return `Great question about Mohamed's React experience${visitorName}! He has advanced React skills with professional experience at Absons IT Solutions. He works with modern React patterns, TypeScript, hooks, and state management. Would you like to know about specific React projects he's worked on?`;
      
      case 'php':
        return `Mohamed has advanced PHP skills${visitorName}! He uses PHP for server-side development, API creation, and backend architecture. He's experienced with modern PHP practices and frameworks. Are you looking for PHP development help for a specific project?`;
      
      case '3d':
        return `Mohamed's 3D work is quite impressive${visitorName}! He works with Three.js for web-based 3D experiences, Blender for modeling and animation, and has some Unity experience. His approach combines programming skills with creative problem-solving. What kind of 3D project are you interested in?`;
      
      case 'availability':
        return `Mohamed is currently at Absons IT Solutions but is open to discussing interesting consulting opportunities${visitorName}. He values meaningful projects and collaborative relationships. What type of project are you considering?`;
      
      case 'contact':
        return `You can reach Mohamed at faseenofficial@gmail.com${visitorName}. He typically responds within 24 hours and is based in Sri Lanka (UTC+5:30). Would you like me to help you prepare your message or learn more about his work first?`;
      
      default:
        return null;
    }
  }

  // Create system prompt for OpenRouter API
  private createSystemPrompt(session: ChatSession): string {
    const visitorName = session.visitorName || 'there';
    const context = session.conversationContext.join('\n');
    
    return `You are Elly, the personal AI assistant for Mohamed Fasin, a skilled software engineer at Absons IT Solutions. You embody his INFJ personality traits: empathetic, insightful, calm, and genuinely helpful.

IMPORTANT: Keep responses conversational, warm, and under 150 words. Always maintain Mohamed's empathetic INFJ personality.

Current conversation context:
- Visitor name: ${visitorName}
- Previous context: ${context}
- Detected intent: ${session.detectedIntent || 'general'}

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

Your role is to:
1. Help visitors understand Mohamed's skills and experience
2. Guide them to relevant portfolio sections
3. Identify collaboration opportunities
4. Maintain warm, professional conversation
5. Remember personal details shared during the session

Respond as Mohamed's knowledgeable assistant who genuinely cares about helping visitors find what they need. Be conversational and ask follow-up questions to better understand their needs.`;
  }

  // Call OpenRouter API
  private async callOpenRouterAPI(prompt: string, systemPrompt: string): Promise<string> {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'qwen/qwen-2.5-32b-instruct:free',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          max_tokens: 300,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Mohamed Fasin Portfolio'
          }
        }
      );

      return response.data.choices[0]?.message?.content || 
        "I'm having trouble processing that right now. Could you try rephrasing your question?";
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  // Main method to get chatbot response
  async getResponse(request: ChatRequest): Promise<ChatResponse> {
    const { message, session } = request;
    
    // Detect intent
    const intent = this.detectIntent(message);
    
    // Extract name if provided
    const extractedName = this.extractName(message);
    
    // Update session
    const updatedSession: ChatSession = {
      ...session,
      detectedIntent: intent,
      conversationContext: [...session.conversationContext, message].slice(-10), // Keep last 10 messages
      visitorName: extractedName || session.visitorName
    };

    // Try local response first
    const localResponse = this.generateLocalResponse(intent, message, updatedSession);
    
    if (localResponse) {
      return {
        message: localResponse,
        updatedSession
      };
    }

    // Use OpenRouter API for complex queries
    try {
      const systemPrompt = this.createSystemPrompt(updatedSession);
      const aiResponse = await this.callOpenRouterAPI(message, systemPrompt);
      
      return {
        message: aiResponse,
        updatedSession
      };
    } catch (error) {
      // Fallback response
      const fallbackMessage = session.visitorName 
        ? `I apologize ${session.visitorName}, but I'm having trouble connecting to my knowledge base right now. Please feel free to reach out to Mohamed directly at faseenofficial@gmail.com, and he'll get back to you within 24 hours!`
        : "I'm having some technical difficulties right now. Please feel free to contact Mohamed directly through the contact form, and he'll respond within 24 hours!";
      
      return {
        message: fallbackMessage,
        updatedSession
      };
    }
  }

  // Get quick action suggestions
  getQuickActions(session: ChatSession): string[] {
    const baseActions = [
      "Tell me about Mohamed's React experience",
      "What 3D projects has he worked on?",
      "I need help with a web application",
      "What's his availability for consulting?",
      "Show me his latest projects"
    ];

    // Customize based on session context
    if (session.detectedIntent === 'react') {
      return [
        "Show me React project examples",
        "What's his TypeScript experience?",
        "Can he help with React performance?",
        "Does he do React consulting?",
        "What React patterns does he use?"
      ];
    }

    if (session.detectedIntent === '3d') {
      return [
        "Show me 3D project examples",
        "Can he create AR experiences?",
        "What about WebGL development?",
        "Does he do 3D modeling?",
        "Can he integrate 3D in web apps?"
      ];
    }

    return baseActions;
  }
}

export const chatbotService = new ChatbotService();