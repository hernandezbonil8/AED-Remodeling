import React from 'react';

interface AEDLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'light' | 'dark';
}

export const AEDLogo: React.FC<AEDLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-16 w-auto',
    lg: 'h-28 w-auto',
    xl: 'h-40 w-auto',
    full: 'w-full h-auto',
  };

  // Determine colors based on variant
  const isDark = variant === 'dark';
  const blackColor = isDark ? '#F1F5F9' : '#1E293B'; // slate-100 vs slate-800
  const grayColor = isDark ? '#94A3B8' : '#475569';  // slate-400 vs slate-600

  return (
    <svg
      viewBox="0 0 600 550"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="aed-remodeling-logo"
    >
      <defs>
        {/* Metallic Gold Gradient to perfectly match the original logo */}
        <linearGradient id="gold-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBA4E" />
          <stop offset="30%" stopColor="#FFF1BE" />
          <stop offset="50%" stopColor="#C99B27" />
          <stop offset="85%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#F5D77F" />
        </linearGradient>

        <linearGradient id="gold-metallic-text" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C99B27" />
          <stop offset="50%" stopColor="#F5D77F" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>
      </defs>

      {/* --- HOUSE ROOF & CHIMNEY --- */}
      {/* Left Roof Slant (Gold Metallic Gradient) */}
      <path
        d="M300 70 L55 235 L62 245 L300 90 Z"
        fill="url(#gold-metallic)"
      />

      {/* Right Roof Slant (Dark Slate / Off-white depending on variant) */}
      <path
        d="M300 70 L300 90 L538 245 L545 235 Z"
        fill={blackColor}
      />

      {/* Chimney on the right side */}
      <path
        d="M420 120 V180 H440 V133 Z"
        fill={blackColor}
      />

      {/* 4-Pane Window (Grid) */}
      <g fill={isDark ? 'url(#gold-metallic)' : blackColor}>
        <rect x="281" y="145" width="16" height="16" rx="1" />
        <rect x="303" y="145" width="16" height="16" rx="1" />
        <rect x="281" y="167" width="16" height="16" rx="1" />
        <rect x="303" y="167" width="16" height="16" rx="1" />
      </g>

      {/* --- "AED" TEXT AREA (HIFI CUSTOM PATHS) --- */}
      {/* Customized Stylized Letter 'A' (Stunning geometric curve in gold gradient) */}
      <path
        d="M 125 350 L 165 210 L 210 210 L 260 350 L 215 350 L 202 310 L 148 310 L 138 350 Z M 153 295 L 197 295 L 181 245 C 178 236 175 224 174 218 C 173 224 171 236 168 245 Z"
        fill="url(#gold-metallic)"
      />

      {/* Stylized Letter 'E' */}
      <path
        d="M 270 210 H 365 V 242 H 303 V 264 H 353 V 294 H 303 V 318 H 365 V 350 H 270 Z"
        fill={blackColor}
      />

      {/* Stylized Letter 'D' */}
      <path
        d="M 385 210 H 455 C 505 210 535 240 535 280 C 535 320 505 350 455 350 H 385 Z M 418 242 V 318 H 450 C 475 318 498 305 498 280 C 498 255 475 242 450 242 Z"
        fill={blackColor}
      />

      {/* --- MIDDLE LINE: REMODELING flanked by Gold Dashes --- */}
      {/* Left Gold Accent Bar */}
      <rect x="40" y="380" width="45" height="5" rx="2" fill="url(#gold-metallic)" />

      {/* "REMODELING" text with wide tracking */}
      <text
        x="300"
        y="392"
        fill={blackColor}
        fontSize="36"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="10"
        textAnchor="middle"
      >
        REMODELING
      </text>

      {/* Right Gold Accent Bar */}
      <rect x="515" y="380" width="45" height="5" rx="2" fill="url(#gold-metallic)" />


      {/* --- LOWER LINE: LLC flanked by Dark Thin Lines --- */}
      {/* Left thin separator */}
      <line x1="50" y1="428" x2="260" y2="428" stroke={grayColor} strokeWidth="2" />

      {/* "LLC" centered text */}
      <text
        x="300"
        y="436"
        fill="url(#gold-metallic)"
        fontSize="26"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="8"
        textAnchor="middle"
      >
        LLC
      </text>

      {/* Right thin separator */}
      <line x1="340" y1="428" x2="550" y2="428" stroke={grayColor} strokeWidth="2" />


      {/* --- TAGLINE: "BUILT ON QUALITY. BACKED BY TRUST." --- */}
      <text
        x="300"
        y="472"
        fill={blackColor}
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="5"
        textAnchor="middle"
      >
        BUILT ON QUALITY. BACKED BY TRUST.
      </text>
    </svg>
  );
};

export default AEDLogo;
