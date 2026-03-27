// src/components/About.tsx
import { useState, useEffect, useRef } from 'react';

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
      mobile: 50
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
  }, []);

  return (
    <section id="about" className="py-20 lg:px-6 bg-gray-900/50 relative flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            About <span className="text-green-400">Me</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Passionate developer with a love for clean code, strong coffee, and open source contributions.
          </p>
        </div>
        
        {/* GitHub Contribution Grid */}
        <div className="relative lg:max-w-5xl mx-auto lg:px-12">
          <div className="bg-gray-950 rounded-lg p-4 lg:p-6 shadow-2xl border border-gray-800 mb-8">
            {/* GitHub-style Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <img src="/img/male2.jpg" alt="Programmer" className="w-8 h-8 object-cover" />
                </div>
                <span className="text-gray-300 font-semibold hidden sm:inline-block">github.com/sathish</span>
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
            <div className="overflow-x-auto pb-3">
              <div className="w-full flex flex-col">
                {/* Month Labels */}
                <div className="flex mb-1 pl-8">
                  {months.map((month) => (
                    <div 
                      key={month.index}
                      className="text-xs text-gray-500 flex-shrink-0"
                      style={{ width: `${month.colspan * 16}px` }}
                    >
                      <span>{month.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center">
                  {/* Day Labels */}
                  <div className="flex flex-col gap-2 justify-between h-full text-xs text-gray-500 pr-2 w-8">
                    <div>Mon</div>
                    <div>Wed</div>
                    <div>Fri</div>
                  </div>
                  
                  {/* Contribution Grid */}
                  <div className="grid grid-flow-col auto-cols-min gap-1">
                    {Array.from({ length: 52 }, (_, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }, (_, dayIndex) => (
                          <div 
                            key={dayIndex}
                            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-sm transition-colors duration-200 cursor-pointer ${getCellClass(weekIndex, dayIndex)}`}
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
            <div className="text-center mt-10 mb-6">
              <h3 className="text-2xl lg:text-3xl font-bold font-mono text-white mb-2">Sathish Kumar</h3>
              <p className="text-green-400 text-lg lg:text-xl">Full-Stack Developer & Open Source Enthusiast</p>
            </div>
            
            {/* Fork My Portfolio CTA */}
            <div className="flex justify-center mb-4">
              <a href="#" className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg border border-gray-600 transition-all transform hover:scale-105 shadow-lg">
                <i className="fas fa-code-branch text-green-400"></i>
                Fork My Portfolio
                <span className="bg-gray-700 text-gray-300 text-xs rounded-full px-2 py-0.5 ml-1">14</span>
              </a>
            </div>
          </div>

          {/* Skills and Technologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* About Me Text */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-2">
                <i className="fas fa-user text-green-400"></i> Who I Am
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I'm a passionate developer with {calculateExperience("2018-04-01")}+ years of experience building web applications and contributing to open source projects. I specialize in creating clean, efficient, and maintainable code.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, writing tech articles, or enjoying a fresh cup of coffee while debugging complex problems.
              </p>
              
              {/* GitHub Stats */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">10</div>
                  <div className="text-xs text-gray-400">Repositories</div>
                </div>
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">4.2k</div>
                  <div className="text-xs text-gray-400">Commits</div>
                </div>
                <div className="bg-gray-700/20 p-3 rounded">
                  <div className="text-2xl font-bold text-green-400">87</div>
                  <div className="text-xs text-gray-400">PRs Merged</div>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="bg-gray-950 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-xl font-bold font-mono text-white mb-4 flex items-center gap-2">
                <i className="fas fa-code text-green-400"></i> My Toolbox
              </h3>
              
              <div className="space-y-4">
                <div data-progress="frontend">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Frontend</span>
                    <span className="text-gray-400 text-sm">{progress.frontend}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress.frontend}%` }}
                    ></div>
                  </div>
                </div>

                <div data-progress="backend">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Backend</span>
                    <span className="text-gray-400 text-sm">{progress.backend}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress.backend}%` }}
                    ></div>
                  </div>
                </div>

                <div data-progress="devops">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">DevOps</span>
                    <span className="text-gray-400 text-sm">{progress.devops}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress.devops}%` }}
                    ></div>
                  </div>
                </div>

                <div data-progress="mobile">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Mobile</span>
                    <span className="text-gray-400 text-sm">{progress.mobile}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-in-out"
                      style={{ width: `${progress.mobile}%` }}
                    ></div>
                  </div>
                </div>
              </div>
           
              {/* Technology Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">Angular</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">Next Js</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">TailwindCSS</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">Bootstrap</span>
                <span className="px-3 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm">GraphQL</span>
              </div>
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