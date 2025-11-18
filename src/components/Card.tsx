import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={hover ? { y: -8, scale: 1.02, transition: { duration: 0.3 } } : {}}
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-white/30 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;