import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatbotTriggerProps {
  onClick: () => void;
  className?: string;
}

const ChatbotTrigger: React.FC<ChatbotTriggerProps> = ({ onClick, className = '' }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
      className={`relative ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="group relative w-14 h-14 bg-gradient-to-br from-accent-500 to-emerald-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Animated background */}
        <motion.div
          animate={{ 
            background: [
              'linear-gradient(45deg, #f59e0b, #10b981)',
              'linear-gradient(45deg, #10b981, #3b82f6)',
              'linear-gradient(45deg, #3b82f6, #f59e0b)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        />
        
        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-accent-400/30 to-emerald-400/30 rounded-full"
        />
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </motion.div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
            Chat with Elly, my AI assistant
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ChatbotTrigger;