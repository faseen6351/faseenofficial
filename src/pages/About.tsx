import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Brain,
  Users,
  Lightbulb,
  BookOpen,
  Award,
  MapPin,
  Briefcase,
  Rocket,
  Terminal,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const About: React.FC = () => {
  const values = [
    {
      icon: Brain,
      title: 'AI-First Mindset',
      description:
        'I build with modern AI tooling: LLM APIs, RAG, agents, and precision prompt engineering baked into production systems.',
    },
    {
      icon: Terminal,
      title: 'Prompt Engineering',
      description:
        'Structured prompts, evaluation loops, guardrails. I treat prompts as code — versioned, tested, and optimized.',
    },
    {
      icon: Rocket,
      title: 'Solutions Thinking',
      description:
        'I solve problems, not tickets. Every build starts with understanding the business outcome — then engineering backwards.',
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description:
        'Clean architecture, type-safe code, and deliberate trade-offs. Software that scales and is maintainable.',
    },
    {
      icon: Users,
      title: 'Collaborative Delivery',
      description:
        'Tight feedback loops with stakeholders and teammates. I communicate clearly and ship transparently.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description:
        'Staying ahead — AI/LLMs, Flutter, cloud-native, and IoT hardware. Always one step forward.',
    },
  ];

  const journey = [
    {
      year: '2026',
      title: 'Solutions Builder & AI Engineer',
      company: 'Absons IT Solutions · Abu Dhabi, UAE',
      description:
        'Leading end-to-end product delivery — architecture through App Store, Google Play, and Web production. Integrating AI-powered features, LLM workflows, and prompt-engineered automations into core products.',
      current: true,
    },
    {
      year: '2024–2025',
      title: 'Software Engineer',
      company: 'Absons IT Solutions · Abu Dhabi, UAE',
      description:
        'Delivered a complete end-to-end solution: iOS app (App Store), Android app (Google Play), and full-stack Web application — all live in production with real users.',
      current: false,
    },
    {
      year: '2023',
      title: 'Freelance Developer',
      company: 'Independent',
      description:
        'Built custom React, PHP, Python, and 3D web solutions for clients across domains. Sharpened end-to-end delivery instincts.',
      current: false,
    },
    {
      year: '2022',
      title: 'Computer Science Studies',
      company: 'University',
      description:
        'Focused on software engineering foundations, algorithms, and AI/ML fundamentals.',
      current: false,
    },
    {
      year: '2021',
      title: 'Started Engineering Journey',
      company: 'Self-Directed',
      description:
        'Built first projects in Python and web technologies. Discovered a passion for shipping software end-to-end.',
      current: false,
    },
  ];

  const certifications = [
    'Prompt Engineering with LLMs',
    'AI / Machine Learning Fundamentals',
    'Flutter & Dart — Mobile Development',
    'Full-Stack Web Development',
    'React Advanced Patterns',
    'IoT & Embedded Systems — Raspberry Pi · Arduino',
    'Python Automation & Data Processing',
    'Cloud Deployment & DevOps',
  ];

  const quickFacts = [
    { label: 'Location', value: 'Abu Dhabi, UAE' },
    { label: 'Visa Status', value: 'Own UAE Visa' },
    { label: 'Origin', value: 'Kerala, Thrissur, India' },
    { label: 'Availability', value: 'Open to new roles' },
    { label: 'Response Time', value: 'Within 24 hours' },
    { label: 'Languages', value: 'English · Malayalam · Hindi · Tamil' },
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center px-4 py-1.5 mb-6 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                <Briefcase className="w-4 h-4 mr-2" />
                Solutions Builder & AI Engineer
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight text-balance">
                About{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Mohamed Fasin
                </span>
              </h1>

              <div className="space-y-5 text-lg text-white/60 leading-relaxed">
                <p>
                  I'm an <span className="text-white/80 font-medium">AI engineer and prompt specialist</span>{' '}
                  who ships complete products. Based in Abu Dhabi, UAE — taking ideas from concept to
                  production across iOS, Android, Web, and IoT with{' '}
                  <span className="text-white/80 font-medium">LLM APIs, Flutter, React, TypeScript, and Python.</span>
                </p>
                <p>
                  At <span className="text-white/80 font-medium">Absons IT Solutions</span>, I shipped a full
                  end-to-end solution: a Flutter-built mobile app{' '}
                  <span className="text-cyan-400">published on the Apple App Store and Google Play</span>,
                  plus a companion web platform running in production.
                </p>
                <p>
                  I integrate OpenAI, Claude, and Gemini APIs, design RAG pipelines, build agents, and
                  engineer prompts with the same discipline as code. I also work hands-on with{' '}
                  <span className="text-white/80 font-medium">Raspberry Pi, Arduino, and ESP32</span> — bridging
                  software and hardware when a product demands it.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Abu Dhabi, UAE
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Own UAE Visa
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  AI-Native Engineer
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <img
                  src="/FaseenLogo.png"
                  alt="Mohamed Fasin"
                  className="w-full h-64 object-contain mb-6"
                />
                <div className="border-t border-white/10 pt-6 space-y-3">
                  {quickFacts.slice(0, 4).map((fact) => (
                    <div key={fact.label} className="flex justify-between text-sm">
                      <span className="text-white/40">{fact.label}</span>
                      <span className="text-white/80 font-medium">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              How I Operate
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Principles that shape every project I take on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
                className="group p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Career Journey
            </h2>
            <p className="text-white/50 text-lg">
              A timeline of growth, shipped work, and key milestones.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-cyan-400/20 to-transparent" />

            {journey.map((item, index) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="relative flex-shrink-0 mt-1.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      item.current
                        ? 'bg-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/40'
                        : 'bg-slate-900 border-white/20'
                    }`}
                  >
                    {item.current && (
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="flex-grow pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 text-xs font-mono font-semibold tracking-wider">
                      {item.year}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <div className="text-white/50 text-sm mb-3">{item.company}</div>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Education</h3>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Computer Science</h4>
                <p className="text-white/50">University Studies</p>
                <p className="text-white/40 text-sm">Focus: Software Engineering · AI/ML · Systems Design</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
