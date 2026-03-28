// src/components/About.tsx
import { useState, useEffect, useRef, useMemo } from 'react';

interface ProgressBarData {
  frontend: number;
  backend: number;
  devops: number;
  mobile: number;
}

interface ContributionData {
  tooltipText: string;
  isTooltipVisible: boolean;
  tooltipPosition: { x: number; y: number };
}

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [progress, setProgress] = useState<ProgressBarData>({
    frontend: 0,
    backend: 0,
    devops: 0,
    mobile: 0
  });

  const [contribution, setContribution] = useState<ContributionData>({
    tooltipText: '',
    isTooltipVisible: false,
    tooltipPosition: { x: 0, y: 0 }
  });

  const tooltipRef = useRef<HTMLDivElement>(null);

  const months = [
    { name: 'Jan', index: 0, colspan: 4.2 },
    { name: 'Feb', index: 1, colspan: 4.2 },
    { name: 'Mar', index: 2, colspan: 4.2 },
    { name: 'Apr', index: 3, colspan: 4.2 },
    { name: 'May', index: 4, colspan: 4.2 },
    { name: 'Jun', index: 5, colspan: 4.2 },
    { name: 'Jul', index: 6, colspan: 4.2 },
    { name: 'Aug', index: 7, colspan: 4.2 },
    { name: 'Sep', index: 8, colspan: 4.2 },
    { name: 'Oct', index: 9, colspan: 4.2 },
    { name: 'Nov', index: 10, colspan: 4.2 },
    { name: 'Dec', index: 11, colspan: 4.2 }
  ];

  const pattern = [
    23, 24, 25, 26, 27, 29, 35, 36, 42, 44, 48, 58, 59, 60, 61, 62, 64, 70, 71, 77, 79, 80, 81, 82, 83, 92,
    93, 94, 95, 96, 97, 98, 99, 105, 106, 112, 114, 115, 116, 117, 118, 127, 128, 129, 130, 131, 132, 133,
    141, 142, 143, 144, 145, 146, 147, 150, 158, 166, 169, 170, 171, 172, 173, 174, 175, 184, 185,
    186, 187, 188, 190, 193, 196, 197, 200, 203, 205, 207, 208, 209, 228, 235, 240, 241, 242, 243, 244, 249, 256, 275,
    276, 277, 278, 279, 282, 287, 289, 294, 296, 301, 303, 308, 310, 315, 317, 318, 319, 320, 321, 325, 328, 332, 335, 340, 341
  ];

  const animateProgress = (bar: keyof ProgressBarData) => {
    const targetValues = {
      frontend: 85,
      backend: 90,
      devops: 50,
      mobile: 78
    };
    
    const target = targetValues[bar];
    let start = 0;
    const duration = 2500;
    const increment = target / (duration / 16);
    
    const update = () => {
      start += increment;
      if (start >= target) {
        setProgress(prev => ({ ...prev, [bar]: target }));
      } else {
        setProgress(prev => ({ ...prev, [bar]: Math.round(start) }));
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const getCellClass = (weekIndex: number, dayIndex: number): string => {
    const index = (weekIndex * 7) + dayIndex + 1;
    return pattern.includes(index) ? 'bg-green-500' : 'bg-gray-700';
  };

  const showTooltip = (weekIndex: number, dayIndex: number, event: React.MouseEvent) => {
    const date = new Date(2025, 0, 1);
    date.setDate(date.getDate() + (weekIndex * 7) + dayIndex);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const index = (weekIndex * 7) + dayIndex + 1;
    const contributions = pattern.includes(index)
      ? Math.floor(Math.random() * 15) + 10
      : Math.floor(Math.random() * 10) + 5;
    
    setContribution({
      tooltipText: `${contributions} contributions on ${formattedDate}`,
      isTooltipVisible: true,
      tooltipPosition: { x: event.pageX + 10, y: event.pageY + 10 }
    });
  };

  const hideTooltip = () => {
    setContribution(prev => ({ ...prev, isTooltipVisible: false }));
  };

  function calculateExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();

  // Adjust if current date is before anniversary
  const hasNotCompletedYear =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (hasNotCompletedYear) {
    years--;
  }

  return years;
}

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-progress') as keyof ProgressBarData;
            if (target) {
              animateProgress(target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const progressElements = document.querySelectorAll('[data-progress]');
    progressElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isMounted]);

  // Memoize experience calculation to ensure consistent rendering
  const yearsOfExperience = useMemo(() => {
    if (!isMounted) return 7; // Default value for SSR
    return calculateExperience("2018-04-01");
  }, [isMounted]);

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            About <span className="text-green-400">Me</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 max-w-2xl mx-auto px-2">
            Passionate developer with a love for clean code, strong coffee, and open source contributions.
          </p>
        </div>

        {/* Card 1: GitHub Contribution Grid */}
        <div className="relative mb-6 sm:mb-8">
          <div className="bg-gray-950 rounded-lg p-4 sm:p-5 lg:p-6 shadow-2xl border border-gray-800">
            {/* GitHub-style Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-700 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <img src="/img/male2.jpg" alt="Programmer" className="w-8 h-8 object-cover" />
                </div>
                <span className="text-gray-300 font-semibold text-sm sm:text-base">github.com/sathish</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="hidden lg:flex items-center gap-1 text-gray-400">
                  <span className="w-3 h-3 rounded-sm bg-gray-600"></span>
                  <span>Less</span>
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span 
                      key={level}
                      className={`w-3 h-3 rounded-sm bg-green-${level * 100 + 400}`}
                    ></span>
                  ))}
                </div>
                <div className="hidden lg:flex items-center gap-1 text-gray-400">
                  <span>More</span>
                </div>
              </div>
            </div>
            
            {/* Contribution Grid */}
            <div className="overflow-x-auto overflow-y-hidden pb-2 sm:pb-3 -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6">
              <div className="min-w-[680px] sm:min-w-max flex flex-col">
                {/* Month Labels */}
                <div className="flex mb-1.5 pl-[30px] sm:pl-[34px]">
                  {months.map((month) => (
                    <div
                      key={month.index}
                      className="text-[9px] sm:text-[10px] lg:text-xs text-gray-500 flex-shrink-0"
                      style={{ width: `${month.colspan * 13}px` }}
                    >
                      <span>{month.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-start">
                  {/* Day Labels */}
                  <div className="flex flex-col justify-start text-[9px] sm:text-[10px] lg:text-xs text-gray-500 pr-1.5 sm:pr-2 w-[30px] sm:w-[34px]">
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center">Mon</div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center invisible"></div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center">Wed</div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center invisible"></div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center">Fri</div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center invisible"></div>
                    <div className="h-[13px] sm:h-[14px] lg:h-[16px] flex items-center invisible"></div>
                  </div>

                  {/* Contribution Grid */}
                  <div className="grid grid-flow-col auto-cols-min gap-[3px] sm:gap-1">
                    {Array.from({ length: 52 }, (_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px] sm:gap-1">
                        {Array.from({ length: 7 }, (_, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] lg:w-3 lg:h-3 rounded-[2px] transition-colors duration-200 cursor-pointer ${getCellClass(weekIndex, dayIndex)}`}
                            onMouseEnter={(e) => showTooltip(weekIndex, dayIndex, e)}
                            onMouseLeave={hideTooltip}
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tooltip */}
            {contribution.isTooltipVisible && (
              <div 
                ref={tooltipRef}
                className="absolute bg-gray-800 text-white text-xs p-2 rounded shadow-lg border border-gray-700 z-20 pointer-events-none"
                style={{
                  left: contribution.tooltipPosition.x,
                  top: contribution.tooltipPosition.y
                }}
              >
                {contribution.tooltipText}
              </div>
            )}
            
            {/* Name and Role */}
            <div className="text-center mt-5 sm:mt-6 lg:mt-8 mb-4 sm:mb-5 px-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-white mb-1.5 sm:mb-2">Sathish Kumar</h3>
              <p className="text-green-400 text-sm sm:text-base lg:text-lg leading-relaxed">Full-Stack Developer & Open Source Enthusiast</p>
            </div>

            {/* Fork My Portfolio CTA */}
            <div className="flex justify-center">
              <a href="#" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-5 text-sm sm:text-base rounded-lg border border-gray-600 transition-all transform hover:scale-105 shadow-lg">
                <i className="fas fa-code-branch text-green-400 text-base sm:text-lg"></i>
                <span>Fork My Portfolio</span>
                <span className="bg-gray-700 text-gray-300 text-xs sm:text-sm rounded-full px-2 py-0.5 ml-1 font-normal">14</span>
              </a>
            </div>
          </div>
        </div>

        {/* Cards 2 & 3: Who I Am + My Toolbox (Stack on mobile, side-by-side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-6 lg:gap-8">
          {/* Card 2: Who I Am */}
          <div className="bg-gray-950 rounded-lg p-5 sm:p-6 border border-gray-800 shadow-2xl">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold font-mono text-white mb-4 sm:mb-5 flex items-center gap-2">
              <i className="fas fa-user text-green-400 text-sm sm:text-base"></i>
              <span>Who I Am</span>
            </h3>
            <p className="text-sm sm:text-[15px] lg:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
              I'm a passionate developer with {yearsOfExperience}+ years of experience building web applications and contributing to open source projects. I specialize in creating clean, efficient, and maintainable code.
            </p>
            <p className="text-sm sm:text-[15px] lg:text-base text-gray-300 leading-relaxed mb-5 sm:mb-6">
              When I'm not coding, you can find me exploring new technologies, writing tech articles, or enjoying a fresh cup of coffee while debugging complex problems.
            </p>

            {/* GitHub Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center pt-4 border-t border-gray-800">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">14</div>
                <div className="text-[11px] sm:text-xs text-gray-400 leading-tight">Repositories</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">2.3K</div>
                <div className="text-[11px] sm:text-xs text-gray-400 leading-tight">Commits</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">45</div>
                <div className="text-[11px] sm:text-xs text-gray-400 leading-tight">PRs Merged</div>
              </div>
            </div>
          </div>
            
          {/* Card 3: My Toolbox */}
          <div className="bg-gray-950 rounded-lg p-5 sm:p-6 border border-gray-800 shadow-2xl">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold font-mono text-white mb-4 sm:mb-5 flex items-center gap-2">
              <i className="fas fa-code text-green-400 text-sm sm:text-base"></i>
              <span>My Toolbox</span>
            </h3>

            <div className="space-y-4 sm:space-y-5 mb-5 sm:mb-6">
              <div data-progress="frontend">
                <div className="flex justify-between mb-1.5 sm:mb-2">
                  <span className="text-sm sm:text-[15px] text-gray-300 font-medium">Frontend</span>
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{progress.frontend}%</span>
                </div>
                <div className="h-2 sm:h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress.frontend}%` }}
                  ></div>
                </div>
              </div>

              <div data-progress="backend">
                <div className="flex justify-between mb-1.5 sm:mb-2">
                  <span className="text-sm sm:text-[15px] text-gray-300 font-medium">Backend</span>
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{progress.backend}%</span>
                </div>
                <div className="h-2 sm:h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress.backend}%` }}
                  ></div>
                </div>
              </div>

              <div data-progress="devops">
                <div className="flex justify-between mb-1.5 sm:mb-2">
                  <span className="text-sm sm:text-[15px] text-gray-300 font-medium">DevOps</span>
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{progress.devops}%</span>
                </div>
                <div className="h-2 sm:h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress.devops}%` }}
                  ></div>
                </div>
              </div>

              <div data-progress="mobile">
                <div className="flex justify-between mb-1.5 sm:mb-2">
                  <span className="text-sm sm:text-[15px] text-gray-300 font-medium">Database</span>
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{progress.mobile}%</span>
                </div>
                <div className="h-2 sm:h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress.mobile}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4 sm:pt-5 border-t border-gray-800">
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">JavaScript</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">React</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">Node.js</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">TypeScript</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">TailwindCSS</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">Angular</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">Firebase</span>
              <span className="px-2.5 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded text-[11px] sm:text-xs font-medium">Git</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements: GitHub-style Dots */}
      <div className="absolute flex justify-center items-center opacity-10 pointer-events-none">
        <div className="absolute top-40 right-28 lg:right-40 w-48 h-48">
          <div className="w-full h-full grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-24 left-28 lg:left-40 w-48 h-48">
          <div className="w-full h-full grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;