import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Heart } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { isProfessional } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    preferredContact: 'email',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          preferredContact: formData.preferredContact,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          preferredContact: 'email',
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'faseenofficial@gmail.com',
      link: 'mailto:faseenofficial@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+971 50 983 8149',
      link: 'tel:+971509838149',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Abu Dhabi, UAE',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mohamed-fasin',
      color: 'hover:text-blue-400',
    },
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/mohamed-fasin',
      color: 'hover:text-gray-400',
    },
    {
      icon: Mail,
      name: 'Email',
      url: 'mailto:faseenofficial@gmail.com',
      color: 'hover:text-accent-400',
    },
  ];

  const projectTypes = [
    'Web Application',
    'Mobile App',
    '3D/Interactive Experience',
    'AI/ML Solution',
    'Consulting',
    'Other',
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            key={isProfessional ? 'prof-contact' : 'pers-contact'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Let's{' '}
              <span className={`bg-gradient-to-r ${isProfessional ? 'from-accent-400 to-emerald-400' : 'from-pink-400 to-rose-400'} bg-clip-text text-transparent`}>
                Connect
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {isProfessional
                ? "I'm always excited to collaborate on meaningful projects and connect with fellow developers, designers, and innovators. Let's create something amazing together."
                : "I'm always eager to meet new people, share languages and cultures, and build genuine friendships. Let's connect and create meaningful bonds together."
              }
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-white mb-6">Send me a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-white/80 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-gray-800">Select a type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-gray-800">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                  <div className="text-right text-sm text-white/50 mt-1">
                    {formData.message.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="mr-2 text-accent-400"
                      />
                      <span className="text-white/80">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2 text-accent-400"
                      />
                      <span className="text-white/80">Phone</span>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                  icon={Send}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 text-emerald-300"
                  >
                    Thank you for your message! I'll get back to you within 24 hours.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300"
                  >
                    Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-400/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">{info.title}</div>
                      <a
                        href={info.link}
                        className="text-white hover:text-accent-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6">Connect Online</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white/70 transition-all hover:bg-white/20 ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </Card>

            {/* Availability */}
            <Card>
              <h3 className="text-xl font-semibold text-white mb-4">Current Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80">Available for new projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-white/80">Own Visa Holder</span>
                </div>
                <div className="text-white/60 text-sm">
                  <strong>Response Time:</strong> Within 24 hours
                </div>
                <div className="text-white/60 text-sm">
                  <strong>Time Zone:</strong> UAE Standard Time (UTC+4)
                </div>
                <div className="text-white/60 text-sm">
                  <strong>Location:</strong> Abu Dhabi, UAE
                </div>
                <div className="text-white/60 text-sm">
                  <strong>Origin:</strong> Kerala, Thrissur, India
                </div>
              </div>
            </Card>

            {/* Personal Touch */}
            <Card key={isProfessional ? 'prof-quote' : 'pers-quote'}>
              <div className="text-center">
                <Heart className={`w-8 h-8 ${isProfessional ? 'text-accent-400' : 'text-pink-400'} mx-auto mb-4`} />
                <p className="text-white/80 text-sm">
                  {isProfessional
                    ? '"I believe every great project starts with a meaningful conversation. Let\'s discuss how we can bring your vision to life with empathy and innovation."'
                    : '"Every meaningful connection begins with genuine conversation and mutual understanding. I\'d love to hear your story and share mine."'
                  }
                </p>
                <p className="text-white/60 text-xs mt-2">- Mohamed Fasin</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;