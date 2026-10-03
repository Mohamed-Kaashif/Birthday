import React, { useState, useEffect } from 'react';
import { CONFIG } from './config';
import Countdown from './components/Countdown';
import StoryIntro from './components/StoryIntro';
import Memories from './components/Memories';
import Roadmap from './components/Roadmap';
import Originals from './components/Originals';
import Cake from './components/Cake';
import Envelope from './components/Envelope';
import FinalMessage from './components/FinalMessage';
import './App.css';

function App() {
  const [step, setStep] = useState('countdown'); // countdown, intro, memories, roadmap, originals, cake, envelope, final
  const [audio] = useState(new Audio(CONFIG.musicFile ? `/music/${CONFIG.musicFile}` : ''));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if birthday already passed/started when app loads
    const targetDate = new Date(CONFIG.birthdayDate);
    const now = new Date();
    if (CONFIG.TEST_MODE || now >= targetDate) {
      setStep('intro');
    }
  }, []);

  const handleUnlock = () => {
    setStep('intro');
    if (CONFIG.musicFile && !isPlaying) {
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Audio play blocked', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      {CONFIG.musicFile && (
        <button className="music-toggle" onClick={toggleMusic}>
          {isPlaying ? '🎵 Playing' : '🔇 Muted'}
        </button>
      )}

      {step === 'countdown' && <Countdown onUnlock={handleUnlock} targetDate={CONFIG.birthdayDate} name={CONFIG.birthdayPerson} />}
      {step === 'intro' && <StoryIntro onNext={() => setStep('memories')} />}
      {step === 'memories' && <Memories onNext={() => setStep('roadmap')} memories={CONFIG.memories} />}
      {step === 'roadmap' && (
        <>
          <Roadmap roadmap={CONFIG.roadmap} />
          <Originals onNext={() => setStep('cake')} videos={CONFIG.videos} />
        </>
      )}
      {step === 'cake' && <Cake onNext={() => setStep('envelope')} />}
      {step === 'envelope' && <Envelope onNext={() => setStep('final')} letterText={CONFIG.letterText} />}
      {step === 'final' && <FinalMessage name={CONFIG.birthdayPerson} note={CONFIG.specialNote} />}
    </div>
  );
}

export default App;
