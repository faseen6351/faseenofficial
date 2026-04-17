import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Database,
  Smartphone,
  Cpu,
  Globe,
  Brain,
  Languages,
  Terminal,
  Sparkles,
  Layers,
  GitBranch,
  Rocket,
  CircuitBoard,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SkillCategory =
  | 'all'
  | 'ai'
  | 'mobile'
  | 'frontend'
  | 'backend'
  | 'iot'
  | 'devops'
  | 'languages';

interface Skill {
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  level: number;
  years: string;
  color: string;
  description: string;
  tags: string[];
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const categories: { id: SkillCategory; name: string; icon: typeof Code2 }[] = [
    { id: 'all', name: 'All', icon: Layers },
    { id: 'ai', name: 'AI & Prompt Engineering', icon: Brain },
    { id: 'mobile', name: 'Mobile · Flutter', icon: Smartphone },
    { id: 'frontend', name: 'Frontend', icon: Globe },
    { id: 'backend', name: 'Backend & Data', icon: Database },
    { id: 'iot', name: 'IoT & Embedded', icon: CircuitBoard },
    { id: 'devops', name: 'DevOps & Tooling', icon: Cpu },
    { id: 'languages', name: 'Languages', icon: Languages },
  ];

  const skills: Skill[] = [
    // AI & Prompt Engineering
    {
      name: 'Prompt Engineering',
      category: 'ai',
      level: 94,
      years: '2+ yrs',
      color: 'from-cyan-400 to-blue-500',
      description:
        'Structured system prompts, chain-of-thought, few-shot design, evaluation loops, and guardrails for production LLM apps.',
      tags: ['System Prompts', 'Few-Shot', 'Evals', 'Guardrails'],
    },
    {
      name: 'LLM Integration · OpenAI · Claude · Gemini',
      category: 'ai',
      level: 92,
      years: '2+ yrs',
      color: 'from-violet-400 to-fuchsia-500',
      description:
        'End-to-end integration of frontier LLMs with streaming, function calling, tool use, and cost-optimized routing.',
      tags: ['OpenAI', 'Claude API', 'Gemini', 'Tool Use'],
    },
    {
      name: 'RAG & Vector Search',
      category: 'ai',
      level: 88,
      years: '1.5 yrs',
      color: 'from-purple-400 to-indigo-500',
      description:
        'Retrieval-augmented pipelines with chunking strategies, embeddings, hybrid search, and reranking.',
      tags: ['Pinecone', 'pgvector', 'Embeddings', 'Hybrid Search'],
    },
    {
      name: 'LangChain & Agent Orchestration',
      category: 'ai',
      level: 86,
      years: '1.5 yrs',
      color: 'from-emerald-400 to-teal-500',
      description:
        'Multi-step agents, tool routing, memory, and stateful workflows for autonomous task execution.',
      tags: ['LangChain', 'Agents', 'Tools', 'Memory'],
    },
    {
      name: 'AI Product Engineering',
      category: 'ai',
      level: 90,
      years: '2 yrs',
      color: 'from-sky-400 to-cyan-500',
      description:
        'Designing AI features that ship — from data collection to eval harnesses to user-facing UX patterns.',
      tags: ['Evals', 'UX Patterns', 'Observability'],
    },

    // Mobile
    {
      name: 'Flutter & Dart',
      category: 'mobile',
      level: 94,
      years: '3+ yrs',
      color: 'from-cyan-400 to-blue-500',
      description:
        'Production cross-platform apps published to the App Store and Google Play. State management, native channels, release automation.',
      tags: ['iOS', 'Android', 'Riverpod', 'Native Bridges'],
    },
    {
      name: 'iOS Publishing · App Store Connect',
      category: 'mobile',
      level: 88,
      years: '2 yrs',
      color: 'from-slate-400 to-slate-600',
      description:
        'End-to-end pipeline: signing, TestFlight, review, and phased rollouts on the Apple App Store.',
      tags: ['Xcode', 'TestFlight', 'Signing'],
    },
    {
      name: 'Android Publishing · Play Console',
      category: 'mobile',
      level: 90,
      years: '2 yrs',
      color: 'from-emerald-400 to-green-500',
      description:
        'Release tracks, signing keys, Play Console compliance, and staged rollouts with crash analytics.',
      tags: ['Play Console', 'Signing', 'Rollouts'],
    },
    {
      name: 'Firebase · Auth · Firestore · Functions',
      category: 'mobile',
      level: 91,
      years: '3 yrs',
      color: 'from-orange-400 to-amber-500',
      description:
        'Realtime data, auth, cloud functions, FCM, crashlytics — the backbone of shipped mobile products.',
      tags: ['Firestore', 'FCM', 'Crashlytics'],
    },

    // Frontend
    {
      name: 'React & TypeScript',
      category: 'frontend',
      level: 95,
      years: '3+ yrs',
      color: 'from-blue-400 to-cyan-500',
      description:
        'Type-safe component systems, hooks, advanced state, performance profiling, and composable architecture.',
      tags: ['Hooks', 'TS Generics', 'Perf'],
    },
    {
      name: 'Next.js & Vite',
      category: 'frontend',
      level: 90,
      years: '3 yrs',
      color: 'from-slate-300 to-slate-500',
      description:
        'SSR, RSC, edge runtimes, and lightning-fast Vite builds for production-grade web apps.',
      tags: ['SSR', 'RSC', 'Edge'],
    },
    {
      name: 'Tailwind · Framer Motion',
      category: 'frontend',
      level: 93,
      years: '3 yrs',
      color: 'from-teal-400 to-cyan-500',
      description:
        'Design-system thinking, micro-interactions, motion choreography, and accessible UI at speed.',
      tags: ['Design Systems', 'Motion', 'A11y'],
    },
    {
      name: 'Three.js / WebGL',
      category: 'frontend',
      level: 78,
      years: '2 yrs',
      color: 'from-rose-400 to-pink-500',
      description:
        'Interactive 3D experiences, shader basics, and performant WebGL visualizations.',
      tags: ['WebGL', 'Shaders', 'R3F'],
    },

    // Backend
    {
      name: 'Node.js & Express',
      category: 'backend',
      level: 91,
      years: '3 yrs',
      color: 'from-emerald-400 to-green-600',
      description:
        'REST + realtime APIs, auth, caching, and well-structured services that scale with the product.',
      tags: ['REST', 'WebSockets', 'Auth'],
    },
    {
      name: 'Python · FastAPI · Flask',
      category: 'backend',
      level: 90,
      years: '3 yrs',
      color: 'from-teal-400 to-emerald-500',
      description:
        'Async-first APIs, background workers, ML serving, and automation pipelines.',
      tags: ['FastAPI', 'Async', 'Workers'],
    },
    {
      name: 'PostgreSQL & MongoDB',
      category: 'backend',
      level: 88,
      years: '3 yrs',
      color: 'from-indigo-400 to-blue-600',
      description:
        'Schema design, indexing, query tuning, and choosing the right store for the workload.',
      tags: ['pgvector', 'Indexes', 'Modeling'],
    },
    {
      name: 'Automation · Selenium · Pandas',
      category: 'backend',
      level: 89,
      years: '3 yrs',
      color: 'from-yellow-400 to-amber-500',
      description:
        'Operational automation, scraping, ETL, and business-critical Python scripts that save hours.',
      tags: ['Selenium', 'Pandas', 'ETL'],
    },

    // IoT & Embedded
    {
      name: 'Raspberry Pi · Edge Computing',
      category: 'iot',
      level: 88,
      years: '3 yrs',
      color: 'from-rose-400 to-red-500',
      description:
        'Linux-based edge devices running Python services, camera pipelines, GPIO control, and headless deployments for real-world IoT products.',
      tags: ['Linux', 'Python', 'GPIO', 'Edge AI'],
    },
    {
      name: 'Arduino Uno · Microcontrollers',
      category: 'iot',
      level: 85,
      years: '3 yrs',
      color: 'from-teal-400 to-cyan-500',
      description:
        'Embedded C/C++ firmware, sensor networks, motor control, and hardware prototyping for practical automation projects.',
      tags: ['C/C++', 'Sensors', 'Actuators', 'Serial'],
    },
    {
      name: 'ESP32 · Wi-Fi IoT',
      category: 'iot',
      level: 82,
      years: '2 yrs',
      color: 'from-indigo-400 to-violet-500',
      description:
        'Connected devices with Wi-Fi, Bluetooth, MQTT telemetry, and OTA updates — bridging hardware to cloud backends.',
      tags: ['MQTT', 'Wi-Fi', 'BLE', 'OTA'],
    },
    {
      name: 'Hardware Prototyping & Integration',
      category: 'iot',
      level: 84,
      years: '3 yrs',
      color: 'from-amber-400 to-orange-500',
      description:
        'From breadboard to enclosure — sensor integration, I²C/SPI/UART protocols, 3D-printed housings, and field-ready deployments.',
      tags: ['I²C', 'SPI', 'UART', 'Prototyping'],
    },

    // DevOps
    {
      name: 'Docker & CI/CD',
      category: 'devops',
      level: 86,
      years: '2+ yrs',
      color: 'from-sky-400 to-blue-500',
      description:
        'Containerized apps, GitHub Actions pipelines, and repeatable deployments across environments.',
      tags: ['Docker', 'Actions', 'Pipelines'],
    },
    {
      name: 'Git & GitHub Workflow',
      category: 'devops',
      level: 96,
      years: '4 yrs',
      color: 'from-slate-400 to-gray-500',
      description:
        'Branching strategies, code review culture, conventional commits, and release engineering.',
      tags: ['Reviews', 'Releases', 'Strategy'],
    },
    {
      name: 'Cloud · Firebase · Vercel · Netlify',
      category: 'devops',
      level: 88,
      years: '3 yrs',
      color: 'from-orange-400 to-red-500',
      description:
        'Production deployments, edge functions, custom domains, and monitoring across providers.',
      tags: ['Edge', 'CDN', 'DNS'],
    },

    // Languages
    { name: 'English', category: 'languages', level: 98, years: 'Fluent', color: 'from-blue-400 to-cyan-500', description: 'Professional working proficiency — technical writing, client communication, documentation.', tags: ['Business', 'Technical'] },
    { name: 'Malayalam', category: 'languages', level: 100, years: 'Native', color: 'from-emerald-400 to-teal-500', description: 'Native speaker — Kerala, Thrissur origin.', tags: ['Native'] },
    { name: 'Hindi', category: 'languages', level: 70, years: 'Conversational', color: 'from-orange-400 to-amber-500', description: 'Comfortable in professional and daily conversation.', tags: ['Conversational'] },
    { name: 'Tamil', category: 'languages', level: 65, years: 'Conversational', color: 'from-yellow-400 to-orange-500', description: 'Conversational fluency.', tags: ['Conversational'] },
    { name: 'Arabic', category: 'languages', level: 40, years: 'Learning', color: 'from-green-400 to-emerald-500', description: 'Actively learning — UAE-based and growing daily.', tags: ['Foundational'] },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.04, ease: EASE },
    }),
  };

  const toolkit = [
    { label: 'OpenAI', group: 'ai' },
    { label: 'Claude API', group: 'ai' },
    { label: 'Gemini', group: 'ai' },
    { label: 'LangChain', group: 'ai' },
    { label: 'pgvector', group: 'ai' },
    { label: 'Flutter', group: 'mobile' },
    { label: 'Dart', group: 'mobile' },
    { label: 'React', group: 'frontend' },
    { label: 'TypeScript', group: 'frontend' },
    { label: 'Next.js', group: 'frontend' },
    { label: 'Tailwind', group: 'frontend' },
    { label: 'Framer Motion', group: 'frontend' },
    { label: 'Node.js', group: 'backend' },
    { label: 'Python', group: 'backend' },
    { label: 'FastAPI', group: 'backend' },
    { label: 'PostgreSQL', group: 'backend' },
    { label: 'MongoDB', group: 'backend' },
    { label: 'Firebase', group: 'backend' },
    { label: 'Raspberry Pi', group: 'iot' },
    { label: 'Arduino', group: 'iot' },
    { label: 'ESP32', group: 'iot' },
    { label: 'MQTT', group: 'iot' },
    { label: 'Docker', group: 'devops' },
    { label: 'GitHub Actions', group: 'devops' },
    { label: 'Vercel', group: 'devops' },
  ];

  return (
    <PageWrapper>
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-40 w-[30rem] h-[30rem] rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise · 2026</span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance"
          >
            Skills that{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ship products
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
          >
            A production-grade stack spanning AI & prompt engineering, Flutter mobile, modern web, backend services, and IoT — shipping real products, not just demos.
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="flex flex-wrap justify-center gap-2.5"
          >
            {categories.map((category) => {
              const active = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-white'
                      : 'text-white/55 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skills-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <category.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-colors duration-300 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${skill.color} pointer-events-none`}
                  />

                  <div className="flex items-start justify-between mb-4 relative">
                    <div>
                      <h3 className="text-base font-semibold text-white leading-tight">
                        {skill.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">{skill.years}</p>
                    </div>
                    <span className="text-cyan-300 font-semibold text-sm tabular-nums">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-4 overflow-hidden relative">
                    <motion.div
                      className={`h-1.5 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: index * 0.05, ease: EASE }}
                    />
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-white/[0.04] border border-white/10 text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Toolkit ribbon */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10"
          >
            <div className="flex items-center gap-2 mb-5 text-white/60 text-xs uppercase tracking-[0.18em]">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Daily Toolkit</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {toolkit.map((item, i) => (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.025, ease: EASE }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/10 text-white/70 hover:text-white hover:border-cyan-400/30 transition-colors cursor-default"
                >
                  {item.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Focus + Next Goals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Building forward
            </h2>
            <p className="text-white/50">
              Where I'm investing my learning in 2026
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5 text-cyan-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Actively Deepening
              </h3>
              <ul className="space-y-2.5 text-white/60 text-sm">
                {[
                  'Agentic workflows & multi-tool reasoning',
                  'Evaluation harnesses for LLM products',
                  'Flutter 3.x advanced state architecture',
                  'Edge AI on Raspberry Pi & ESP32',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-400/20 flex items-center justify-center mb-4">
                <GitBranch className="w-5 h-5 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Next Milestones
              </h3>
              <ul className="space-y-2.5 text-white/60 text-sm">
                {[
                  'Rust for high-performance backend services',
                  'Kubernetes & production observability',
                  'Fine-tuning & domain-specific LLMs',
                  'Distributed systems design patterns',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Skills;
