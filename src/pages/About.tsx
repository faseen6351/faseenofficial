import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Users, Lightbulb, Award, BookOpen } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Empathy-Driven Development',
      description: 'I believe technology should serve humanity, not the other way around.',
    },
    {
      icon: Code,
      title: 'Craftsmanship',
      description: 'Every line of code is written with purpose, clarity, and maintainability.',
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'Great software is built by great teams working together.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'The tech landscape evolves rapidly, and so do I.',
    },
  ];

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
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent">
                  Mohamed Fasin
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                I'm a passionate software engineer who believes in the power of technology to create
                meaningful human connections. My journey in software development is driven by empathy,
                curiosity, and a deep desire to solve real-world problems.
              </p>
              <div className="flex items-center space-x-4 text-white/60">
                <Heart className="w-6 h-6 text-accent-400" />
                <span className="text-lg">INFJ • Empathetic Problem Solver</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-emerald-400/20 rounded-2xl blur-xl"></div>
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Core Values
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              The principles that guide my approach to software development and life
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
          <Card className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              The INFJ Perspective
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              As an INFJ, I bring a unique blend of analytical thinking and emotional intelligence
              to software development. I see beyond the code to understand the human stories it tells
              and the problems it solves. This perspective allows me to create not just functional
              software, but meaningful experiences that resonate with users.
            </p>
            <div className="flex justify-center space-x-8 text-white/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">I</div>
                <div className="text-sm">Introverted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">N</div>
                <div className="text-sm">Intuitive</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">F</div>
                <div className="text-sm">Feeling</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-400">J</div>
                <div className="text-sm">Judging</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;