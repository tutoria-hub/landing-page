/**
 * Animation Components for Flashcard Demo
 * Extracted from tutoria-webapp AudioButton component
 */

import React from 'react';

/**
 * Loading dots component for processing state
 * Source: tutoria-webapp/src/components/practice/AudioButton.tsx (lines 70-82)
 */
export const LoadingDots: React.FC<{ variant?: 'default' | 'preparing' }> = ({
  variant = 'default'
}) => {
  const colorClass = variant === 'preparing' ? 'bg-gray-400' : 'bg-[#4F46E5]'; // info color

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-1">
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
        <div className={`w-2 h-2 ${colorClass} rounded-full animate-bounce`}></div>
      </div>
    </div>
  );
};

/**
 * Success checkmark component with fade-in animation
 */
export const SuccessCheck: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-6 w-6 text-[#22C55E] animate-fade-in stroke-[2.5] ${className}`}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

/**
 * Waveform bars component for recording state
 * Source: tutoria-webapp/src/components/practice/AudioButton.tsx (lines 466-484)
 *
 * Props:
 * - isActive: Whether speech is being detected (animates bars)
 * - intensityLevels: Array of 4 numbers (0-1) for bar heights
 */
interface WaveformBarsProps {
  isActive: boolean;
  intensityLevels?: number[];
}

export const WaveformBars: React.FC<WaveformBarsProps> = ({
  isActive,
  intensityLevels = [0.7, 1.0, 1.0, 0.8]
}) => {
  const bars = intensityLevels.map((intensity, index) => {
    const minHeight = 4;
    const maxHeight = 24;
    const barHeight = isActive
      ? minHeight + (intensity * maxHeight)
      : minHeight;

    return {
      height: barHeight,
      isActive
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-between gap-0.5">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="recording-bar"
          data-active={bar.isActive.toString()}
          style={{
            '--bar-height': `${bar.height}px`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
