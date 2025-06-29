import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import nodemailer from 'nodemailer';

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

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, number>();

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ status: 'error', message: 'Method not allowed' }),
    };
  }

  try {
    // Rate limiting check
    const clientIp = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    const lastContactTime = rateLimitStore.get(clientIp) || 0;
    const currentTime = Date.now();
    
    if (currentTime - lastContactTime < 60000) { // 1 minute cooldown
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'error',
          message: 'Please wait before sending another message',
        }),
      };
    }

    // Parse and validate input
    const input = JSON.parse(event.body || '{}');
    
    const name = input.name?.toString().trim() || '';
    const email = input.email?.toString().trim() || '';
    const phone = input.phone?.toString().trim() || '';
    const projectType = input.projectType?.toString().trim() || '';
    const message = input.message?.toString().trim() || '';
    const preferredContact = input.preferredContact?.toString().trim() || 'email';

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'error',
          message: 'Name, email, and message are required',
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          status: 'error',
          message: 'Invalid email format',
        }),
      };
    }

    // Create submission data
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      projectType,
      message,
      preferredContact,
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: event.headers['user-agent'] || 'unknown',
      status: 'new',
    };

    // Send email notification
    let emailSent = false;
    try {
      // Configure nodemailer with environment variables
      const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailContent = `New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Project Type: ${projectType}
Preferred Contact: ${preferredContact}
Message: ${message}
Timestamp: ${submission.timestamp}
IP: ${submission.ip}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'faseenofficial@gmail.com',
        subject: 'New Portfolio Contact Form Submission',
        text: emailContent,
        replyTo: email,
      });

      emailSent = true;
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue execution even if email fails
    }

    // Store submission (in production, use a database)
    // For now, we'll log it and rely on email notifications
    console.log('Contact submission:', JSON.stringify(submission, null, 2));

    // Update rate limiting
    rateLimitStore.set(clientIp, currentTime);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        status: 'success',
        message: 'Thank you for your message! I will get back to you within 24 hours.',
        emailSent,
      }),
    };

  } catch (error) {
    console.error('Contact form error:', error);
    
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