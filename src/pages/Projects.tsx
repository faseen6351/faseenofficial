import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Apple,
  Smartphone,
  Globe,
  CheckCircle2,
  Brain,
  Bot,
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  Code2,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { Link } from 'react-router-dom';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Category = 'all' | 'mobile' | 'web' | 'ai' | 'fullstack';

interface Project {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, 'all'>;
  badge: string;
  badgeColor: string;
  technologies: string[];
  storeLabel?: string;
  storeIcon?: typeof Apple;
  featured: boolean;
  achievement: string;
  year: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filters: { id: Category; name: string; icon: typeof Layers }[] = [
    { id: 'all', name: 'All Work', icon: Layers },
    { id: 'mobile', name: 'Flutter · Mobile', icon: Smartphone },
    { id: 'web', name: 'Web Apps', icon: Globe },
    { id: 'ai', name: 'AI Engineering', icon: Brain },
    { id: 'fullstack', name: 'Full-Stack', icon: Code2 },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Absons Business Suite — iOS',
      description:
        'Flagship iOS application built with Flutter for Absons IT Solutions. Covers business workflows, client management, and real-time sync — designed, engineered, and shipped end-to-end to the Apple App Store.',
      category: 'mobile',
      badge: 'Published · App Store',
      badgeColor: 'bg-white/5 border-white/20 text-white',
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'iOS'],
      storeLabel: 'App Store',
      storeIcon: Apple,
      featured: true,
      achievement: 'Full lifecycle — architecture to App Store review',
      year: '2025',
    },
    {
      id: 2,
      title: 'Absons Business Suite — Android',
      description:
        'Cross-platform Android release built from the same Flutter codebase with platform-specific tuning. Published on Google Play with phased rollout, analytics, and active production users.',
      category: 'mobile',
      badge: 'Published · Google Play',
      badgeColor: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Play Console', 'Android'],
      storeLabel: 'Google Play',
      storeIcon: Smartphone,
      featured: true,
      achievement: 'Single Flutter codebase · dual-store publication',
      year: '2025',
    },
    {
      id: 3,
      title: 'Absons Web Application',
      description:
        'Full-stack web platform powering the Absons ecosystem. Admin dashboard, client portals, realtime updates, and a clean API layer — deployed and running in production.',
      category: 'web',
      badge: 'Live · Production',
      badgeColor: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind'],
      storeLabel: 'Live App',
      storeIcon: Globe,
      featured: true,
      achievement: 'Frontend · Backend · Deployment — delivered end-to-end',
      year: '2025',
    },
    {
      id: 4,
      title: 'AI Assistant · Elly',
      description:
        'A production-grade AI assistant embedded in this portfolio — built with carefully engineered system prompts, intent routing, conversational memory, and a typed service layer over modern LLM APIs.',
      category: 'ai',
      badge: 'Live · AI Feature',
      badgeColor: 'bg-violet-500/10 border-violet-400/30 text-violet-300',
      technologies: ['TypeScript', 'LLM APIs', 'Prompt Engineering', 'React'],
      featured: false,
      achievement: 'Custom prompt architecture with intent routing',
      year: '2026',
    },
    {
      id: 5,
      title: 'RAG Knowledge Assistant',
      description:
        'Retrieval-augmented assistant over private knowledge bases. Chunking, embeddings, hybrid search, and reranking — delivered as a clean API and embeddable chat UI.',
      category: 'ai',
      badge: 'AI Engineering',
      badgeColor: 'bg-purple-500/10 border-purple-400/30 text-purple-300',
      technologies: ['Python', 'FastAPI', 'pgvector', 'LangChain', 'OpenAI'],
      featured: false,
      achievement: 'Hybrid search + reranking for grounded answers',
      year: '2026',
    },
    {
      id: 6,
      title: 'Python Automation Suite',
      description:
        'Business-critical automation — ETL, reporting, scraping with Selenium, and scheduled pipelines. Replaces hours of manual ops with reliable, observable scripts.',
      category: 'ai',
      badge: 'Internal Tooling',
      badgeColor: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300',
      technologies: ['Python', 'Selenium', 'Pandas', 'FastAPI', 'Cron'],
      featured: false,
      achievement: '80%+ reduction in recurring manual work',
      year: '2024',
    },
    {
      id: 7,
      title: 'Enterprise Collaboration Platform',
      description:
        'Scalable full-stack web app with realtime collaboration, role-based access, automated reporting, and audit trails for distributed teams.',
      category: 'fullstack',
      badge: 'Case Study',
      badgeColor: 'bg-blue-500/10 border-blue-400/30 text-blue-300',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'],
      featured: false,
      achievement: 'Realtime multi-user collaboration engine',
      year: '2024',
    },
    {
      id: 8,
      title: 'Flutter E-Commerce App',
      description:
        'Production-style Flutter e-commerce build — elegant UI, Stripe payments, inventory sync, and push notifications. Showcase of end-to-end mobile product delivery.',
      category: 'mobile',
      badge: 'Case Study',
      badgeColor: 'bg-amber-500/10 border-amber-400/30 text-amber-300',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe', 'Riverpod'],
      featured: false,
      achievement: 'Full payment + inventory flow in Flutter',
      year: '2024',
    },
    {
      id: 9,
      title: 'Prompt Engineering Playbook',
      description:
        'An internal evaluation harness for LLM prompts — structured templates, test suites, regression runs, and cost/quality tracking across model vendors.',
      category: 'ai',
      badge: 'Tooling',
      badgeColor: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300',
      technologies: ['TypeScript', 'Evals', 'OpenAI', 'Claude', 'Gemini'],
      featured: false,
      achievement: 'Systematic prompt design and regression testing',
      year: '2026',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const featuredProjects = projects.filter((p) => p.featured);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
    }),
  };

  return (
    <PageWrapper>
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 -left-32 w-[28rem] h-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-violet-500/10 blur-3xl"
        />
      </div>

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium tracking-wide mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shipped Work · 2026</span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance"
          >
            Published &{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              production projects
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-base sm:text-lg text-white/55 max-w-3xl mx-auto leading-relaxed"
          >
            Flutter apps live on the App Store and Google Play, web apps in production, and AI systems designed with careful prompt engineering. Real software that real people use.
          </motion.p>
        </div>
      </section>

      {/* Featured: Published Apps */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Flagship · Published & Live
              </h2>
              <p className="text-white/50 text-sm mt-0.5">
                iOS · Android · Web — shipped end-to-end for Absons IT Solutions
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 transition-colors duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

                <div className="relative flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center">
                    {project.storeIcon && (
                      <project.storeIcon className="w-5 h-5 text-cyan-300" />
                    )}
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-full border ${project.badgeColor}`}
                  >
                    {project.badge}
                  </span>
                </div>

                <div className="relative flex-grow">
                  <div className="flex items-center gap-2 mb-2 text-white/40 text-[11px] uppercase tracking-[0.14em]">
                    <span>{project.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="capitalize">{project.category}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2.5 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                <div className="relative p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/20 mb-4">
                  <p className="text-cyan-200 text-xs font-medium leading-snug">
                    {project.achievement}
                  </p>
                </div>

                <div className="relative flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-white/[0.04] border border-white/10 text-white/55"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 border-t border-white/5 pt-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
                Complete portfolio
              </h2>
              <p className="text-white/50 text-sm">
                Filter by discipline to see how the pieces fit together.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <motion.button
                  key={filter.id}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-white'
                      : 'text-white/55 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projects-active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <filter.icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{filter.name}</span>
                </motion.button>
              );
            })}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 rounded-2xl p-5 flex flex-col transition-colors duration-300 overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-medium rounded-full border ${project.badgeColor}`}
                    >
                      {project.badge}
                    </span>
                    <span className="text-white/35 text-[11px] tabular-nums">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>

                  <p className="text-cyan-300/80 text-[11.5px] mb-4 italic leading-snug">
                    {project.achievement}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10.5px] font-medium bg-white/[0.04] border border-white/10 text-white/55"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Capabilities strip */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { icon: Smartphone, label: 'Flutter iOS + Android', sub: 'Published apps' },
              { icon: Globe, label: 'Full-Stack Web', sub: 'React · Node · TS' },
              { icon: Brain, label: 'AI Engineering', sub: 'LLMs · RAG · Agents' },
              { icon: Bot, label: 'Prompt Engineering', sub: 'Designed for production' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium leading-tight">
                    {item.label}
                  </div>
                  <div className="text-white/45 text-[11.5px] mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium tracking-wide mb-6">
              <Cpu className="w-3.5 h-3.5" />
              <span>Available for new work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Have a product to ship?
            </h2>
            <p className="text-white/55 text-base sm:text-lg mb-8 leading-relaxed">
              I build complete digital products — mobile, web, AI — from architecture to publication. Let's talk about yours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200"
            >
              <span>Start a project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;
