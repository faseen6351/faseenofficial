import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Users, Lightbulb, Award, BookOpen, Languages, Brain, Globe } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import { useTheme } from '../context/ThemeContext';

const About: React.FC = () => {
  const { isProfessional } = useTheme();
  const professionalValues = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'Building robust, scalable solutions with clean code and best practices.',
    },
    {
      icon: Brain,
      title: 'Innovation & Automation',
      description: 'Leveraging AI and automation to solve complex problems efficiently.',
    },
    {
      icon: Users,
      title: 'Collaborative Development',
      description: 'Great software is built through teamwork and knowledge sharing.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'Staying current with emerging technologies and industry trends.',
    },
  ];

  const personalValues = [
    {
      icon: Heart,
      title: 'Genuine Empathy',
      description: 'Understanding and sharing the feelings of others with authentic care.',
    },
    {
      icon: Languages,
      title: 'Cultural Bridge Building',
      description: 'Connecting people across languages and cultural boundaries.',
    },
    {
      icon: Users,
      title: 'Deep Connections',
      description: 'Building meaningful relationships based on trust and understanding.',
    },
    {
      icon: Brain,
      title: 'Emotional Intelligence',
      description: 'Reading emotions and responding with sensitivity and wisdom.',
    },
  ];

  const values = isProfessional ? professionalValues : personalValues;

  const journey = [
    {
      year: '2024',
      title: 'Software Engineer at Absons IT Solutions',
      description: 'Leading full-stack development projects and mentoring junior developers.',
    },
    {
      year: '2023',
      title: 'Freelance Developer',
      description: 'Specialized in React, PHP, and 3D web development projects.',
    },
    {
      year: '2022',
      title: 'Computer Science Studies',
      description: 'Focused on software engineering principles and AI/ML fundamentals.',
    },
    {
      year: '2021',
      title: 'Started Coding Journey',
      description: 'Discovered my passion for creating meaningful digital experiences.',
    },
  ];

  const certifications = [
    'Full-Stack Web Development',
    'React Advanced Patterns',
    'PHP Professional Development',
    '3D Graphics Programming',
    'AI/ML Fundamentals',
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              key={isProfessional ? 'prof-about' : 'pers-about'}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                About{' '}
                <span className={`bg-gradient-to-r ${isProfessional ? 'from-accent-400 to-emerald-400' : 'from-pink-400 to-rose-400'} bg-clip-text text-transparent`}>
                  Mohamed Fasin
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {isProfessional ? (
                  <>
                    I'm a passionate software engineer specializing in Python automation, React web applications,
                    backend development, and AI integration. With a focus on clean code and innovative solutions,
                    I build systems that are scalable, efficient, and user-centric.
                  </>
                ) : (
                  <>
                    I'm a multilingual connector with a natural gift for understanding people across cultures.
                    My emotional intelligence and language learning abilities allow me to build deep, meaningful
                    connections and bridge cultural divides with ease and authenticity.
                  </>
                )}
              </p>
              <div className="flex items-center space-x-4 text-white/60">
                {isProfessional ? (
                  <>
                    <Code className="w-6 h-6 text-accent-400" />
                    <span className="text-lg">Full-Stack Engineer • AI Enthusiast</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-6 h-6 text-pink-400" />
                    <span className="text-lg">INFJ • Multilingual Connector</span>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div
              key={isProfessional ? 'prof-img' : 'pers-img'}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${isProfessional ? 'from-accent-400/20 to-emerald-400/20' : 'from-pink-400/20 to-rose-400/20'} rounded-2xl blur-xl`}></div>
              <img
                src={isProfessional ? '/FaseenLogo.png' : '/FaseenPersonal.jpg'}
                alt="Mohamed Fasin"
                className="relative w-full h-96 object-cover rounded-2xl border border-white/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={isProfessional ? 'prof-values' : 'pers-values'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Core Values
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {isProfessional
                ? 'The principles that guide my approach to software development'
                : 'The values that define how I connect with and understand people'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} delay={index * 0.2}>
                <value.icon className="w-12 h-12 text-accent-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              My Journey
            </h2>
            <p className="text-white/70 text-lg">
              A timeline of growth, learning, and meaningful experiences
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-400 to-emerald-400"></div>
            
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start mb-12"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold mr-8">
                  {item.year}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <BookOpen className="w-12 h-12 text-accent-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Computer Science</h4>
                    <p className="text-white/70">University Studies</p>
                    <p className="text-white/60 text-sm">Focus: Software Engineering, AI/ML</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <Award className="w-12 h-12 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Certifications</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-white/80">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Touch */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center" key={isProfessional ? 'prof-perspective' : 'pers-perspective'}>
            {isProfessional ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Bridging Technology & Humanity
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  My INFJ personality brings a unique perspective to software engineering. I don't just build
                  applications; I create solutions that understand and serve human needs. This empathetic approach,
                  combined with technical expertise, allows me to develop software that truly makes a difference
                  in people's lives.
                </p>
                <div className="flex justify-center items-center space-x-2 text-white/60">
                  <Globe className="w-5 h-5" />
                  <span>Technology with a human touch</span>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-6">
                  The INFJ Perspective
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  As an INFJ, I possess a rare combination of intuition, empathy, and deep understanding of human
                  nature. This allows me to connect with people on a profound level, understand their emotions
                  before they're spoken, and create genuine bonds across any cultural or linguistic barrier.
                  My language learning abilities amplify this natural gift.
                </p>
                <div className="flex justify-center space-x-8 text-white/60">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">I</div>
                    <div className="text-sm">Introverted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">N</div>
                    <div className="text-sm">Intuitive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">F</div>
                    <div className="text-sm">Feeling</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">J</div>
                    <div className="text-sm">Judging</div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;