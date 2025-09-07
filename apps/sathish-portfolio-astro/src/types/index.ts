export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    category: string;
  }
  
  export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
  }
  
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar: string;
  }
  
  export interface Skill {
    name: string;
    level: number;
  }
  
  export interface SkillCategory {
    title: string;
    skills: Skill[];
  }