import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Mail, ExternalLink, Code, Heart, Zap, Languages, Users, Lightbulb, Brain } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import InteractiveElements from '../components/InteractiveElements';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { isProfessional, colors } = useTheme();
  const professionalStats = [
    { number: '3+', label: 'Years Experience' },
    { number: '25+', label: 'Projects Completed' },
    { number: '10+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  const personalStats = [
    { number: '7+', label: 'Languages Learning' },
    { number: '95%', label: 'Emotional Intelligence' },
    { number: '∞', label: 'Curiosity Level' },
    { number: '100%', label: 'Passion for Connection' },
  ];

  const stats = isProfessional ? professionalStats : personalStats;

  const professionalProjects = [
    {
      title: 'Python Automation Tools',
      description: 'Intelligent automation scripts for workflow optimization and data processing',
      tech: ['Python', 'Selenium', 'Pandas'],
      gradient: 'from-green-400 to-green-600',
    },
    {
      title: 'React Web Applications',
      description: 'Full-stack web apps with modern React, TypeScript, and backend integration',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      title: 'AI-Powered Solutions',
      description: 'Machine learning models and AI tools for intelligent decision making',
      tech: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  const personalProjects = [
    {
      title: 'Multilingual Connections',
      description: 'Building bridges across cultures through language learning and understanding',
      tech: ['English', 'Tamil', 'Arabic', 'Spanish'],
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      title: 'Emotional Intelligence',
      description: 'Deep understanding of human emotions and empathetic communication',
      tech: ['Active Listening', 'Empathy', 'Intuition'],
      gradient: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Cultural Bridge Builder',
      description: 'Connecting with people from diverse backgrounds and fostering understanding',
      tech: ['Cross-Cultural', 'Communication', 'Understanding'],
      gradient: 'from-amber-400 to-amber-600',
    },
  ];

  const featuredProjects = isProfessional ? professionalProjects : personalProjects;

  return (
    <PageWrapper>
      {/* Hero Section with Interactive Elements */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Interactive Elements Container */}
        <InteractiveElements />
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="mb-8"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 relative"
              key={isProfessional ? 'professional' : 'personal'}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${colors.secondary} rounded-full blur-lg opacity-50`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <img
                src={isProfessional ? '/FaseenLogo.png' : '/FaseenPersonal.jpg'}
                alt="Mohamed Fasin"
                className={`relative w-full h-full ${isProfessional ? 'object-contain' : 'rounded-full object-cover border-4 border-white/20'}`}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            key={isProfessional ? 'prof-title' : 'pers-title'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Hello, I'm{' '}
            <span className={`bg-gradient-to-r ${colors.secondary} bg-clip-text text-transparent`}>
              Mohamed Fasin
            </span>
          </motion.h1>

          <motion.p
            key={isProfessional ? 'prof-desc' : 'pers-desc'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {isProfessional ? (
              <>
                A passionate software engineer specializing in{' '}
                <span className={colors.textAccent}>Python automation</span>,{' '}
                <span className={colors.textAccent}>React web apps</span>,{' '}
                <span className={colors.textAccent}>backend development</span>, and{' '}
                <span className={colors.textAccent}>AI-powered tools</span>.
              </>
            ) : (
              <>
                A multilingual connector who bridges cultures through{' '}
                <span className="text-pink-400">language learning</span>,{' '}
                <span className="text-rose-400">emotional intelligence</span>, and{' '}
                <span className="text-amber-400">deep human understanding</span>.
              </>
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/contact">
              <Button icon={Mail} size="lg">
                Let's Connect
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" icon={ExternalLink} size="lg">
                Explore My Work
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="animate-bounce"
          >
            <ArrowDown className="w-6 h-6 text-white/60 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-colors duration-300">
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={isProfessional ? 'prof-feat' : 'pers-feat'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isProfessional ? 'Featured Projects' : 'Core Strengths'}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {isProfessional
                ? 'A glimpse into my technical expertise and innovative solutions'
                : 'The personal qualities that make me uniquely capable of connecting with people'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={project.title} delay={index * 0.2} className="group cursor-pointer">
                <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-6 flex items-center justify-center`}>
                  <Code className="w-12 h-12 text-white/90" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link to="/projects">
              <Button variant="outline" icon={ArrowDown} className="rotate-90">
                View All Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            key={isProfessional ? 'prof-touch' : 'pers-touch'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
          >
            {isProfessional ? (
              <>
                <Code className="w-12 h-12 text-accent-400 mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Technical Excellence Meets Innovation
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  I specialize in creating robust automation solutions with Python, building modern web applications
                  with React and TypeScript, developing scalable backend systems, and integrating cutting-edge AI tools.
                  Every project is built with precision, scalability, and user experience in mind.
                </p>
                <div className="flex justify-center items-center space-x-2 text-white/60">
                  <Zap className="w-5 h-5" />
                  <span>Powered by innovation, driven by results</span>
                </div>
              </>
            ) : (
              <>
                <Languages className="w-12 h-12 text-pink-400 mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Language Learning & Deep Connection
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  With proficiency in multiple languages and a natural gift for understanding people, I excel at
                  creating meaningful connections across cultures. My emotional intelligence and empathy allow me
                  to truly understand and connect with people on a deeper level, making communication effortless
                  and relationships genuine.
                </p>
                <div className="flex justify-center items-center space-x-2 text-white/60">
                  <Heart className="w-5 h-5" />
                  <span>Powered by empathy, guided by understanding</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;