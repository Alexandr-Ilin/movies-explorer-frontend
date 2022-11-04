import { useState, useEffect } from 'react';

export default function useScreenWidth() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeScreen = () => {
      setTimeout(() => {
        setWidthScreen(window.innerWidth);
      }, 1000);
    };
    window.addEventListener('resize', handleResizeScreen);
    return () => window.removeEventListener('resize', handleResizeScreen);
  }, []);

  return (widthScreen);
}
