// src/components/Testimonials.tsx
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      avatar: '/img/female1.jpg',
      role: 'CEO, TechTrend',
      quote: 'Johns expertise in React and Node.js transformed our apps performance. His attention to detail is unmatched!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/img/male1.jpg',
      role: 'Product Manager, InnovateCo',
      quote: 'Working with John was a breeze. He delivered clean, efficient code ahead of schedule.',
      rating: 4
    },
    {
      id: 3,
      name: 'Emily Davis',
      avatar: '/img/female2.jpg',
      role: 'Founder, StartUpX',
      quote: 'Johns creative solutions and dedication made our project a success. Highly recommend!',
      rating: 5
    },
    {
      id: 4,
      name: 'David Johnson',
      avatar: '/img/male2.jpg',
      role: 'CTO, WebCore Solutions',
      quote: 'John brought fresh ideas and robust architecture to our development team. Hes a true professional.',
      rating: 5
    },
    {
      id: 5,
      name: 'Anna Lee',
      avatar: '/img/female3.jpg',
      role: 'Design Lead, Creativa',
      quote: 'His collaboration with the design team was seamless. The final UI exceeded expectations!',
      rating: 4
    },
    {
      id: 6,
      name: 'Vivian Gomez',
      avatar: '/img/female4.jpg',
      role: 'Marketing Director, BrandReach',
      quote: 'From code quality to communication, John delivers top-tier results every time.',
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const testimonialId = parseInt(entry.target.getAttribute('data-testimonial-id') || '0');
            setVisibleTestimonials(prev => [...prev, testimonialId]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const testimonialElements = document.querySelectorAll('[data-testimonial-id]');
    testimonialElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i 
        key={i}
        className={`fas fa-star ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
      ></i>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-gray-900/50 relative flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            What <span className="text-green-400">Clients Say</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Hear from those who've worked with me about the impact of my code and collaboration.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              data-testimonial-id={testimonial.id}
              className={`bg-gray-950 p-6 rounded-lg border border-gray-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 ${
                visibleTestimonials.includes(testimonial.id) 
                ? `opacity-100 translate-y-0 transition-delay-${index * 100}` 
                : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-gray-700 overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{testimonial.quote}</p>
              <div className="flex gap-2">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;