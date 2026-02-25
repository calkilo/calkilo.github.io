import DarkMode, { Header } from '../imports/DarkMode';
import { useEffect, useState } from 'react';

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      // DarkMode designed for 1440px width
      const designWidth = 1440;
      const screenWidth = window.innerWidth;
      
      // Calculate scale to fit content
      const newScale = Math.min(screenWidth / designWidth, 1);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="bg-[#212121] min-h-screen w-full overflow-x-hidden overflow-y-auto relative">
      {/* Header directly without scale wrapper - it handles its own fixed positioning */}
      <Header scale={scale} />
      
      {/* Main content with scale */}
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '1440px',
          margin: '0 auto',
        }}
      >
        <DarkMode />
      </div>
    </div>
  );
}
