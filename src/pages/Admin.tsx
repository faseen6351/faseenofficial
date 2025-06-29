import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Eye, Download, AlertTriangle, Users, MessageSquare, TrendingUp, Activity, Calendar, Globe, Zap, Database, MapPin, Clock, DollarSign } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);

  // Get user's IP address (simulated for demo)
  const getUserIP = () => {
    // In a real application, you would get this from the server
    return '192.168.1.' + Math.floor(Math.random() * 255);
  };

  // Get user's location based on IP (simulated for demo)
  const getUserLocation = (ip: string) => {
    // In a real application, you would use a geolocation service
    const locations = [
      'New York, USA',
      'London, UK',
      'Tokyo, Japan',
      'Sydney, Australia',
      'Toronto, Canada',
      'Berlin, Germany',
      'Mumbai, India',
      'São Paulo, Brazil'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  // Simulate sending email notification
  const sendSecurityAlert = (event: string, ip: string, location: string) => {
    console.log(`🚨 SECURITY ALERT: ${event} from ${ip} (${location})`);
    // In a real application, this would send an actual email
    // using a service like EmailJS, SendGrid, or a backend API
  };

  // Enhanced dummy data for 2025
  const contactSubmissions = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@techcorp.com',
      phone: '+1 555 0123',
      projectType: 'AI/ML Solution',
      message: 'Looking to implement advanced machine learning algorithms for predictive analytics in our fintech platform. Need expertise in neural networks, real-time data processing, and model deployment at scale.',
      date: '2025-01-15',
      status: 'new',
      priority: 'high',
      estimatedBudget: '$75,000 - $100,000',
      timeline: '4-6 months',
      company: 'TechCorp Industries',
      industry: 'Financial Technology',
      teamSize: '15-20 developers',
      urgency: 'Q2 2025 launch target'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus@innovatestart.io',
      phone: '+1 555 0124',
      projectType: '3D/Interactive Experience',
      message: 'We want to create an immersive 3D product configurator for our e-commerce platform. Users should be able to customize products in real-time with AR capabilities and seamless mobile experience.',
      date: '2025-01-14',
      status: 'in-progress',
      priority: 'medium',
      estimatedBudget: '$45,000 - $65,000',
      timeline: '3-5 months',
      company: 'InnovateStart',
      industry: 'E-commerce',
      teamSize: '8-12 developers',
      urgency: 'Summer 2025 release'
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      email: 'e.watson@medtech.org',
      phone: '+1 555 0125',
      projectType: 'Healthcare Web Application',
      message: 'Need a comprehensive patient management system with real-time monitoring, AI-powered diagnostics, secure data handling compliant with HIPAA regulations, and integration with existing hospital systems.',
      date: '2025-01-13',
      status: 'responded',
      priority: 'high',
      estimatedBudget: '$120,000 - $150,000',
      timeline: '8-12 months',
      company: 'MedTech Solutions',
      industry: 'Healthcare',
      teamSize: '20+ developers',
      urgency: 'Critical - patient safety priority'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      email: 'alex@greentech.com',
      phone: '+1 555 0126',
      projectType: 'Sustainability Mobile App',
      message: 'Developing a comprehensive sustainability tracking app with IoT integration, carbon footprint calculation, gamification elements, social features, and corporate dashboard for environmental impact reporting.',
      date: '2025-01-12',
      status: 'new',
      priority: 'medium',
      estimatedBudget: '$35,000 - $50,000',
      timeline: '4-6 months',
      company: 'GreenTech Innovations',
      industry: 'Environmental Technology',
      teamSize: '6-10 developers',
      urgency: 'Earth Day 2025 launch'
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@edutech.edu',
      phone: '+1 555 0127',
      projectType: 'Educational Platform',
      message: 'Creating an adaptive learning platform with AI tutoring, progress tracking, personalized curriculum generation for K-12 education, parent dashboards, and teacher analytics tools.',
      date: '2025-01-11',
      status: 'in-progress',
      priority: 'high',
      estimatedBudget: '$80,000 - $110,000',
      timeline: '6-10 months',
      company: 'EduTech Academy',
      industry: 'Education Technology',
      teamSize: '12-18 developers',
      urgency: 'New school year 2025'
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'j.wilson@cryptoventures.com',
      phone: '+1 555 0128',
      projectType: 'Blockchain/Web3 Platform',
      message: 'Building a next-generation decentralized finance (DeFi) platform with smart contracts, yield farming capabilities, advanced security features, multi-chain support, and institutional-grade compliance.',
      date: '2025-01-10',
      status: 'new',
      priority: 'high',
      estimatedBudget: '$200,000+',
      timeline: '8-12 months',
      company: 'Crypto Ventures',
      industry: 'Blockchain/DeFi',
      teamSize: '25+ developers',
      urgency: 'Market opportunity - Q3 2025'
    },
    {
      id: 7,
      name: 'Maria Gonzalez',
      email: 'maria@retailtech.com',
      phone: '+1 555 0129',
      projectType: 'Retail Analytics Dashboard',
      message: 'Need an advanced retail analytics platform with real-time inventory tracking, predictive analytics for demand forecasting, customer behavior analysis, and automated reordering systems.',
      date: '2025-01-09',
      status: 'responded',
      priority: 'medium',
      estimatedBudget: '$60,000 - $85,000',
      timeline: '5-7 months',
      company: 'RetailTech Solutions',
      industry: 'Retail Technology',
      teamSize: '10-15 developers',
      urgency: 'Holiday season 2025 prep'
    },
    {
      id: 8,
      name: 'David Kim',
      email: 'david@smartcity.gov',
      phone: '+1 555 0130',
      projectType: 'Smart City IoT Platform',
      message: 'Developing a comprehensive smart city management platform with IoT sensor integration, traffic optimization, energy management, citizen services portal, and real-time city analytics dashboard.',
      date: '2025-01-08',
      status: 'new',
      priority: 'high',
      estimatedBudget: '$300,000+',
      timeline: '12-18 months',
      company: 'Smart City Initiative',
      industry: 'Government/Public Sector',
      teamSize: '30+ developers',
      urgency: 'Municipal budget cycle 2025'
    }
  ];

  const securityLogs = [
    {
      id: 1,
      event: 'Successful admin login',
      ip: '192.168.1.100',
      timestamp: '2025-01-15 14:30:22',
      status: 'success',
      userAgent: 'Chrome 131.0.0.0 (Windows 10)',
      location: 'Colombo, Sri Lanka',
      details: 'Valid credentials used'
    },
    {
      id: 2,
      event: 'Failed login attempt - SQL injection detected',
      ip: '45.123.45.67',
      timestamp: '2025-01-15 13:45:18',
      status: 'critical',
      userAgent: 'Python-requests/2.28.1',
      location: 'Unknown (VPN/Proxy)',
      details: "Attempted: admin' OR '1'='1"
    },
    {
      id: 3,
      event: 'Failed login attempt - Basic credentials',
      ip: '198.51.100.42',
      timestamp: '2025-01-15 13:42:33',
      status: 'warning',
      userAgent: 'curl/7.68.0',
      location: 'Unknown',
      details: 'Attempted: admin/1'
    },
    {
      id: 4,
      event: 'Contact form submission',
      ip: '203.94.15.22',
      timestamp: '2025-01-15 12:20:45',
      status: 'info',
      userAgent: 'Safari 17.2.1 (macOS)',
      location: 'Singapore',
      details: 'Legitimate inquiry from TechCorp'
    },
    {
      id: 5,
      event: 'Multiple failed login attempts',
      ip: '185.220.101.42',
      timestamp: '2025-01-15 11:30:15',
      status: 'critical',
      userAgent: 'Mozilla/5.0 (compatible; Baiduspider/2.0)',
      location: 'Tor Exit Node',
      details: 'Brute force attack detected - IP blocked'
    },
    {
      id: 6,
      event: 'Portfolio page accessed',
      ip: '172.16.0.45',
      timestamp: '2025-01-15 11:15:33',
      status: 'info',
      userAgent: 'Firefox 122.0 (Ubuntu)',
      location: 'London, UK',
      details: 'Normal visitor behavior'
    },
    {
      id: 7,
      event: 'Admin panel access attempt',
      ip: '104.28.15.67',
      timestamp: '2025-01-15 10:45:22',
      status: 'warning',
      userAgent: 'Unknown Bot Scanner',
      location: 'United States',
      details: 'Automated scanning detected'
    },
    {
      id: 8,
      event: 'Failed login - Dictionary attack',
      ip: '91.234.56.78',
      timestamp: '2025-01-15 09:30:44',
      status: 'critical',
      userAgent: 'Hydra v9.1',
      location: 'Russia',
      details: 'Common passwords attempted'
    }
  ];

  const analyticsData = {
    totalVisitors: 18947,
    monthlyGrowth: 28.7,
    avgSessionDuration: '4m 15s',
    bounceRate: 24.8,
    conversionRate: 12.3,
    totalRevenue: '$2,847,500',
    topPages: [
      { page: '/projects', views: 6521, percentage: 34.4, avgTime: '5m 23s' },
      { page: '/', views: 5892, percentage: 31.1, avgTime: '3m 45s' },
      { page: '/about', views: 3134, percentage: 16.5, avgTime: '4m 12s' },
      { page: '/skills', views: 2156, percentage: 11.4, avgTime: '3m 28s' },
      { page: '/contact', views: 1244, percentage: 6.6, avgTime: '2m 15s' }
    ],
    deviceStats: {
      desktop: 58.7,
      mobile: 35.2,
      tablet: 6.1
    },
    topCountries: [
      { country: 'United States', visitors: 5684, percentage: 30.0, revenue: '$854,250' },
      { country: 'United Kingdom', visitors: 3789, percentage: 20.0, revenue: '$569,500' },
      { country: 'Canada', visitors: 2842, percentage: 15.0, revenue: '$427,125' },
      { country: 'Australia', visitors: 1895, percentage: 10.0, revenue: '$284,750' },
      { country: 'Germany', visitors: 1516, percentage: 8.0, revenue: '$227,800' },
      { country: 'Netherlands', visitors: 1137, percentage: 6.0, revenue: '$170,850' },
      { country: 'Singapore', visitors: 948, percentage: 5.0, revenue: '$142,375' },
      { country: 'Japan', visitors: 758, percentage: 4.0, revenue: '$113,900' },
      { country: 'France', visitors: 569, percentage: 3.0, revenue: '$85,425' },
      { country: 'Sweden', visitors: 379, percentage: 2.0, revenue: '$56,950' }
    ],
    browserStats: [
      { browser: 'Chrome', percentage: 68.4, users: 12956 },
      { browser: 'Safari', percentage: 18.2, users: 3448 },
      { browser: 'Firefox', percentage: 8.7, users: 1648 },
      { browser: 'Edge', percentage: 3.9, users: 739 },
      { browser: 'Other', percentage: 0.8, users: 156 }
    ]
  };

  useEffect(() => {
    // Enhanced security measures
    if (typeof console !== 'undefined') {
      console.clear();
      console.log('%c⚠️ SECURITY WARNING', 'color: red; font-size: 24px; font-weight: bold; background: black; padding: 10px;');
      console.log('%cUnauthorized access attempts are monitored and logged.', 'color: orange; font-size: 14px;');
      console.log('%cAll activities are tracked with IP addresses and locations.', 'color: orange; font-size: 14px;');
      console.log('%cSecurity violations will be reported to authorities.', 'color: red; font-size: 14px; font-weight: bold;');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLocked && lockTimeLeft > 0) {
      interval = setInterval(() => {
        setLockTimeLeft(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimeLeft]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;

    const userIP = getUserIP();
    const userLocation = getUserLocation(userIP);

    // Check for common SQL injection attempts
    const sqlPatterns = [
      /'/,
      /OR/i,
      /AND/i,
      /UNION/i,
      /SELECT/i,
      /DROP/i,
      /INSERT/i,
      /DELETE/i,
      /--/,
      /;/
    ];

    const isSQLInjection = sqlPatterns.some(pattern => 
      pattern.test(loginData.username) || pattern.test(loginData.password)
    );

    // Check for basic attack patterns
    const isBasicAttack = (
      (loginData.username === 'admin' && loginData.password === '1') ||
      (loginData.username === '1' && loginData.password === '1') ||
      (loginData.username === 'admin' && loginData.password === 'admin') ||
      (loginData.username === 'root' && loginData.password === 'root')
    );

    if (isSQLInjection) {
      // Log SQL injection attempt
      console.log(`🚨 SQL INJECTION ATTEMPT DETECTED!`);
      console.log(`IP: ${userIP}`);
      console.log(`Location: ${userLocation}`);
      console.log(`Username: ${loginData.username}`);
      console.log(`Password: ${loginData.password}`);
      
      sendSecurityAlert('SQL Injection Attempt', userIP, userLocation);
      
      setLoginAttempts(prev => prev + 2); // Increase attempts faster for SQL injection
      setLoginData({ username: '', password: '' });
      return;
    }

    if (isBasicAttack) {
      // Log basic attack attempt
      console.log(`🚨 BASIC ATTACK ATTEMPT DETECTED!`);
      console.log(`IP: ${userIP}`);
      console.log(`Location: ${userLocation}`);
      console.log(`Credentials: ${loginData.username}/${loginData.password}`);
      
      sendSecurityAlert('Basic Credential Attack', userIP, userLocation);
    }

    // Updated credentials for 2025
    if (loginData.username === 'fasin_admin' && loginData.password === 'SecurePass2025!') {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      console.log(`✅ Successful login from ${userIP} (${userLocation})`);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      // Log failed attempt
      console.log(`❌ Failed login attempt ${newAttempts}/3`);
      console.log(`IP: ${userIP}`);
      console.log(`Location: ${userLocation}`);
      console.log(`Attempted credentials: ${loginData.username}/${loginData.password}`);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimeLeft(600); // 10 minutes lockout
        sendSecurityAlert('Account Locked - Multiple Failed Attempts', userIP, userLocation);
      }
      
      setLoginData({ username: '', password: '' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  const exportData = () => {
    const data = JSON.stringify(contactSubmissions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <Card>
              <div className="text-center mb-8">
                <Shield className="w-16 h-16 text-accent-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Admin Portal 2025</h1>
                <p className="text-white/60">Advanced Security Authentication</p>
              </div>

              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-center"
                >
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-red-300 text-sm font-medium">
                    🔒 SECURITY LOCKOUT ACTIVE
                  </p>
                  <p className="text-red-300 text-xs mt-1">
                    Time remaining: {Math.floor(lockTimeLeft / 60)}:{(lockTimeLeft % 60).toString().padStart(2, '0')}
                  </p>
                  <p className="text-red-200 text-xs mt-2">
                    Your IP and location have been logged.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                    placeholder="Enter username"
                    disabled={isLocked}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                    placeholder="Enter password"
                    disabled={isLocked}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLocked}
                  icon={Lock}
                >
                  {isLocked ? '🔒 LOCKED' : 'Access Portal'}
                </Button>
              </form>

              {loginAttempts > 0 && !isLocked && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-300 text-sm text-center">
                    ⚠️ Invalid credentials. {3 - loginAttempts} attempts remaining.
                  </p>
                  <p className="text-yellow-200 text-xs text-center mt-1">
                    Your activity is being monitored.
                  </p>
                </div>
              )}

              <div className="mt-6 p-3 bg-gray-500/10 border border-gray-500/20 rounded-lg">
                <p className="text-gray-300 text-xs text-center">
                  🛡️ This system is protected by advanced security monitoring.<br />
                  All access attempts are logged with IP addresses and locations.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Portfolio Analytics Dashboard 2025</h1>
              <p className="text-white/60">Advanced business intelligence & security monitoring</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Secure Logout
            </Button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card className="text-center">
              <MessageSquare className="w-8 h-8 text-accent-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent-400 mb-2">
                {contactSubmissions.length}
              </div>
              <div className="text-white/70 text-sm">Active Inquiries</div>
              <div className="text-emerald-400 text-xs mt-1">+{Math.floor(Math.random() * 25 + 15)}% this month</div>
            </Card>
            
            <Card className="text-center">
              <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                {analyticsData.totalVisitors.toLocaleString()}
              </div>
              <div className="text-white/70 text-sm">Total Visitors</div>
              <div className="text-emerald-400 text-xs mt-1">+{analyticsData.monthlyGrowth}% growth</div>
            </Card>
            
            <Card className="text-center">
              <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary-400 mb-2">
                {analyticsData.conversionRate}%
              </div>
              <div className="text-white/70 text-sm">Conversion Rate</div>
              <div className="text-emerald-400 text-xs mt-1">Industry leading</div>
            </Card>
            
            <Card className="text-center">
              <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {analyticsData.totalRevenue}
              </div>
              <div className="text-white/70 text-sm">Total Revenue</div>
              <div className="text-emerald-400 text-xs mt-1">YTD performance</div>
            </Card>
            
            <Card className="text-center">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {analyticsData.avgSessionDuration}
              </div>
              <div className="text-white/70 text-sm">Avg. Session</div>
              <div className="text-emerald-400 text-xs mt-1">+15% vs last month</div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Enhanced Contact Submissions */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Business Inquiries</h2>
                  <Button size="sm" variant="outline" onClick={exportData} icon={Download}>
                    Export Data
                  </Button>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {contactSubmissions.map((contact) => (
                    <div key={contact.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/8 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{contact.name}</h3>
                          <p className="text-white/60 text-sm">{contact.email}</p>
                          <p className="text-white/50 text-xs">{contact.company} • {contact.industry}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            contact.status === 'new' 
                              ? 'bg-accent-400/20 text-accent-400' 
                              : contact.status === 'in-progress'
                              ? 'bg-blue-400/20 text-blue-400'
                              : 'bg-emerald-400/20 text-emerald-400'
                          }`}>
                            {contact.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            contact.priority === 'high'
                              ? 'bg-red-400/20 text-red-400'
                              : 'bg-yellow-400/20 text-yellow-400'
                          }`}>
                            {contact.priority} priority
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                        <div>
                          <span className="text-white/50">Budget: </span>
                          <span className="text-emerald-400 font-medium">{contact.estimatedBudget}</span>
                        </div>
                        <div>
                          <span className="text-white/50">Timeline: </span>
                          <span className="text-blue-400">{contact.timeline}</span>
                        </div>
                        <div>
                          <span className="text-white/50">Team Size: </span>
                          <span className="text-purple-400">{contact.teamSize}</span>
                        </div>
                        <div>
                          <span className="text-white/50">Urgency: </span>
                          <span className="text-yellow-400">{contact.urgency}</span>
                        </div>
                      </div>
                      
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">{contact.message}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-accent-400 text-sm font-medium">{contact.projectType}</span>
                        <span className="text-white/50 text-xs">{contact.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Revenue by Country */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Revenue by Country</h3>
                </div>
                <div className="space-y-3">
                  {analyticsData.topCountries.slice(0, 5).map((country, index) => (
                    <div key={country.country} className="flex justify-between items-center">
                      <div>
                        <span className="text-white/80 text-sm">{country.country}</span>
                        <div className="text-emerald-400 text-xs">{country.revenue}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div 
                            className="h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <span className="text-white/60 text-xs w-8">{country.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Browser Analytics</h3>
                </div>
                <div className="space-y-3">
                  {analyticsData.browserStats.map((browser) => (
                    <div key={browser.browser} className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">{browser.browser}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400 font-medium text-sm">{browser.percentage}%</span>
                        <span className="text-white/50 text-xs">({browser.users.toLocaleString()})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enhanced Security Logs */}
            <Card>
              <div className="flex items-center space-x-2 mb-6">
                <Eye className="w-5 h-5 text-red-400" />
                <h2 className="text-xl font-semibold text-white">Security Monitor</h2>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">LIVE</span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {securityLogs.map((log) => (
                  <div key={log.id} className={`flex items-start justify-between rounded-lg p-3 border ${
                    log.status === 'critical' ? 'bg-red-500/10 border-red-500/20' :
                    log.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    log.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20' :
                    'bg-white/5 border-white/10'
                  }`}>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        log.status === 'critical' ? 'text-red-300' :
                        log.status === 'warning' ? 'text-yellow-300' :
                        log.status === 'success' ? 'text-emerald-300' :
                        'text-white/80'
                      }`}>
                        {log.event}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-white/40" />
                        <p className="text-white/50 text-xs">{log.ip} • {log.location}</p>
                      </div>
                      <p className="text-white/40 text-xs">{log.userAgent}</p>
                      <p className="text-white/60 text-xs mt-1 italic">{log.details}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-emerald-400' :
                        log.status === 'warning' ? 'bg-yellow-400' :
                        log.status === 'critical' ? 'bg-red-400' :
                        'bg-blue-400'
                      }`}></span>
                      <p className="text-white/50 text-xs mt-1">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Status & Performance */}
            <Card>
              <div className="flex items-center space-x-2 mb-6">
                <Database className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold text-white">System Performance</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/80 text-sm">Server Status</span>
                  </div>
                  <span className="text-emerald-400 text-sm font-medium">🟢 Online</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span className="text-white/80 text-sm">Database</span>
                  </div>
                  <span className="text-blue-400 text-sm font-medium">🟢 Healthy</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-white/80 text-sm">Security</span>
                  </div>
                  <span className="text-purple-400 text-sm font-medium">🛡️ Protected</span>
                </div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-medium mb-4">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Uptime:</span>
                      <div className="text-emerald-400 font-medium">99.98%</div>
                    </div>
                    <div>
                      <span className="text-white/60">Response:</span>
                      <div className="text-blue-400 font-medium">89ms</div>
                    </div>
                    <div>
                      <span className="text-white/60">CPU Load:</span>
                      <div className="text-yellow-400 font-medium">12%</div>
                    </div>
                    <div>
                      <span className="text-white/60">Memory:</span>
                      <div className="text-purple-400 font-medium">34% used</div>
                    </div>
                    <div>
                      <span className="text-white/60">Bandwidth:</span>
                      <div className="text-emerald-400 font-medium">2.4 GB/day</div>
                    </div>
                    <div>
                      <span className="text-white/60">Storage:</span>
                      <div className="text-blue-400 font-medium">18% used</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-accent-500/10 to-emerald-500/10 rounded-lg border border-accent-500/20">
                  <h5 className="text-white font-medium text-sm mb-2">🚀 System Highlights</h5>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Zero downtime in the last 30 days</li>
                    <li>• 15+ security threats blocked today</li>
                    <li>• 99.9% email delivery rate</li>
                    <li>• Advanced DDoS protection active</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Admin;