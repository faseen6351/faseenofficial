import nodemailer from 'nodemailer';

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

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  preferredContact: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  status: string;
}

// Rate limiting storage
const rateLimitStore = new Map<string, number>();

export default async function handler(req: ApiRequest, res: ApiResponse) {
  // CORS headers
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
    // Rate limiting check
    const getClientIp = (header: string | string[] | undefined): string => {
      if (Array.isArray(header)) return header[0] || 'unknown';
      return header || 'unknown';
    };
    const clientIp = getClientIp(req.headers['x-forwarded-for']) || getClientIp(req.headers['x-real-ip']) || 'unknown';
    const lastContactTime = rateLimitStore.get(clientIp) || 0;
    const currentTime = Date.now();
    
    if (currentTime - lastContactTime < 60000) {
      return res.status(429).json({
        status: 'error',
        message: 'Please wait before sending another message',
      });
    }

    // Parse and validate input
    const { name, email, phone, projectType, message, preferredContact = 'email' } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and message are required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email format',
      });
    }

    // Create submission data
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.toString().trim(),
      email: email.toString().trim(),
      phone: phone?.toString().trim() || '',
      projectType: projectType?.toString().trim() || '',
      message: message.toString().trim(),
      preferredContact: preferredContact.toString().trim() || 'email',
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: getClientIp(req.headers['user-agent']) || 'unknown',
      status: 'new',
    };

    // Send email notification
    let emailSent = false;
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailContent = `New contact form submission:

Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone}
Project Type: ${submission.projectType}
Preferred Contact: ${submission.preferredContact}
Message: ${submission.message}
Timestamp: ${submission.timestamp}
IP: ${submission.ip}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'faseenofficial@gmail.com',
        subject: 'New Portfolio Contact Form Submission',
        text: emailContent,
        replyTo: submission.email,
      });

      emailSent = true;
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    // Update rate limiting
    rateLimitStore.set(clientIp, currentTime);

    return res.status(200).json({
      status: 'success',
      message: 'Thank you for your message! I will get back to you within 24 hours.',
      emailSent,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
    });
  }
} 