import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Mail, ExternalLink, Code, Heart, Zap } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import Card from '../components/Card';
import InteractiveElements from '../components/InteractiveElements';

const Home: React.FC = () => {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '25+', label: 'Projects Completed' },
    { number: '5+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Passion Driven' },
  ];

  const featuredProjects = [
    {
      title: '3D Interactive Portfolio',
      description: 'Immersive web experience built with Three.js and React',
      tech: ['React', 'Three.js', 'TypeScript'],
      gradient: 'from-accent-400 to-accent-600',
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Data visualization platform with machine learning insights',
      tech: ['Python', 'TensorFlow', 'React'],
      gradient: 'from-emerald-400 to-emerald-600',
    },
    {
      title: 'Flutter Mobile App',
      description: 'Cross-platform solution for enhanced user experience',
      tech: ['Flutter', 'Dart', 'Firebase'],
      gradient: 'from-primary-400 to-primary-600',
    },
  ];

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
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-emerald-400 rounded-full blur-lg opacity-50"></div>
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1"
                alt="Mohamed Fasin"
                className="relative w-full h-full rounded-full object-cover border-4 border-white/20"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Hello, I'm{' '}
            <span className="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent">
              Mohamed Fasin
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            An empathetic software engineer who crafts meaningful digital experiences through{' '}
            <span className="text-accent-400">full-stack development</span>,{' '}
            <span className="text-emerald-400">3D technologies</span>, and{' '}
            <span className="text-primary-400">AI-driven solutions</span>.
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A glimpse into my passion for creating impactful digital solutions
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
          >
            <Heart className="w-12 h-12 text-accent-400 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Building with Empathy
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              As an INFJ, I bring a unique perspective to software development - one that values
              human connection, intuitive design, and meaningful impact. Every line of code I write
              is crafted with the end user in mind, ensuring technology serves humanity.
            </p>
            <div className="flex justify-center items-center space-x-2 text-white/60">
              <Zap className="w-5 h-5" />
              <span>Powered by passion, guided by empathy</span>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;