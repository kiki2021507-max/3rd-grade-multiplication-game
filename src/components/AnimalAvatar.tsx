/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimalType } from '../types';

interface AnimalAvatarProps {
  type: AnimalType;
  mood?: 'idle' | 'happy' | 'thinking' | 'cheering';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  type,
  mood = 'idle',
  size = 'md',
  showBadge = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  };

  const getMoodAnim = () => {
    switch (mood) {
      case 'happy':
      case 'cheering':
        return 'animate-bounce';
      case 'thinking':
        return 'animate-pulse';
      default:
        return 'animate-float-slow';
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${getMoodAnim()} ${className}`}>
      {type === 'rabbit' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bunny Ears */}
          <ellipse cx="42" cy="30" rx="12" ry="26" fill="#FFF0F5" stroke="#FFA7C4" strokeWidth="4" transform="rotate(-10 42 30)" />
          <ellipse cx="42" cy="30" rx="6" ry="18" fill="#FF85A2" transform="rotate(-10 42 30)" />
          <ellipse cx="78" cy="30" rx="12" ry="26" fill="#FFF0F5" stroke="#FFA7C4" strokeWidth="4" transform="rotate(10 78 30)" />
          <ellipse cx="78" cy="30" rx="6" ry="18" fill="#FF85A2" transform="rotate(10 78 30)" />
          
          {/* Head */}
          <circle cx="60" cy="72" r="38" fill="#FFFDFD" stroke="#FFA7C4" strokeWidth="4" />
          
          {/* Cheeks */}
          <circle cx="36" cy="80" r="7" fill="#FFB6C1" opacity="0.6" />
          <circle cx="84" cy="80" r="7" fill="#FFB6C1" opacity="0.6" />
          
          {/* Eyes */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              <path d="M 40 68 Q 47 60 54 68" stroke="#332222" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 66 68 Q 73 60 80 68" stroke="#332222" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="47" cy="66" r="4.5" fill="#332222" />
              <circle cx="73" cy="64" r="5" fill="#332222" />
              <circle cx="74.5" cy="62.5" r="1.5" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <circle cx="47" cy="68" r="4.5" fill="#332222" />
              <circle cx="45.5" cy="66.5" r="1.5" fill="#FFFFFF" />
              <circle cx="73" cy="68" r="4.5" fill="#332222" />
              <circle cx="71.5" cy="66.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Nose & Mouth */}
          <polygon points="60,76 56,72 64,72" fill="#FF6584" />
          <path d="M 60 76 L 60 81 M 55 83 Q 60 87 60 81 Q 60 87 65 83" stroke="#332222" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Carrot Hat/Bow */}
          <path d="M 52 28 Q 60 22 68 28 L 60 42 Z" fill="#FF7A00" />
          <path d="M 60 22 L 58 15 M 60 22 L 62 14 M 60 22 L 65 17" stroke="#48BB78" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}

      {type === 'bear' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bear Ears */}
          <circle cx="34" cy="38" r="16" fill="#D97706" stroke="#92400E" strokeWidth="3.5" />
          <circle cx="34" cy="38" r="9" fill="#FDE68A" />
          <circle cx="86" cy="38" r="16" fill="#D97706" stroke="#92400E" strokeWidth="3.5" />
          <circle cx="86" cy="38" r="9" fill="#FDE68A" />

          {/* Head */}
          <circle cx="60" cy="68" r="40" fill="#F59E0B" stroke="#92400E" strokeWidth="3.5" />

          {/* Snout Area */}
          <ellipse cx="60" cy="77" rx="20" ry="15" fill="#FEF3C7" />

          {/* Cheeks */}
          <circle cx="34" cy="74" r="6" fill="#F87171" opacity="0.6" />
          <circle cx="86" cy="74" r="6" fill="#F87171" opacity="0.6" />

          {/* Glasses */}
          <circle cx="46" cy="62" r="11" fill="none" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="74" cy="62" r="11" fill="none" stroke="#B45309" strokeWidth="2.5" />
          <line x1="57" y1="62" x2="63" y2="62" stroke="#B45309" strokeWidth="2.5" />

          {/* Eyes */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              <path d="M 40 62 Q 46 56 52 62" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 68 62 Q 74 56 80 62" stroke="#451A03" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="46" cy="62" r="4" fill="#451A03" />
              <circle cx="45" cy="60.5" r="1.5" fill="#FFFFFF" />
              <circle cx="74" cy="62" r="4" fill="#451A03" />
              <circle cx="73" cy="60.5" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Nose & Mouth */}
          <ellipse cx="60" cy="74" rx="6" ry="4" fill="#451A03" />
          <path d="M 60 78 L 60 83 M 55 84 Q 60 88 60 83 Q 60 88 65 84" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {type === 'fox' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Big Fennec Fox Ears */}
          <polygon points="20,10 50,45 15,50" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <polygon points="24,18 45,45 20,48" fill="#FED7AA" />
          
          <polygon points="100,10 70,45 105,50" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <polygon points="96,18 75,45 100,48" fill="#FED7AA" />

          {/* Head Base */}
          <polygon points="60,105 20,55 100,55" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <circle cx="60" cy="64" r="34" fill="#FB923C" />

          {/* White Snout Pattern */}
          <path d="M 60 102 L 34 68 Q 60 74 86 68 Z" fill="#FFF7ED" />

          {/* Eyes */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              <path d="M 40 62 Q 47 54 54 62" stroke="#431407" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M 66 62 Q 73 54 80 62" stroke="#431407" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <ellipse cx="46" cy="62" rx="4.5" ry="5.5" fill="#431407" />
              <circle cx="45" cy="60" r="1.5" fill="#FFFFFF" />
              <ellipse cx="74" cy="62" rx="4.5" ry="5.5" fill="#431407" />
              <circle cx="73" cy="60" r="1.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Nose & Mouth */}
          <circle cx="60" cy="85" r="4.5" fill="#431407" />
          <path d="M 56 90 Q 60 93 64 90" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Star Headband */}
          <circle cx="60" cy="38" r="6" fill="#FACC15" />
          <path d="M 60 30 L 62 36 L 68 38 L 62 40 L 60 46 L 58 40 L 52 38 L 58 36 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
        </svg>
      )}

      {type === 'panda' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Panda Black Ears */}
          <circle cx="34" cy="34" r="16" fill="#1F2937" stroke="#111827" strokeWidth="3" />
          <circle cx="86" cy="34" r="16" fill="#1F2937" stroke="#111827" strokeWidth="3" />

          {/* Head */}
          <circle cx="60" cy="68" r="38" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="3" />

          {/* Black Eye Patches */}
          <ellipse cx="44" cy="64" rx="10" ry="13" fill="#1F2937" transform="rotate(-15 44 64)" />
          <ellipse cx="76" cy="64" rx="10" ry="13" fill="#1F2937" transform="rotate(15 76 64)" />

          {/* Eyes inside patches */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              <path d="M 40 64 Q 45 58 50 64" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 70 64 Q 75 58 80 64" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <circle cx="45" cy="63" r="3.5" fill="#FFFFFF" />
              <circle cx="46" cy="63" r="1.5" fill="#111827" />
              <circle cx="75" cy="63" r="3.5" fill="#FFFFFF" />
              <circle cx="74" cy="63" r="1.5" fill="#111827" />
            </>
          )}

          {/* Cheeks */}
          <circle cx="32" cy="76" r="6" fill="#F472B6" opacity="0.6" />
          <circle cx="88" cy="76" r="6" fill="#F472B6" opacity="0.6" />

          {/* Nose & Mouth */}
          <ellipse cx="60" cy="76" rx="5" ry="3.5" fill="#1F2937" />
          <path d="M 60 79.5 L 60 84 M 55 85 Q 60 89 60 84 Q 60 89 65 85" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Little Bamboo Sprout */}
          <path d="M 60 30 Q 56 22 50 20 Q 55 26 58 30" fill="#22C55E" />
          <path d="M 60 30 Q 64 22 70 20 Q 65 26 62 30" fill="#16A34A" />
        </svg>
      )}

      {showBadge && (
        <span className="absolute -bottom-1 -right-1 text-base sm:text-lg bg-white/90 rounded-full shadow-sm p-0.5 border border-slate-200">
          {type === 'rabbit' && '🥕'}
          {type === 'bear' && '🍯'}
          {type === 'fox' && '⭐'}
          {type === 'panda' && '🎋'}
        </span>
      )}
    </div>
  );
};
