import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const InteractiveElements: React.FC = () => {
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set());
  const [infinityActive, setInfinityActive] = useState(false);
  const location = useLocation();

  // Only show on home page
  if (location.pathname !== '/') {
    return null;
  }

  const handleElementClick = (id: string) => {
    setClickedElements(prev => new Set([...prev, id]));
    setTimeout(() => {
      setClickedElements(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const handleInfinityClick = () => {
    setInfinityActive(true);
    setTimeout(() => setInfinityActive(false), 3000);
  };

  const NumberElement: React.FC<{ 
    number: string; 
    position: { top: string; left?: string; right?: string }; 
    delay: number;
    color: string;
  }> = ({ number, position, delay, color }) => {
    const isClicked = clickedElements.has(number);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="absolute z-10 cursor-pointer select-none pointer-events-auto"
        style={position}
        onClick={() => handleElementClick(number)}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          animate={isClicked ? { 
            scale: [1, 1.3, 1], 
            rotate: [0, 180, 0],
          } : {}}
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${
            number === '3' ? 'from-accent-400/10 to-accent-600/10' :
            number === '6' ? 'from-emerald-400/10 to-emerald-600/10' :
            'from-primary-400/10 to-primary-600/10'
          } backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 hover:text-white/70 hover:border-white/20`}
        >
          {number}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 rounded-full border border-white/30"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  const InfinityElement: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="absolute bottom-32 left-16 z-10 cursor-pointer select-none pointer-events-auto"
      onClick={handleInfinityClick}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={infinityActive ? {
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: infinityActive ? 2 : 0.3 }}
        className="relative"
      >
        <div className="w-12 h-6 relative">
          {/* Infinity Symbol made with CSS */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={infinityActive ? { opacity: 0.8 } : {}}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              transform: 'rotate(-45deg)',
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={infinityActive ? { opacity: 0.8 } : {}}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              transform: 'rotate(45deg)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-white/30 text-xs font-light"
              animate={infinityActive ? { color: 'rgba(255, 255, 255, 0.8)' } : {}}
            >
              ∞
            </motion.span>
          </div>
        </div>
        
        <AnimatePresence>
          {infinityActive && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full border border-purple-400/30"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <NumberElement 
        number="3" 
        position={{ top: '25%', left: '8%' }} 
        delay={0.5}
        color="#f59e0b"
      />
      <NumberElement 
        number="6" 
        position={{ top: '35%', right: '12%' }} 
        delay={0.8}
        color="#10b981"
      />
      <NumberElement 
        number="9" 
        position={{ top: '60%', left: '15%' }} 
        delay={1.1}
        color="#3b82f6"
      />
      <InfinityElement />
    </div>
  );
};

export default InteractiveElements;