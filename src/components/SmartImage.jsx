import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './SmartImage.css';

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

const SmartImage = ({ basePath, alt, className }) => {
  const [extIndex, setExtIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(`${basePath}.${EXTENSIONS[0]}`);

  useEffect(() => {
    // Reset state if basePath changes
    setExtIndex(0);
    setHasError(false);
    setCurrentSrc(`${basePath}.${EXTENSIONS[0]}`);
  }, [basePath]);

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      const nextIndex = extIndex + 1;
      setExtIndex(nextIndex);
      setCurrentSrc(`${basePath}.${EXTENSIONS[nextIndex]}`);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`smart-image-fallback flex-center ${className || ''}`}>
        <div className="fallback-content flex-center">
          <ImageIcon size={48} className="fallback-icon" />
          <span>Image coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`smart-image ${className || ''}`}
      onError={handleError}
    />
  );
};

export default SmartImage;
