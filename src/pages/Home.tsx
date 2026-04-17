import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Smartphone,
  Globe,
  Apple,
  Code2,
  Sparkles,
  Users,
  CheckCircle2,
  Zap,
  Brain,
  Rocket,
  Terminal,
  CircuitBoard,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Home: React.FC = () => {
  const stats = [
    { number: '3+', label: 'Years Shipping Production' },
    { number: '3', label: 'Published Apps (iOS · Android · Web)' },
    { number: '20+', label: 'End-to-End Solutions' },
    { number: 'AI', label: 'Engineer & Prompt Specialist' },
  ];

  const publishedApps = [
    {
      icon: Apple,
      title: 'iOS Application',
      subtitle: 'Apple App Store',
      description: 'Flutter-built production iOS app — submitted, reviewed, and published through the full Apple release pipeline.',
      status: 'Live on App Store',
    },
    {
      icon: Smartphone,
      title: 'Android Application',
      subtitle: 'Google Play Store',
      description: 'Shipped to Google Play with full cross-platform parity. Single Flutter codebase, dual-platform release.',
      status: 'Live on Google Play',
    },
    {
      icon: Globe,
      title: 'Web Application',
      subtitle: 'Live in Production',
      description: 'Full-stack web app serving real users — from architecture and UI to backend, APIs, and deployment.',
      status: 'Live in Production',
    },
  ];

  const capabilities = [
    {
      icon: Brain,
      title: 'AI Engineer',
      desc: 'LLM integration (OpenAI, Claude, Gemini), RAG pipelines, agent orchestration, and production-grade AI features that ship.',
    },
    {
      icon: Terminal,
      title: 'Prompt Engineering',
      desc: 'Structured prompting, chain-of-thought design, guardrails, evaluation loops, and cost-efficient token strategies.',
    },
    {
      icon: Smartphone,
      title: 'Flutter Mobile Engineer',
      desc: 'Cross-platform iOS & Android with Flutter / Dart. Published apps live on the App Store and Google Play.',
    },
    {
      icon: Code2,
      title: 'Full-Stack Web',
      desc: 'React · TypeScript · Node.js · FastAPI · PostgreSQL — performant UIs backed by clean, scalable services.',
    },
    {
      icon: CircuitBoard,
      title: 'IoT & Embedded',
      desc: 'Raspberry Pi, Arduino Uno, and ESP32 — bridging firmware, sensors, and cloud for real-world hardware products.',
    },
    {
      icon: Rocket,
      title: 'Solutions Builder',
      desc: 'Full product ownership — discovery, architecture, build, launch. A thinking partner who ships, not a code-factory.',
    },
  ];

  const techStack = [
    'OpenAI', 'Claude API', 'Gemini', 'LangChain',
    'Flutter', 'Dart', 'React', 'TypeScript', 'Next.js',
    'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Firebase',
    'Raspberry Pi', 'Arduino', 'ESP32',
    'Docker', 'Tailwind',
  ];

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center px-4 py-1.5 mb-8 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm"
          >
            <span className="relative flex w-2 h-2 mr-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-400" />
            </span>
            Open to opportunities · Abu Dhabi, UAE · Own Visa
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight text-balance"
          >
            Mohamed{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Fasin
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-xl sm:text-2xl text-white/70 font-light mb-6 tracking-tight"
          >
            Solutions Builder · <span className="text-cyan-400 font-medium">AI Engineer</span> · Full-Stack Developer
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-lg text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed text-balance"
          >
            I architect AI-powered systems, engineer production prompts, and ship complete digital products —
            iOS, Android, Web, and IoT. At{' '}
            <span className="text-white/80 font-medium">Absons IT Solutions</span>, I delivered a
            complete end-to-end solution published on the App Store, Google Play, and Web.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
            >
              View Published Work
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white/15 hover:border-cyan-500/40 hover:bg-white/5 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              Hire Me
            </Link>
          </motion.div>

          {/* Tech Stack ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.03 }}
                className="px-3 py-1 bg-white/[0.04] border border-white/10 text-white/50 text-xs font-medium rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-colors duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/50 text-xs uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Published Apps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Published & Live
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Complete End-to-End{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Delivery
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Not just code — full product ownership. From architecture to App Store, Google Play, and production Web.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {publishedApps.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                      <app.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider rounded-full">
                      Live
                    </span>
                  </div>
                  <div className="text-cyan-400/80 text-xs font-medium uppercase tracking-wider mb-1">{app.subtitle}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{app.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{app.description}</p>
                  <div className="flex items-center gap-2 text-xs text-emerald-400/90 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {app.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-center"
          >
            <Link
              to="/projects"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 group"
            >
              View all projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
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
              What I{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Six core capabilities that let me take products from idea to live, at production quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
                className="group p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <cap.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              How I Work
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              A clear process from first call to live product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Discover', desc: 'Understand the problem, users, and success metrics.' },
              { step: '02', title: 'Architect', desc: 'Design data flow, APIs, and platform choices.' },
              { step: '03', title: 'Build', desc: 'Ship iteratively with clean code and AI assistance.' },
              { step: '04', title: 'Launch', desc: 'Test, publish, and support in production.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-5 bg-white/[0.03] border border-white/10 rounded-2xl"
              >
                <div className="text-cyan-400/60 text-xs font-mono font-semibold mb-3">{item.step}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-10 sm:p-14 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 rounded-3xl overflow-hidden text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to ship your next product?
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Available for full-time engineering roles, freelance projects, and AI consulting engagements.
              Let's build something real.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 group"
              >
                <Users className="w-5 h-5 mr-2" />
                Start a Conversation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/skills"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Explore Skills
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
