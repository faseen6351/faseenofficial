import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/in/mohamed-fasin' },
    { icon: Github, name: 'GitHub', url: 'https://github.com/mohamed-fasin' },
    { icon: Mail, name: 'Email', url: 'mailto:faseenofficial@gmail.com' },
  ];

  const quickLinks = [
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-white/5 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/FaseenLogo.png" alt="Mohamed Fasin" className="w-9 h-9 object-contain" />
              <span className="text-lg font-bold text-white">Mohamed Fasin</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-sm">
              Full-stack software engineer specializing in mobile (iOS & Android) and web development.
              Building production-grade digital products from Abu Dhabi, UAE.
            </p>
            <div className="flex items-center gap-2 text-white/30 text-sm mb-5">
              <MapPin className="w-4 h-4" />
              <span>Abu Dhabi, UAE · Own Visa</span>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/40 hover:text-white/70 text-sm transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-white/40">
              <a href="mailto:faseenofficial@gmail.com" className="block hover:text-white/70 transition-colors duration-200">
                faseenofficial@gmail.com
              </a>
              <a href="tel:+971509838149" className="block hover:text-white/70 transition-colors duration-200">
                +971 50 983 8149
              </a>
              <div className="pt-1 text-white/30 text-xs space-y-0.5">
                <div>Response: Within 24 hours</div>
                <div>UTC+4 (UAE Standard Time)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-white/30 text-sm">
            © {currentYear} Mohamed Fasin. All rights reserved.
          </div>
          <div className="text-white/20 text-xs">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
