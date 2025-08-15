import React from 'react';
import mascotImage from '@/assets/diary-mascot.png';

interface MascotProps {
  className?: string;
}

const Mascot: React.FC<MascotProps> = ({ className = '' }) => {
  return (
    <div className={`diary-mascot ${className}`}>
      <img 
        src={mascotImage} 
        alt="Diary mascot - a friendly pen character"
        className="w-16 h-16 object-contain"
      />
    </div>
  );
};

export default Mascot;