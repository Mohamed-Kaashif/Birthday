import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';
import './Originals.css';

const Originals = ({ onNext, videos }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  const handleClose = () => setActiveVideo(null);

  return (
    <div className="originals-container" id="originals-section">
      <div className="originals-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          SAAYIMA ORIGINALS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="originals-subtitle"
        >
          "The memories we couldn't fit into photos."
        </motion.p>
      </div>

      <div className="video-grid">
        {videos.map((vid, index) => (
          <VideoCard 
            key={vid.id} 
            vid={vid} 
            index={index} 
            onClick={() => setActiveVideo(vid)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {activeVideo && (
          <VideoPlayerModal video={activeVideo} onClose={handleClose} />
        )}
      </AnimatePresence>

      <TransitionOut onNext={onNext} />
    </div>
  );
};

const VideoCard = ({ vid, index, onClick }) => {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <motion.div 
      ref={ref}
      className="video-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="video-thumbnail">
        {!hasError ? (
          <video 
            ref={videoRef}
            src={`/assets/videos/${vid.id}.mp4`}
            muted 
            playsInline 
            loop 
            className="inline-video"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="thumbnail-placeholder flex-center">
            <Play size={48} className="play-icon" />
          </div>
        )}
        <div className="video-duration">{vid.duration}</div>
      </div>
      <div className="video-info">
        <h3>{vid.title}</h3>
        <p>{vid.description}</p>
      </div>
    </motion.div>
  );
};

const VideoPlayerModal = ({ video, onClose }) => {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div 
      className="video-modal-overlay flex-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="video-modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={32} />
        </button>
        <div className="video-player-wrapper flex-center">
           {!hasError ? (
             <video 
               ref={videoRef}
               src={`/assets/videos/${video.id}.mp4`} 
               controls 
               autoPlay 
               className="html-video"
               onError={() => setHasError(true)}
             >
               Your browser does not support the video tag.
             </video>
           ) : (
             <div className="video-error-state flex-center">
               <div className="error-content">
                  <Play size={48} className="error-icon" />
                  <h3>Video Coming Soon</h3>
                  <p>Please place <strong>/assets/videos/{video.id}.mp4</strong> in your project to enable playback.</p>
               </div>
             </div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

const TransitionOut = ({ onNext }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isInView) {
      const t1 = setTimeout(() => setPhase(1), 2000);
      const t2 = setTimeout(() => setPhase(2), 5000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      setPhase(0);
    }
  }, [isInView]);

  return (
    <section className="transition-out-section" ref={ref}>
      <div className="transition-out-content">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5 }}
          className="transition-text"
        >
          Okay... enough memories.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.5 }}
          className="transition-text delay-text"
        >
          But I still have one more thing for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="next-btn"
          onClick={onNext}
          style={{ pointerEvents: phase >= 2 ? 'auto' : 'none' }}
        >
          Continue
        </motion.button>
      </div>
    </section>
  );
};

export default Originals;
