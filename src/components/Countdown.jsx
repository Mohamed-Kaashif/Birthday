import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Countdown.css';

const Countdown = ({ onUnlock, targetDate, name }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setIsUnlocked(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleUnlockClick = () => {
    setUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 1500); // Wait for transition
  };

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {!unlocking && (
        <motion.div 
          className="countdown-container flex-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Subtle starry background effect could go here */}
          <div className="particles-overlay"></div>
          
          <div className="countdown-content glass-panel">
            <h1 className="countdown-title">Something special is waiting for you, {name}...</h1>
            
            <div className="timer-display">
              {timeLeft.days > 0 && (
                <>
                  <div className="time-block">
                    <span className="time-value">{formatNumber(timeLeft.days)}</span>
                    <span className="time-label">Days</span>
                  </div>
                  <span className="time-separator">:</span>
                </>
              )}
              <div className="time-block">
                <span className="time-value">{formatNumber(timeLeft.hours)}</span>
                <span className="time-label">Hours</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-block">
                <span className="time-value">{formatNumber(timeLeft.minutes)}</span>
                <span className="time-label">Minutes</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-block">
                <span className="time-value">{formatNumber(timeLeft.seconds)}</span>
                <span className="time-label">Seconds</span>
              </div>
            </div>

            {isUnlocked ? (
              <motion.button 
                className="unlock-btn"
                onClick={handleUnlockClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Unlock the Magic ✨
              </motion.button>
            ) : (
              <p className="locked-msg">Waiting for midnight...</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Countdown;
