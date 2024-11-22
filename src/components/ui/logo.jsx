import React from 'react';
import { cn } from '../../lib/utils';

export function Logo({ className = '', showText = true }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          'h-8 w-8 transition-transform duration-300',
          !showText && 'hover:scale-110'
        )}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L4 7l8 5 8-5-8-5z" className="opacity-80" />
        <path d="M4 12l8 5 8-5" className="opacity-90" />
        <path d="M12 7l0 15" className="opacity-100" />
      </svg>
      {showText && (
        <span className="text-xl font-bold text-primary">Project Hub</span>
      )}
    </div>
  );
}