// src/components/Projects.tsx
import { useState, useEffect } from 'react';


interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  icon: string;
}

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Taskify App",
      description: "A task management app with real-time collaboration, built using React, Node.js, and MongoDB.",
      image: "/img/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      icon: "fas fa-tasks"
    },
    {
      id: 2,
      title: "E-Shop Platform",
      description: "A scalable e-commerce platform with Next.js, Stripe payments, and TailwindCSS.",
      image: "/img/project2.jpg",
      technologies: ["Next.js", "Stripe", "TailwindCSS"],
      githubUrl: "#",
      liveUrl: "#",
      icon: "fas fa-shopping-cart"
    },
    {
      id: 3,
      title: "Portfolio Site",
      description: "My personal portfolio showcasing my work, built with HTML, TailwindCSS, and Alpine.js.",
      image: "/img/project3.jpg",
      technologies: ["HTML", "TailwindCSS", "Alpine.js"],
      githubUrl: "#",
      liveUrl: "#",
      icon: "fas fa-user"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project-id') || '0');
            setVisibleProjects(prev => [...prev, projectId]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleImageClick = (project: Project) => {
    // For demo purposes, we'll just open in a new tab
    // In a real app, you might use a lightbox library
    window.open(project.liveUrl, '_blank');
  };

  return (
    <section id="projects" className="py-20 bg-gray-900/50 relative flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            Latest <span className="text-green-400">Projects</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A collection of my recent work, showcasing innovative solutions and clean code. Click to explore details.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              data-project-id={project.id}
              className={`bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 ${
                visibleProjects.includes(project.id) 
                ? `opacity-100 translate-y-0 transition-delay-${index * 100}` 
                : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="cursor-pointer" onClick={() => handleImageClick(project)}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-mono text-white mb-2 flex items-center gap-2">
                  <i className={`${project.icon} text-green-400 led-glow`}></i> 
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                    title="View Source Code"
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                    title="View Live Demo"
                  >
                    <i className="fas fa-external-link-alt text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;