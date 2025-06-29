# Portfolio Backend

This is the PHP backend for Mohamed Fasin's portfolio website, providing API endpoints for contact forms, admin panel, and chatbot functionality.

## Features

- **Contact API**: Handles contact form submissions with email notifications
- **Admin Panel**: Secure admin interface with login protection and security monitoring
- **Chatbot API**: AI-powered chatbot using OpenRouter API with local knowledge base
- **Security**: Rate limiting, SQL injection detection, and comprehensive logging
- **Health Monitoring**: System health checks and monitoring endpoints

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- Validates input, saves to JSON, sends email notifications
- Rate limited to prevent spam

### Admin Panel
- **POST** `/api/admin` - Admin login
- **GET** `/api/admin` - Get admin dashboard data (requires authentication)
- **DELETE** `/api/admin` - Logout
- Protected against brute force attacks and SQL injection

### Chatbot
- **POST** `/api/chatbot` - Chat with Elly (AI assistant)
- Uses local knowledge base for common queries
- Falls back to OpenRouter API for complex conversations
- Maintains conversation context and session

### Health Check
- **GET** `/api/health` - System health status
- Returns service status, system info, and diagnostics

## Security Features

1. **Rate Limiting**: Prevents spam and abuse
2. **SQL Injection Detection**: Monitors and logs injection attempts
3. **Brute Force Protection**: Account lockout after failed attempts
4. **Session Security**: Secure session configuration
5. **Input Validation**: Comprehensive input sanitization
6. **Security Logging**: Detailed logs of security events

## Data Storage

All data is stored in JSON files in the `/data` directory:
- `submissions.json` - Contact form submissions
- `security_logs.json` - Security events and violations
- `login_attempts.json` - Admin login attempts
- `chat_logs.json` - Chatbot conversations

## Configuration

Key configuration options in `/config/config.php`:
- Email settings (SMTP)
- Security parameters (timeouts, attempt limits)
- API keys (OpenRouter)
- File paths and directories

## Admin Credentials

- **Username**: `fasin_admin`
- **Password**: `SecurePass2025!`

## Installation

1. Upload files to your web server
2. Ensure the `/data` directory is writable
3. Configure email settings in `/config/config.php`
4. Set up URL rewriting (`.htaccess` included)
5. Test endpoints using the health check: `/api/health`

## Security Notes

- Change default admin password in production
- Set up proper email credentials
- Monitor security logs regularly
- Keep API keys secure
- Use HTTPS in production

## Chatbot (Elly)

The AI assistant embodies Mohamed's INFJ personality traits:
- Empathetic and helpful responses
- Professional yet warm communication
- Knowledgeable about Mohamed's skills and experience
- Guides visitors to relevant portfolio sections
- Identifies collaboration opportunities

## Monitoring

- Check `/api/health` for system status
- Monitor `/data/security_logs.json` for security events
- Review `/data/chat_logs.json` for chatbot interactions
- Track `/data/submissions.json` for contact inquiries

## Support

For technical support or questions about the backend implementation, contact Mohamed Fasin at faseenofficial@gmail.com.