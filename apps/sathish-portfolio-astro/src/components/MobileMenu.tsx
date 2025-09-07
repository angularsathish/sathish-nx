// src/components/MobileMenu.tsx
import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blogs' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const targetElement = document.getElementById(href.substring(1));
    if (targetElement) {
      const yOffset = -70;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-green-400 transition-colors"
        aria-label="Toggle menu"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-950 border-b border-gray-800 p-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-gray-300 hover:text-green-400 transition-colors font-medium text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;