import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'faseenofficial@gmail.com',
      link: 'mailto:faseenofficial@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone · WhatsApp',
      value: '+971 50 983 8149',
      link: 'tel:+971509838149',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Abu Dhabi, UAE',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mohamed-fasin',
      label: 'linkedin.com/in/mohamed-fasin',
    },
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/mohamed-fasin',
      label: 'github.com/mohamed-fasin',
    },
    {
      icon: Mail,
      name: 'Email',
      url: 'mailto:faseenofficial@gmail.com',
      label: 'faseenofficial@gmail.com',
    },
  ];

  const projectTypes = [
    'AI / LLM Product',
    'Prompt Engineering Consulting',
    'Flutter Mobile App (iOS/Android)',
    'Full-Stack Web Application',
    'IoT · Raspberry Pi · Arduino',
    'Automation & Workflow Systems',
    'Full-Time Role',
    'Other',
  ];

  const inputClass =
    'w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400/50 hover:border-white/20 transition-all text-sm';

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
    }),
  };

  return (
    <PageWrapper>
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 -left-32 w-[28rem] h-[28rem] rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        />
      </div>

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium tracking-wide mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for new work · 2026</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 text-balance"
            >
              Let's build{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                something real
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-white/55 max-w-2xl mx-auto leading-relaxed"
            >
              Open to full-time roles, freelance engagements, and AI consulting. I reply within 24 hours — usually faster.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="lg:col-span-3"
            >
              <div className="relative p-8 bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="relative">
                  <h2 className="text-xl font-semibold text-white mb-1">Send a message</h2>
                  <p className="text-white/45 text-sm mb-6">
                    Share the shape of the project and I'll follow up with next steps.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs uppercase tracking-wider text-white/45 mb-1.5">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-wider text-white/45 mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-white/45 mb-1.5">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+971 XX XXX XXXX"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="projectType" className="block text-xs uppercase tracking-wider text-white/45 mb-1.5">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className={inputClass}
                        >
                          <option value="" className="bg-slate-900">
                            Select type
                          </option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type} className="bg-slate-900">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-wider text-white/45 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe your project, goals, or role. The more context, the better."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ y: isSubmitting ? 0 : -1 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Sending…' : 'Send Message'}
                    </motion.button>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl text-emerald-300 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        Message sent. I'll reply within 24 hours.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl text-red-300 text-sm"
                      >
                        Something went wrong. Please try again or email me directly.
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Info column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact Info */}
              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
                <h3 className="text-sm font-semibold text-white/90 uppercase tracking-[0.16em] mb-5">
                  Contact
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.link}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/40 transition-colors">
                        <info.icon className="w-4.5 h-4.5 text-cyan-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white/40 text-[11px] uppercase tracking-wider mb-0.5">
                          {info.label}
                        </div>
                        <div className="text-white/85 group-hover:text-cyan-300 transition-colors text-sm truncate">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
                <h3 className="text-sm font-semibold text-white/90 uppercase tracking-[0.16em] mb-5">
                  Online
                </h3>
                <div className="space-y-2.5">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-colors duration-200 group"
                    >
                      <social.icon className="w-4.5 h-4.5 text-white/50 group-hover:text-cyan-300 transition-colors" />
                      <div className="min-w-0 flex-1">
                        <div className="text-white/85 text-sm font-medium">{social.name}</div>
                        <div className="text-white/40 text-[11px] truncate">{social.label}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="relative p-6 bg-gradient-to-br from-cyan-500/[0.06] to-blue-500/[0.04] border border-cyan-400/20 rounded-3xl overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                <h3 className="relative text-sm font-semibold text-white/90 uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-300" />
                  Availability
                </h3>
                <div className="relative space-y-3 text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-white/80">Open to new projects & roles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-white/80">Own UAE Visa Holder</span>
                  </div>
                  <div className="pt-2 space-y-1.5 text-white/50 text-[12.5px]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Responds within 24 hours
                    </div>
                    <div>Time zone · UAE Standard (UTC+4)</div>
                    <div>Origin · Kerala, Thrissur, India</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
