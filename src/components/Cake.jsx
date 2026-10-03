import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Cake.css';

const Cake = ({ onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blown, setBlown] = useState(false);
  const [message, setMessage] = useState("Make a wish...");
  const [showNext, setShowNext] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);
    
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    setTimeout(() => {
      setMessage("Wish made. ❤️");
      setTimeout(() => {
        setShowNext(true);
      }, 2000);
    }, 1000);
  };

  return (
    <div className={`cake-container ${blown ? 'lights-on' : 'lights-dim'}`}>
      <motion.div 
        className="cake-content flex-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="cake-message">{message}</h2>
        
        <div className="cake">
          <div className="plate"></div>
          <div className="layer layer-bottom"></div>
          <div className="layer layer-middle"></div>
          <div className="layer layer-top"></div>
          <div className="icing"></div>
          <div className="drip drip1"></div>
          <div className="drip drip2"></div>
          <div className="drip drip3"></div>
          
          <div className="candles">
            {[1, 2, 3].map(i => (
              <div key={i} className={`candle candle${i}`}>
                <div className={`flame ${blown ? 'out' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>

        {!showNext ? (
          <motion.button 
            className={`blow-btn ${blown ? 'hidden' : ''}`}
            onClick={handleBlow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💨 Blow the candles
          </motion.button>
        ) : (
          <motion.button 
            className="continue-btn"
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Open your gift
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Cake;
