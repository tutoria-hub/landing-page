/**
 * AudioButton Component - Demo Version
 * Simulates the tutoria-webapp AudioButton with automatic state progression
 * Source: tutoria-webapp/src/components/practice/AudioButton.tsx
 */

import React from 'react';
import { IconMicrophone } from './icons';
import { LoadingDots, WaveformBars } from './animations';

export type AudioButtonState = 'idle' | 'recording' | 'checking' | 'success' | 'retry';

interface AudioButtonProps {
  state: AudioButtonState;
  size?: 'sm' | 'md' | 'lg';
}

export default function AudioButton({ state, size = 'lg' }: AudioButtonProps) {
  // Size variants matching webapp
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20 lg:w-24 lg:h-24',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10 lg:w-12 lg:h-12',
  };

  // State-based styling
  const getButtonClasses = () => {
    const baseClasses = `
      relative rounded-full flex items-center justify-center
      transition-all duration-200
      ${sizeClasses[size]}
    `;

    switch (state) {
      case 'idle':
        return `${baseClasses} bg-gray-100 border-2 border-gray-300 hover:border-gray-400`;
      case 'recording':
        return `${baseClasses} bg-green-50 border-2 border-[#22C55E]`;
      case 'checking':
        return `${baseClasses} bg-blue-50 border-2 border-[#4F46E5]`;
      case 'success':
        return `${baseClasses} bg-green-50 border-2 border-[#22C55E]`;
      case 'retry':
        return `${baseClasses} bg-amber-50 border-2 border-[#EAB308]`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getButtonClasses()}>
      {/* Idle State - Microphone Icon */}
      {state === 'idle' && (
        <IconMicrophone className={`${iconSizes[size]} text-gray-600`} />
      )}

      {/* Recording State - Waveform Bars */}
      {state === 'recording' && (
        <div className="w-full h-full p-4 relative">
          <WaveformBars isActive={true} />
        </div>
      )}

      {/* Checking State - Loading Dots */}
      {state === 'checking' && (
        <LoadingDots variant="default" />
      )}

      {/* Success State - Checkmark */}
      {state === 'success' && (
        <svg
          className={`${iconSizes[size]} text-[#22C55E] animate-fade-in`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}

      {/* Retry State - Retry Icon */}
      {state === 'retry' && (
        <svg
          className={`${iconSizes[size]} text-[#EAB308] animate-pulse-once`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
      )}
    </div>
  );
}
