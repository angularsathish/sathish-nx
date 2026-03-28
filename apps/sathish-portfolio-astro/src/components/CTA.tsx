// src/components/CTA.tsx
import { useEffect, useRef } from 'react';

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const yOffset = -70;
      const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-pulse');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta" className="py-20 bg-gray-950 border-y border-gray-800 relative flex justify-center items-center">
      {/* pattern */}
      <div className="absolute  bg-hero opacity-[.03]"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            Ready to <span className="text-green-400">Collaborate?</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My life revolves around code, coffee, and creativity. Let's build something amazing together!
          </p>
        </div>

        {/* Rotating Circle with CTA */}
        <div className="flex justify-center items-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center" ref={ctaRef}>
            {/* neon */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400/40 animate-pulse blur-3xl"></div>

            {/* Rotating Circle */}
            <div className="absolute w-full h-full bg-gray-950 rounded-full flex justify-center items-center border-2 border-gray-700 animate-[spin_20s_linear_infinite] hover:pause">
              <div className="absolute opacity-[.05]"></div>
              {/* CODE (Top) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
                <i className="fas fa-code text-2xl text-green-400"></i>
                <span className="text-gray-300 font-bold text-sm mt-1 font-mono">CODE</span>
              </div>
              {/* EAT (Left) */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 flex flex-col items-center justify-center">
                <i className="fas fa-utensils text-2xl text-green-400"></i>
                <span className="text-gray-300 font-bold text-sm mt-1 font-mono">EAT</span>
              </div>
              {/* SLEEP (Bottom) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 -rotate-180 flex flex-col items-center justify-center">
                <i className="fas fa-bed text-2xl text-green-400"></i>
                <span className="text-gray-300 font-bold text-sm mt-1 font-mono">SLEEP</span>
              </div>
              {/* REPEAT (Right) */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 flex flex-col items-center justify-center">
                <i className="fas fa-redo text-2xl text-green-400"></i>
                <span className="text-gray-300 font-bold text-sm mt-1 font-mono">REPEAT</span>
              </div>
            </div>

            {/* Hire Me Button */}
            <button 
              onClick={scrollToContact}
              className="group relative px-6 py-3 bg-green-500 text-gray-900 font-bold rounded-lg transition-all flex items-center gap-2 z-10 hover:bg-green-600 transform hover:scale-105"
            >
              <i className="fas fa-briefcase text-gray-900 group-hover:scale-110 transition-transform"></i>
              Hire Me
            </button>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default CTA;