import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './FinalMessage.css';

const FinalMessage = ({ name, note }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="final-container flex-center">
      <div className="final-particles"></div>
      
      <div className="final-content">
        <motion.h1 
          className="final-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          Happy Birthday, <br/><span className="final-name">{name}</span> ❤️
        </motion.h1>
        
        <motion.div 
          className="final-note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          {note}
        </motion.div>
      </div>
    </div>
  );
};

export default FinalMessage;
