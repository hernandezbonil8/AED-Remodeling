import React, { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  altText: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  altText,
  beforeLabel = 'Before',
  afterLabel = 'After'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl shadow-2xl select-none group">
      {/* Container aspect ratio */}
      <div className="relative w-full pb-[56.25%] sm:pb-[50%] md:pb-[42.85%]">
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={`${altText} - After`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Before Image (Foreground, clipped) */}
        <img
          src={beforeImage}
          alt={`${altText} - Before`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />
        
        {/* Range Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
        />

        {/* Slider Line and Thumb */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="flex space-x-1">
              <div className="w-0.5 h-4 bg-slate-400 rounded-full"></div>
              <div className="w-0.5 h-4 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md backdrop-blur-sm pointer-events-none z-10 transition-opacity">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md backdrop-blur-sm pointer-events-none z-10 transition-opacity">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
