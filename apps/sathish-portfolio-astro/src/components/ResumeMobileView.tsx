// src/components/ResumeMobileView.tsx
import React from 'react';

// Calculate years of experience
function calculateExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const hasNotCompletedYear =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (hasNotCompletedYear) years--;
  return years;
}

type TemplateType = '1-page' | '2-page';

interface ResumeMobileViewProps {
  template: TemplateType;
}

const ResumeMobileView: React.FC<ResumeMobileViewProps> = ({ template }) => {
  const yearsOfExperience = calculateExperience("2018-04-01");

  if (template === '1-page') {
    return (
      <div className="bg-white text-gray-900 max-w-4xl mx-auto p-6 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="border-b-2 border-green-500 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sathish Kumar</h1>
          <p className="text-lg text-green-600 font-semibold mb-3">Full-Stack Developer</p>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Email: sathish.stack@gmail.com</p>
            <p>Phone: +91 7010405953</p>
            <p>Location: Puducherry, India</p>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Experienced Full-Stack Developer with {yearsOfExperience} years expertise in building scalable e-commerce applications.
            Specialized in Angular, React, Next.js, Node.js, GraphQL, and REST APIs. Comprehensive experience developing merchant
            and client-facing applications with focus on payment processing, inventory management, and customer loyalty programs.
          </p>
        </section>

        {/* Work Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Work Experience
          </h2>
          <div>
            <h3 className="text-base font-bold text-gray-900">Full-Stack Developer</h3>
            <p className="text-sm text-green-600 font-semibold">Actech Software Pvt Ltd, Puducherry</p>
            <p className="text-sm text-gray-600 mb-3">Apr 2018 - Present ({yearsOfExperience} years)</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Architected comprehensive e-commerce platform with merchant admin and client-facing applications using Angular, React, Next.js</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Built scalable REST APIs and GraphQL services with Node.js, managing Firebase, MySQL, and MongoDB databases</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Implemented Payment integration, Purchase orders, Quotations, Sales, Return & Exchange, Gift cards, and Loyalty programs</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Developed real-time notification systems and comprehensive analytics dashboards for business insights</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {['JavaScript', 'TypeScript', 'Angular', 'React', 'Next.js', 'Node.js', 'NestJS', 'GraphQL',
              'REST API', 'Firebase', 'MySQL', 'MongoDB', 'Express.js', 'Git', 'Tailwind CSS', 'Bootstrap'].map((skill) => (
              <span key={skill} className="bg-amber-100 text-gray-900 text-xs px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Key Projects */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-3">
            Key Projects
          </h2>
          <div>
            <h3 className="text-base font-bold text-gray-900">E-Commerce Merchant & Client Applications</h3>
            <p className="text-sm text-green-600 font-semibold mb-3">Angular, React, Next.js | GraphQL, REST API | Firebase, MySQL, MongoDB</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Built merchant admin platform for inventory, orders, analytics and customer-facing shopping application with seamless UX</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Integrated payment gateways, Purchase orders, Quotations, invoicing, reporting, and automated RMA with refunds</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Developed digital gift card system, points-based loyalty rewards, tier management, and real-time push notifications</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Generated with React PDF • Portfolio: https://sathish-nx-three.vercel.app/
          </p>
        </div>
      </div>
    );
  }

  // 2-Page Template
  return (
    <div className="bg-white text-gray-900 max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden">
      {/* Page 1 */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-2/5 bg-slate-800 text-white p-6">
          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-green-400 border-b-2 border-green-400 pb-2 mb-4 tracking-wider">
              CONTACT
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">ADDRESS</p>
                <p className="text-gray-300 text-xs leading-relaxed">9, Jayam Nagar, Bahour, Puducherry, India</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">PHONE</p>
                <p className="text-gray-300 text-xs">+91 7010405953</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">EMAIL</p>
                <p className="text-gray-300 text-xs">sathish.stack@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Online */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-green-400 border-b-2 border-green-400 pb-2 mb-4 tracking-wider">
              ONLINE
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">LINKEDIN</p>
                <p className="text-gray-400 text-xs break-all">linkedin.com/in/sathish-kumar-184aa962</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">GITHUB</p>
                <p className="text-gray-400 text-xs break-all">github.com/angularsathish</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold text-xs mb-1">PORTFOLIO</p>
                <p className="text-gray-400 text-xs break-all">sathish-nx-three.vercel.app</p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-green-400 border-b-2 border-green-400 pb-2 mb-4 tracking-wider">
              TECHNICAL SKILLS
            </h3>
            <div className="space-y-3">
              {[
                { name: 'ANGULAR', level: 90 },
                { name: 'REACT / NEXT.JS', level: 88 },
                { name: 'NODE.JS', level: 85 },
                { name: 'NESTJS', level: 82 },
                { name: 'TYPESCRIPT', level: 90 },
                { name: 'GRAPHQL', level: 80 },
                { name: 'FIREBASE', level: 90 },
                { name: 'MYSQL', level: 78 },
                { name: 'MONGODB', level: 82 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-200">{skill.name}</span>
                    <span className="text-xs text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-green-400 border-b-2 border-green-400 pb-2 mb-4 tracking-wider">
              SOFT SKILLS
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Team Collaboration', score: '90/100' },
                { name: 'Leadership', score: '85/100' },
                { name: 'Problem Solving', score: '92/100' },
                { name: 'Communication', score: '88/100' },
                { name: 'Creative Thinking', score: '90/100' },
                { name: 'Innovation', score: '90/100' },
                { name: 'Time Management', score: '87/100' },
              ].map((skill) => (
                <div key={skill.name} className="flex justify-between text-gray-300">
                  <span>{skill.name}</span>
                  <span>{skill.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-sm font-bold text-green-400 border-b-2 border-green-400 pb-2 mb-4 tracking-wider">
              LANGUAGES
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-200">TAMIL</span>
                  <span className="text-xs text-gray-400">Native</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-200">ENGLISH</span>
                  <span className="text-xs text-gray-400">Intermediate</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/5 p-6">
          {/* Header */}
          <div className="mb-6">
            <p className="text-sm font-bold text-green-500 tracking-widest mb-2">S/K</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">SATHISH KUMAR</h1>
            <p className="text-base text-green-500 font-bold mb-2">Full-Stack Developer</p>
            <div className="w-20 h-1 bg-green-500 mb-4"></div>
          </div>

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">
              Experienced Full-Stack Developer with {yearsOfExperience}+ years of expertise in building scalable, high-performance
              e-commerce applications. Specialized in Angular, React, Next.js, Node.js, NestJS, GraphQL, and REST APIs.
              Proven track record in developing comprehensive merchant and client-facing applications with focus on payment
              processing, inventory management, and customer loyalty programs. Strong problem-solving skills with ability to
              deliver complex business solutions using modern technologies.
            </p>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              EDUCATION
            </h2>
            <div className="space-y-3">
              <div className="relative">
                <h3 className="text-sm font-bold text-gray-900">Dr. C.V. Raman University</h3>
                <p className="text-xs text-green-600 font-semibold">Bachelor's in Computer Science</p>
                <p className="text-xs text-gray-600">2010 – 2013</p>
                <span className="absolute right-0 top-0 text-xs text-green-600 font-bold">63.9%</span>
              </div>
              <div className="relative">
                <h3 className="text-sm font-bold text-gray-900">Higher Secondary Education</h3>
                <p className="text-xs text-green-600 font-semibold">St. Joseph's Higher Secondary School</p>
                <p className="text-xs text-gray-600">2008 – 2010</p>
                <span className="absolute right-0 top-0 text-xs text-green-600 font-bold">68.4%</span>
              </div>
              <div className="relative">
                <h3 className="text-sm font-bold text-gray-900">High School</h3>
                <p className="text-xs text-green-600 font-semibold">St. Joseph's Higher Secondary School</p>
                <p className="text-xs text-gray-600">Until 2008</p>
                <span className="absolute right-0 top-0 text-xs text-green-600 font-bold">76.8%</span>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              WORK EXPERIENCE
            </h2>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Full-Stack Developer</h3>
              <p className="text-xs text-green-600 font-semibold">Actech Software Pvt Ltd, Puducherry</p>
              <p className="text-xs text-gray-600 mb-3">April 2018 – Present ({yearsOfExperience}+ years)</p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li>• Architected and developed comprehensive e-commerce platform serving both merchant admin and client-facing applications using Angular, React, and Next.js frameworks</li>
                <li>• Designed and implemented scalable REST APIs and GraphQL services with Node.js and NestJS, managing Firebase, MySQL, and MongoDB databases for optimal performance</li>
              </ul>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              KEY PROJECTS
            </h2>
            <div>
              <h3 className="text-sm font-bold text-gray-900">E-Commerce Platform - Merchant & Client Applications</h3>
              <p className="text-xs text-green-600 font-semibold mb-2">Angular, React, Next.js | Node.js, NestJS | GraphQL, REST | Firebase, MySQL, MongoDB</p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li>• Built comprehensive merchant admin platform managing inventory, orders, customer data, and business analytics</li>
                <li>• Developed customer-facing shopping application with intuitive UX, product browsing, cart management, and checkout flow</li>
                <li>• Integrated multiple payment gateways including Stripe, Razorpay for seamless transaction processing</li>
                <li>• Implemented Purchase Order system, Quotation management, invoicing, and automated reporting</li>
                <li>• Created Return & Exchange (RMA) workflow with automated refund processing</li>
              </ul>
            </div>
          </section>

          {/* Areas of Interest */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              AREAS OF INTEREST
            </h2>
            <ul className="space-y-1 text-xs text-gray-700">
              <li>• Modern Frontend Development (Angular, React, Next.js, Vue.js)</li>
              <li>• Backend Architecture & API Design (Node.js, NestJS, Express.js)</li>
              <li>• Cloud Solutions & Serverless Computing (Firebase, AWS, Vercel)</li>
              <li>• Database Design & Optimization (MySQL, MongoDB, PostgreSQL)</li>
              <li>• GraphQL & REST API Development</li>
              <li>• E-Commerce Solutions & Payment Integration</li>
              <li>• Real-time Applications & WebSocket Communication</li>
              <li>• Performance Optimization & Code Quality</li>
            </ul>
          </section>

          {/* Personal Information */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              PERSONAL INFORMATION
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-2/5 text-gray-700 font-semibold">Nationality</span>
                <span className="w-3/5 text-gray-900">Indian</span>
              </div>
              <div className="flex">
                <span className="w-2/5 text-gray-700 font-semibold">Date of Birth</span>
                <span className="w-3/5 text-gray-900">26th April 1992</span>
              </div>
              <div className="flex">
                <span className="w-2/5 text-gray-700 font-semibold">Marital Status</span>
                <span className="w-3/5 text-gray-900">Married</span>
              </div>
            </div>
          </section>

          {/* Declaration */}
          <section>
            <h2 className="text-sm font-bold text-gray-900 border-b-2 border-green-500 pb-1 mb-3 tracking-wider">
              DECLARATION
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed mb-4">
              I hereby declare that all the above information given by me is true and accurate to the best of my knowledge and belief.
            </p>
            <div className="text-xs text-gray-600">
              <p>Date: {new Date().toLocaleDateString('en-GB')}</p>
              <p>Place: Puducherry</p>
              <div className="border-t border-gray-400 w-32 mt-4"></div>
            </div>
          </section>

          {/* Footer Badge */}
          <div className="text-right mt-6">
            <span className="text-sm font-bold text-green-500 tracking-widest">S/K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMobileView;
