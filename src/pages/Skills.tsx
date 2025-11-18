import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Cpu, Globe, Palette, Languages, Heart, Users, Brain, Lightbulb, MessageCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import { useTheme } from '../context/ThemeContext';

const Skills: React.FC = () => {
  const { isProfessional } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');

  const professionalCategories = [
    { id: 'all', name: 'All Skills', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Globe },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'automation', name: 'Automation', icon: Cpu },
    { id: 'ai', name: 'AI/ML', icon: Brain },
    { id: 'languages', name: 'Languages', icon: Languages },
  ];

  const personalCategories = [
    { id: 'all', name: 'All Strengths', icon: Heart },
    { id: 'languages', name: 'Languages', icon: Languages },
    { id: 'emotional', name: 'Emotional', icon: Heart },
    { id: 'social', name: 'Social', icon: Users },
    { id: 'cognitive', name: 'Cognitive', icon: Brain },
  ];

  const skillCategories = isProfessional ? professionalCategories : personalCategories;

  const professionalSkills = [
    {
      name: 'React & TypeScript',
      category: 'frontend',
      level: 95,
      color: 'from-blue-400 to-blue-600',
      description: 'Advanced component architecture, hooks, state management, and type-safe development',
    },
    {
      name: 'Python Automation',
      category: 'automation',
      level: 92,
      color: 'from-green-400 to-green-600',
      description: 'Workflow automation, web scraping, data processing with Selenium and Pandas',
    },
    {
      name: 'Node.js & Express',
      category: 'backend',
      level: 90,
      color: 'from-green-500 to-green-700',
      description: 'RESTful APIs, microservices, and scalable backend architecture',
    },
    {
      name: 'AI & Machine Learning',
      category: 'ai',
      level: 85,
      color: 'from-purple-400 to-purple-600',
      description: 'TensorFlow, OpenAI integration, and intelligent automation tools',
    },
    {
      name: 'MongoDB & PostgreSQL',
      category: 'backend',
      level: 88,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Database design, optimization, and data modeling',
    },
    {
      name: 'FastAPI & Flask',
      category: 'backend',
      level: 87,
      color: 'from-teal-400 to-teal-600',
      description: 'High-performance Python APIs with async support',
    },
    {
      name: 'Malayalam',
      category: 'languages',
      level: 100,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Native language from Kerala, Thrissur with complete fluency',
    },
    {
      name: 'English',
      category: 'languages',
      level: 98,
      color: 'from-blue-400 to-blue-600',
      description: 'Fluent, almost native-level proficiency in speaking, writing, and professional communication',
    },
    {
      name: 'Hindi',
      category: 'languages',
      level: 60,
      color: 'from-orange-400 to-orange-600',
      description: 'Good conversational proficiency for connecting across North India',
    },
    {
      name: 'Tamil',
      category: 'languages',
      level: 60,
      color: 'from-yellow-400 to-yellow-600',
      description: 'Conversational proficiency with cultural understanding',
    },
    {
      name: 'Arabic',
      category: 'languages',
      level: 35,
      color: 'from-green-400 to-green-600',
      description: 'Currently learning, building foundation in this beautiful language',
    },
    {
      name: 'Spanish',
      category: 'languages',
      level: 30,
      color: 'from-red-400 to-red-600',
      description: 'Currently learning, exploring Hispanic language and culture',
    },
    {
      name: 'Docker & CI/CD',
      category: 'automation',
      level: 82,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Containerization, deployment automation, and DevOps practices',
    },
    {
      name: 'Git & GitHub',
      category: 'automation',
      level: 93,
      color: 'from-gray-400 to-gray-600',
      description: 'Version control, collaboration workflows, and CI/CD integration',
    },
  ];

  const personalSkills = [
    {
      name: 'Malayalam',
      category: 'languages',
      level: 100,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Native speaker from Kerala with deep cultural roots and linguistic mastery',
    },
    {
      name: 'English',
      category: 'languages',
      level: 98,
      color: 'from-blue-400 to-blue-600',
      description: 'Fluent, almost native-level proficiency with nuanced cultural understanding',
    },
    {
      name: 'Hindi',
      category: 'languages',
      level: 60,
      color: 'from-orange-400 to-orange-600',
      description: 'Comfortable conversational skills for connecting across regions',
    },
    {
      name: 'Tamil',
      category: 'languages',
      level: 60,
      color: 'from-yellow-400 to-yellow-600',
      description: 'Strong conversational proficiency with cultural appreciation',
    },
    {
      name: 'Arabic',
      category: 'languages',
      level: 35,
      color: 'from-green-400 to-green-600',
      description: 'Enthusiastic learner building foundation in this beautiful language',
    },
    {
      name: 'Spanish',
      category: 'languages',
      level: 30,
      color: 'from-red-400 to-red-600',
      description: 'Passionate beginner exploring Hispanic language and culture',
    },
    {
      name: 'Trusted Listener & Problem Solver',
      category: 'emotional',
      level: 98,
      color: 'from-purple-400 to-purple-600',
      description: 'Friends rely on me as their go-to person for listening and providing thoughtful suggestions to solve their problems',
    },
    {
      name: 'Leadership & Presence',
      category: 'social',
      level: 95,
      color: 'from-indigo-400 to-indigo-600',
      description: 'Natural leadership qualities with a commanding yet approachable aura that inspires others',
    },
    {
      name: 'Safe Space Creator',
      category: 'emotional',
      level: 97,
      color: 'from-pink-400 to-pink-600',
      description: 'Exceptional ability to create safe, judgment-free environments where people feel comfortable sharing anything',
    },
    {
      name: 'Emotional Intelligence',
      category: 'emotional',
      level: 93,
      color: 'from-rose-400 to-rose-600',
      description: 'Deep awareness and management of emotions, both my own and others',
    },
    {
      name: 'Cultural Sensitivity',
      category: 'social',
      level: 92,
      color: 'from-purple-400 to-purple-600',
      description: 'Deep respect and understanding of diverse cultural perspectives',
    },
    {
      name: 'Interpersonal Connection',
      category: 'social',
      level: 90,
      color: 'from-amber-400 to-amber-600',
      description: 'Building genuine, meaningful relationships across all backgrounds',
    },
    {
      name: 'Intuitive Understanding',
      category: 'cognitive',
      level: 88,
      color: 'from-cyan-400 to-cyan-600',
      description: 'Reading between the lines and understanding unspoken needs',
    },
    {
      name: 'Adaptability',
      category: 'cognitive',
      level: 90,
      color: 'from-teal-400 to-teal-600',
      description: 'Seamlessly adjusting communication style to different contexts',
    },
    {
      name: 'Patience & Understanding',
      category: 'emotional',
      level: 94,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Giving people space and time to express themselves fully',
    },
  ];

  const skills = isProfessional ? professionalSkills : personalSkills;

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const SkillCard: React.FC<{ skill: any; index: number }> = ({ skill, index }) => (
    <Card delay={index * 0.1} className="group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
        <span className="text-accent-400 font-bold">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
        <motion.div
          className={`h-2 bg-gradient-to-r ${skill.color} rounded-full relative`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.1 + 1.2
            }}
          />
        </motion.div>
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
            key={isProfessional ? 'prof-header' : 'pers-header'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {isProfessional ? 'Technical ' : 'Personal '}
              <span className={`bg-gradient-to-r ${isProfessional ? 'from-accent-400 to-emerald-400' : 'from-pink-400 to-rose-400'} bg-clip-text text-transparent`}>
                {isProfessional ? 'Expertise' : 'Strengths'}
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              {isProfessional
                ? 'A comprehensive overview of my technical skills, tools, and technologies I use to build innovative solutions'
                : 'My unique abilities in connecting with people, learning languages, and understanding emotions deeply'
              }
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
            key={isProfessional ? 'prof-learning' : 'pers-learning'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {isProfessional ? 'Continuous Learning' : 'Growing & Evolving'}
            </h2>
            <p className="text-white/70 text-lg">
              {isProfessional
                ? 'My commitment to staying current with emerging technologies'
                : 'My journey of personal growth and expanding connections'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {isProfessional ? (
              <>
                <Card>
                  <Code className="w-12 h-12 text-accent-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Current Focus</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Advanced AI Integration</li>
                    <li>• Cloud-Native Architecture</li>
                    <li>• Real-time Web Applications</li>
                    <li>• Advanced Python Automation</li>
                  </ul>
                </Card>

                <Card>
                  <Cpu className="w-12 h-12 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Next Goals</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Rust Programming</li>
                    <li>• Kubernetes & DevOps</li>
                    <li>• Advanced ML Models</li>
                    <li>• Distributed Systems</li>
                  </ul>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <Languages className="w-12 h-12 text-pink-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Language Goals</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Master Japanese</li>
                    <li>• Improve French fluency</li>
                    <li>• Learn Mandarin Chinese</li>
                    <li>• Explore Portuguese</li>
                  </ul>
                </Card>

                <Card>
                  <Heart className="w-12 h-12 text-rose-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Personal Growth</h3>
                  <ul className="space-y-2 text-white/70">
                    <li>• Deepen cultural understanding</li>
                    <li>• Strengthen empathy skills</li>
                    <li>• Build global connections</li>
                    <li>• Practice mindful listening</li>
                  </ul>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center" key={isProfessional ? 'prof-phil' : 'pers-phil'}>
            <h2 className="text-3xl font-bold text-white mb-6">
              {isProfessional ? 'My Technology Philosophy' : 'My Connection Philosophy'}
            </h2>
            {isProfessional ? (
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-white/70 text-sm">
                    Embracing new technologies to solve complex problems
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Genuine Empathy</h3>
                  <p className="text-white/70 text-sm">
                    Understanding feelings deeply and responding with authenticity
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bridge Building</h3>
                  <p className="text-white/70 text-sm">
                    Connecting people across cultures and languages
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Deep Understanding</h3>
                  <p className="text-white/70 text-sm">
                    Reading beyond words to grasp true meaning and intent
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Skills;