// Loader.jsx - Hospital Website Loader Component
// This component shows a clean, professional loading animation for a hospital website.
// Variants: Spinner (default), Progress Bar, and Skeleton Loader.
// Usage Example:
// <Loader variant="spinner" message="Loading patient records..." />

import React from 'react';

export default function Loader({
  variant = 'spinner',
  size = 'md',
  progress = 0,
  message = '',
  lines = 3,
  className = '',
}) {
  const sizes = {
    sm: { svg: 28, icon: 10, text: 'text-sm' },
    md: { svg: 48, icon: 16, text: 'text-base' },
    lg: { svg: 72, icon: 24, text: 'text-lg' },
  };
  const s = sizes[size] || sizes.md;

  const Spinner = () => (
    <div className={`flex flex-col items-center gap-3 ${className}`} aria-live="polite">
      <div className={`flex items-center justify-center rounded-full bg-white/80 shadow-md p-2`}>
        <svg
          className={`animate-spin h-${s.svg} w-${s.svg} max-h-[72px] max-w-[72px]`}
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            stroke="currentColor"
            className="text-blue-500/40"
            strokeDasharray="31.415, 31.415"
          />
          <path
            d="M25 15 L25 35 M15 25 L35 25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-red-600"
          />
        </svg>
      </div>
      {message ? <div className={`${s.text} text-gray-600 text-center`}>{message}</div> : null}
    </div>
  );

  const ProgressBar = () => (
    <div className={`flex flex-col gap-2 w-full max-w-xl ${className}`} aria-live="polite">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 transition-width duration-500"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <div>{message || 'Loading...'}</div>
        <div>{Math.round(progress)}%</div>
      </div>
    </div>
  );

  const Skeleton = () => (
    <div className={`w-full max-w-lg ${className}`} aria-live="polite">
      <div className="space-y-3">
        {Array.from({ length: Math.max(1, lines) }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded-md relative overflow-hidden"
            style={{ animation: 'skeleton 1.2s linear infinite' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );

  const style = (
    <style>{`
      @keyframes skeleton {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .transition-width { transition: width 400ms ease; }
    `}</style>
  );

  return (
    <div className="flex items-center justify-center p-4" aria-busy={variant !== 'skeleton'}>
      {style}
      {variant === 'spinner' && <Spinner />}
      {variant === 'bar' && <ProgressBar />}
      {variant === 'skeleton' && <Skeleton />}
    </div>
  );
}
