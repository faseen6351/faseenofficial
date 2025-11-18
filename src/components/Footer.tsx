import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Mail, Linkedin, Github, MapPin, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isProfessional } = useTheme();
  const currentYear = new Date().getFullYear();

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
      color: 'hover:text-gray-300',
    },
    {
      icon: Mail,
      name: 'Email',
      url: 'mailto:faseenofficial@gmail.com',
      color: 'hover:text-accent-400',
    },
  ];

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-primary-950 via-primary-900 to-transparent border-t border-white/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-br from-accent-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 right-1/3 w-32 h-32 bg-gradient-to-br from-primary-400/5 to-accent-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              key={isProfessional ? 'prof-footer' : 'pers-footer'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={isProfessional ? '/FaseenLogo.png' : '/FaseenPersonal.jpg'}
                  alt="Mohamed Fasin"
                  className={`w-10 h-10 ${isProfessional ? 'object-contain' : 'object-cover rounded-lg'}`}
                />
                <span className="text-xl font-bold text-white">Mohamed Fasin</span>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {isProfessional
                  ? 'Empathetic software engineer crafting meaningful digital experiences through innovative technology and human-centered design.'
                  : 'Multilingual connector building bridges across cultures through empathy, language learning, and genuine human understanding.'
                }
              </p>
              <div className="flex items-center space-x-4 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Abu Dhabi, UAE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Available • Own Visa</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/70 transition-all hover:bg-white/20 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      className="text-white/70 hover:text-accent-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href="mailto:faseenofficial@gmail.com"
                  className="block text-white/70 hover:text-accent-400 transition-colors duration-200"
                >
                  faseenofficial@gmail.com
                </a>
                <a
                  href="tel:+971509838149"
                  className="block text-white/70 hover:text-accent-400 transition-colors duration-200"
                >
                  +971 50 983 8149
                </a>
                <div className="text-white/60 text-sm">
                  <div>Response time: Within 24 hours</div>
                  <div>Time zone: UAE (UTC+4)</div>
                  <div>Location: Abu Dhabi, UAE</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-white/60 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Mohamed Fasin. Made with</span>
            <Heart className="w-4 h-4 text-accent-400 animate-pulse" />
            <span>and empathy.</span>
          </div>
          <div className="text-white/40 text-xs">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;