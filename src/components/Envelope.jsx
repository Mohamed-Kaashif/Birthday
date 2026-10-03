import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Envelope.css';

const Envelope = ({ onNext, letterText }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setShowLetter(true);
    }, 1500); // Wait for envelope open animation
  };

  return (
    <div className="envelope-container flex-center">
      <AnimatePresence>
        {!showLetter && (
          <motion.div 
            className="envelope-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            onClick={handleOpen}
          >
            <div className={`envelope ${isOpen ? 'open' : ''}`}>
              <div className="front flap"></div>
              <div className="front pocket"></div>
              <div className="letter-preview"></div>
              {!isOpen && <div className="envelope-text">For you...</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && (
          <motion.div 
            className="letter-full-view"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="paper">
              <div className="paper-content">
                {letterText.split('\n').map((line, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                  >
                    {line || <br />}
                  </motion.p>
                ))}
              </div>
              <motion.button 
                className="finish-btn"
                onClick={onNext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
