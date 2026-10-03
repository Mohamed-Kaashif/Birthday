import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import SmartImage from './SmartImage';
import './Roadmap.css';

const Roadmap = ({ onNext, roadmap }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="roadmap-container" ref={containerRef}>
      <div className="roadmap-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Our Journey
        </motion.h2>
      </div>

      <div className="timeline-wrapper">
        <motion.div className="timeline-line" style={{ scaleY }} />
        <div className="timeline-line-background" />

        {roadmap.map((item, index) => (
          <RoadmapNode key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="roadmap-footer flex-center">
        <motion.button
          className="next-btn"
          onClick={() => {
            const el = document.getElementById('originals-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Watch the Originals
        </motion.button>
      </div>
    </div>
  );
};

const RoadmapNode = ({ item, index }) => {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  return (
    <div className={`timeline-node ${isEven ? 'left' : 'right'}`} ref={ref}>
      <motion.div 
        className="timeline-dot"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      
      <motion.div 
        className="timeline-content"
        initial={{ x: isEven ? -50 : 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, margin: "-20% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="timeline-image-wrapper">
          <SmartImage basePath={`/assets/roadmap/${index + 1}`} alt={item.title} className="timeline-image" />
        </div>
        <div className="timeline-text">
          <span className="timeline-date">{item.date}</span>
          <h3 className="timeline-title">{item.title}</h3>
          <p className="timeline-caption">{item.caption}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Roadmap;
