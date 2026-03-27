// src/components/Contact.tsx
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-900/50 relative flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-mono inline-block relative text-white mb-1">
            Get in <span className="text-green-400">Touch</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-500 opacity-70"></div>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat about code? Drop me a message, and let's make things happen!
          </p>
        </div>

        {/* Contact Content */}
        <div className="relative bg-gray-950 p-8 rounded-lg border border-gray-800 shadow-lg flex justify-center items-center">
          {/* table */}
          <div className=" absolute -bottom-20 -right-20 w-56 h-56 bg-gray-800/20 border-2 border-gray-700 rounded-full flex justify-center items-center">
            {/* pattern */}
            <div className="absolute inset-0 bg-hero opacity-[.03]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative w-full">
            {/* Contact Form */}
            <div className="relative">
              <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
                <i className="fas fa-envelope text-green-400 led-glow"></i> Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-400 transition-colors" 
                    placeholder="Your Name" 
                    required 
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-400 transition-colors" 
                    placeholder="Your Email" 
                    required 
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5} 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-green-400 transition-colors" 
                    placeholder="Your Message" 
                    required
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane"></i>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
                {success && <p className="text-green-400 text-center mt-4">Message sent successfully!</p>}
                {error && <p className="text-red-400 text-center mt-4">{error}</p>}
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="relative">
                <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
                  Contact Info
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3">
                    <i className="fas fa-envelope text-green-400"></i>
                    <a href="mailto:john@devworkspace.com" className="hover:text-green-400 transition-colors">sathish.stack@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-phone-alt text-green-400"></i>
                    <a href="tel:+1234567890" className="hover:text-green-400 transition-colors">+91 70104 05953</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-green-400"></i>
                    <span>Puducherry, In</span>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="relative">
                <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
                  Connect with Me
                </h3>
                <div className="flex gap-4">
                  <a href="https://github.com/angularsathish" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 text-2xl transition-colors transform hover:scale-110">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/sathish-kumar-184aa962/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 text-2xl transition-colors transform hover:scale-110">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  
                  
                </div>
              </div>
            </div>
          </div>
          
          {/* Coffee */}
          <div className="absolute bottom-10 right-10 w-12 h-16">
            <div className="absolute -right-4 top-6 h-8 w-8 border-4 border-gray-700 rounded-r-full"></div>
            <div className="absolute bottom-0 w-full h-10 bg-gray-700 rounded-b-lg"></div>
            <div className="absolute bottom-8 w-full h-8 bg-gray-600 rounded-lg">
              <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-amber-700 to-amber-900"></div>
            </div>
            <div className="absolute w-6 h-1 bg-white/20 rounded-full left-3 top-3"></div>
            {/* Steam Elements */}
            <div className="absolute w-1.5 h-4 bg-white bg-opacity-30 rounded-full left-4 -top-2 steam steam1"></div>
            <div className="absolute w-1.5 h-4 bg-white bg-opacity-30 rounded-full left-6 -top-4 steam steam2"></div>
            <div className="absolute w-1.5 h-4 bg-white bg-opacity-30 rounded-full left-8 -top-3 steam steam3"></div>
            <div className="absolute left-2 bottom-3 text-[8px] tracking-widest">COFFEE</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;