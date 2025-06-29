export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

export interface ChatSession {
  visitorName?: string;
  conversationContext: string[];
  detectedIntent?: string;
  leadQualification: {
    projectType?: string;
    budget?: string;
    timeline?: string;
    company?: string;
    role?: string;
    industry?: string;
    teamSize?: string;
    urgency?: string;
  };
  sessionStartTime: Date;
  lastActivity: Date;
  messageCount: number;
  isQualifiedLead: boolean;
}

export interface ChatRequest {
  message: string;
  conversationHistory: Message[];
  session: ChatSession;
}

export interface ChatResponse {
  message: string;
  updatedSession: ChatSession;
  suggestions?: string[];
  shouldEscalate?: boolean;
  leadScore?: number;
}

export interface KnowledgeBase {
  personal: {
    name: string;
    role: string;
    startDate: string;
    location: string;
    personality: string;
    education: string;
    certifications: string[];
    email: string;
    availability: string;
    responseTime: string;
  };
  skills: Record<string, any>;
  services: string[];
  faq: Record<string, string>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    category: string;
    highlights: string[];
  }>;
}

export type IntentType = 
  | 'greeting'
  | 'name'
  | 'skills'
  | 'react'
  | 'php'
  | 'python'
  | '3d'
  | 'mobile'
  | 'projects'
  | 'availability'
  | 'contact'
  | 'pricing'
  | 'timeline'
  | 'help'
  | 'general';