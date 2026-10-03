import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmartImage from './SmartImage';
import './Memories.css';

const Memories = ({ onNext, memories }) => {
  const containerRef = useRef(null);

  // We need to know when we are at the end to trigger onNext.
  // A scroll-based observer for the final element could work, or a simple button.
  // To keep the flow seamless, let's add an invisible trigger at the very end or a "Continue to Roadmap" button.
  return (
    <div className="memories-container" ref={containerRef}>
      {memories.map((memory, index) => (
        <MemoryCard key={index} memory={memory} index={index} total={memories.length} />
      ))}
      <div className="memory-section continue-section flex-center">
        <motion.button
          className="next-btn"
          onClick={onNext}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Our Journey Continues
        </motion.button>
      </div>
    </div>
  );
};

const MemoryCard = ({ memory, index, total }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", once: false });

  return (
    <section className="memory-section" ref={ref}>
      <motion.div 
        className="memory-image-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <SmartImage basePath={`/assets/memories/${index + 1}`} alt={memory.title} className="memory-image" />
        <div className="memory-overlay"></div>
      </motion.div>
      
      <motion.div 
        className="memory-content"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="memory-number">
          {String(index + 1).padStart(2, '0')} <span className="memory-total">/ {String(total).padStart(2, '0')}</span>
        </div>
        <h2 className="memory-title">{memory.title}</h2>
        <p className="memory-caption">{memory.caption}</p>
        {memory.date && <p className="memory-date">{memory.date}</p>}
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Memories;
