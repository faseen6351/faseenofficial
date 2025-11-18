import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Heart, Briefcase, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { mode, toggleMode, isProfessional } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Link to="/" className="flex items-center space-x-2 text-white">
                <motion.img
                  key={isProfessional ? 'prof-nav' : 'pers-nav'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={isProfessional ? '/FaseenLogo.png' : '/FaseenPersonal.jpg'}
                  alt="Mohamed Fasin"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-semibold text-lg">Mohamed Fasin</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-accent-400'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-md -z-10"
                        layoutId="activeTab"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Mode Toggle Switch */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMode}
                className="relative flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300"
                title={isProfessional ? 'Switch to Personal' : 'Switch to Professional'}
              >
                <motion.div
                  className="flex items-center space-x-2"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {isProfessional ? (
                    <>
                      <Briefcase className="w-4 h-4 text-accent-400" />
                      <span className="text-sm text-white/80">Professional</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-white/80">Personal</span>
                    </>
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/10 backdrop-blur-md border-b border-white/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-accent-400 bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Mode Toggle */}
                <button
                  onClick={toggleMode}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 mt-2 bg-white/10 rounded-md border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  {isProfessional ? (
                    <>
                      <Briefcase className="w-4 h-4 text-accent-400" />
                      <span className="text-sm text-white/80">Switch to Personal</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-white/80">Switch to Professional</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Heart icon for INFJ personality touch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-accent-400/20 to-emerald-400/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-accent-400 animate-pulse-soft" />
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;