import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './StoryIntro.css';

const StoryIntro = ({ onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 3000); // Second line
    const timer2 = setTimeout(() => setPhase(2), 6500); // Fade out and transition
    const timer3 = setTimeout(() => onNext(), 8000);    // Actually transition

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNext]);

  return (
    <div className="story-intro-container flex-center">
      <div className="intro-text-wrapper">
        <AnimateText show={phase >= 0 && phase < 2} text="Before you get your birthday wish..." delay={0.5} />
        <br />
        <br />
        <AnimateText show={phase >= 1 && phase < 2} text="let's go back for a moment." delay={0.5} />
      </div>
    </div>
  );
};

const AnimateText = ({ show, text, delay }) => {
  return (
    <motion.span
      className="intro-text"
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 1.5, delay: show ? delay : 0, ease: "easeOut" }}
      style={{ display: 'inline-block' }}
    >
      {text}
    </motion.span>
  );
};

export default StoryIntro;
