// src/components/Blog.tsx
import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  url: string;
  date: string;
  tags: string[];
}

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: 'Mastering React Hooks: A Deep Dive',
      excerpt: 'Explore the power of React Hooks to manage state and side effects in functional components, with practical examples and best practices.',
      image: '/img/blog1.jpg',
      url: 'blog-detail.html',
      date: 'May 10, 2025',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Scaling Node.js Apps with Docker',
      excerpt: 'Learn how to containerize Node.js applications using Docker for seamless deployment and scalability in production environments.',
      image: '/img/blog2.jpg',
      url: 'blog-detail.html',
      date: 'April 25, 2025',
      tags: ['Node.js', 'Docker', 'DevOps']
    },
    {
      id: 3,
      title: 'Why TailwindCSS Changed My Workflow',
      excerpt: 'Discover how TailwindCSS streamlines frontend development with utility-first styling, boosting productivity and maintainability.',
      image: '/img/blog3.jpg',
      url: 'blog-detail.html',
      date: 'April 15, 2025',
      tags: ['TailwindCSS', 'CSS', 'Frontend']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const postId = parseInt(entry.target.getAttribute('data-post-id') || '0');
            setVisiblePosts(prev => [...prev, postId]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const postElements = document.querySelectorAll('[data-post-id]');
    postElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20 bg-gray-950 border-y border-gray-800 relative flex justify-center items-center">
      {/* pattern */}
      <div className="absolute  opacity-[.05]"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            My <span className="text-green-400">Blog</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Dive into my thoughts on coding, tech trends, and developer life. Explore my latest posts below.
          </p>
        </div>
        
        <div className="flex flex-col gap-12">
          {/* Blog Posts (Horizontal Cards) */}
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article 
                key={post.id}
                data-post-id={post.id}
                className={`bg-gray-950 rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col md:flex-row overflow-hidden ${
                  visiblePosts.includes(post.id) 
                  ? `opacity-100 translate-y-0 transition-delay-${index * 100}` 
                  : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Image */}
                <div className="md:w-1/3">
                  <a href={post.url}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                </div>
                
                {/* Content */}
                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-mono text-white mb-2">
                      <a 
                        href={post.url} 
                        className="hover:text-green-400 transition-colors"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700/20 text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{post.date}</span>
                    </div>
                    <a 
                      href={post.url} 
                      className="text-green-400 hover:text-green-600 font-medium flex items-center gap-2 transition-colors"
                    >
                      Read More <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <a 
              href="blogs.html" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              <i className="fas fa-book-open"></i> View All Posts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;