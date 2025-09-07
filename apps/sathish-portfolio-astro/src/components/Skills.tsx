import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 80 },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MongoDB', level: 80 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 78 },
        { name: 'AWS', level: 80 },
        { name: 'Figma', level: 85 },
        { name: 'Jest', level: 82 },
      ]
    }
  ];

  const technologies = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 
    'Python', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 'Docker',
    'AWS', 'Git', 'Jest', 'Cypress', 'Figma', 'Adobe XD'
  ];

  return (
    <section id="skills" className="py-20 bg-dark relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-primary">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and frameworks I use to build exceptional digital products.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              {skillCategories.map((category, index) => (
                <div key={index} className="bg-dark-light border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-6">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <span className="text-primary text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-dark-lighter rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-green-400 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-dark-light border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-6">Technologies I Work With</h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-dark border border-primary/30 px-3 py-2 rounded-lg text-sm text-gray-300 hover:border-primary hover:text-primary transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-dark border border-primary/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Currently Learning:</div>
                <div className="text-primary">
                  • Rust & WebAssembly<br />
                  • Three.js & WebGL<br />
                  • Machine Learning with TensorFlow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;