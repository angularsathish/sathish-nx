// src/components/BackToTop.tsx
import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-gray-800 border border-green-600 font-bold w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 z-50 hover:bg-gray-700 hover:scale-110 ${
        isVisible 
          ? 'opacity-100 visible translate-y-0' 
          : 'opacity-0 invisible translate-y-2'
      }`}
      title="Back to Top"
      aria-label="Back to Top"
    >
      <svg 
        className="w-6 h-6 mx-auto" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  );
};

export default BackToTop;