import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ChatbotTriggerProps {
  onClick: () => void;
  className?: string;
}

const ChatbotTrigger: React.FC<ChatbotTriggerProps> = ({ onClick, className = '' }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`relative ${className}`}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        aria-label="Open AI assistant"
        className="group relative w-14 h-14 rounded-full shadow-lg shadow-cyan-500/20 flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 hover:shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 bg-cyan-400/40 rounded-full"
        />

        <div className="relative z-10 flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="absolute bottom-full mb-3 right-0 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-sm border border-white/10 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
            Ask Elly · AI Assistant
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ChatbotTrigger;
