import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Cpu, Globe, Palette } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Globe },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
    { id: 'ai', name: 'AI/ML', icon: Cpu },
    { id: '3d', name: '3D/Graphics', icon: Palette },
  ];

  const skills = [
    {
      name: 'React',
      category: 'frontend',
      level: 95,
      color: 'from-blue-400 to-blue-600',
      description: 'Advanced component architecture, hooks, and state management',
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      level: 90,
      color: 'from-blue-500 to-blue-700',
      description: 'Type-safe development with advanced patterns',
    },
    {
      name: 'PHP',
      category: 'backend',
      level: 90,
      color: 'from-purple-400 to-purple-600',
      description: 'Server-side development and API creation',
    },
    {
      name: 'Python',
      category: 'backend',
      level: 85,
      color: 'from-green-400 to-green-600',
      description: 'Backend development and data analysis',
    },
    {
      name: 'Flutter',
      category: 'mobile',
      level: 80,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Cross-platform mobile application development',
    },
    {
      name: 'Three.js',
      category: '3d',
      level: 75,
      color: 'from-orange-400 to-orange-600',
      description: '3D graphics and interactive web experiences',
    },
    {
      name: 'TensorFlow',
      category: 'ai',
      level: 70,
      color: 'from-red-400 to-red-600',
      description: 'Machine learning model development',
    },
    {
      name: 'Node.js',
      category: 'backend',
      level: 85,
      color: 'from-green-500 to-green-700',
      description: 'Server-side JavaScript development',
    },
    {
      name: 'Blender',
      category: '3d',
      level: 70,
      color: 'from-indigo-400 to-indigo-600',
      description: '3D modeling and animation',
    },
    {
      name: 'Unity',
      category: '3d',
      level: 65,
      color: 'from-gray-400 to-gray-600',
      description: 'Game development and interactive experiences',
    },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const SkillCard: React.FC<{ skill: any; index: number }> = ({ skill, index }) => (
    <Card delay={index * 0.1} className="group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
        <span className="text-accent-400 font-bold">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2 mb-4">
        <motion.div
          className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
      
      <p className="text-white/70 text-sm">{skill.description}</p>
    </Card>
  );

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Technical{' '}
              <span className="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              A comprehensive overview of my technical skills, tools, and technologies
              I use to bring ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Continuous Learning
            </h2>
            <p className="text-white/70 text-lg">
              My commitment to staying current with emerging technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <Code className="w-12 h-12 text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Current Focus</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Advanced React Patterns</li>
                <li>• WebGL and Three.js</li>
                <li>• AI/ML Integration</li>
                <li>• Cloud Architecture</li>
              </ul>
            </Card>

            <Card>
              <Database className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Next Goals</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Rust Programming</li>
                <li>• Kubernetes</li>
                <li>• Advanced 3D Graphics</li>
                <li>• Quantum Computing</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              My Technology Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Clean Code</h3>
                <p className="text-white/70 text-sm">
                  Writing maintainable, readable code that tells a story
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">User-Centric</h3>
                <p className="text-white/70 text-sm">
                  Always considering the end user's experience and needs
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                <p className="text-white/70 text-sm">
                  Embracing new technologies to solve old problems
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Skills;