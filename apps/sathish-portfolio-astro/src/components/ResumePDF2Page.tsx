// src/components/ResumePDF2Page.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Calculate years of experience based on start date
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

// 2-PAGE MODERN PROFESSIONAL RESUME TEMPLATE
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  // Left Sidebar - Modern Dark Theme
  sidebar: {
    width: '38%',
    backgroundColor: '#1e293b',
    padding: 24,
    paddingTop: 40,
    color: '#ffffff',
  },
  // Right Content Area
  content: {
    width: '62%',
    padding: 32,
    paddingTop: 40,
    backgroundColor: '#ffffff',
  },
  // Header - Modern Style
  headerInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 3,
    color: '#10b981',
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  jobTitle: {
    fontSize: 16,
    color: '#10b981',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  headerDivider: {
    height: 3,
    backgroundColor: '#10b981',
    marginTop: 10,
    marginBottom: 20,
    width: 80,
  },
  // Sidebar Sections
  sidebarSection: {
    marginTop: 24,
    marginBottom: 0,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#10b981',
    paddingBottom: 6,
    borderBottom: '2 solid #10b981',
  },
  contactLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
    color: '#10b981',
    letterSpacing: 0.5,
  },
  contactText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#e2e8f0',
  },
  socialItem: {
    fontSize: 8.5,
    marginBottom: 8,
    lineHeight: 1.4,
    color: '#cbd5e1',
  },
  // Content Sections
  contentSection: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingBottom: 4,
    borderBottom: '2 solid #10b981',
  },
  profileText: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.7,
    textAlign: 'justify',
  },
  // Experience & Education
  itemTitle: {
    fontSize: 11.5,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#10b981',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 10,
  },
  itemPercentage: {
    fontSize: 9,
    color: '#10b981',
    position: 'absolute',
    right: 0,
    fontWeight: 'bold',
  },
  bulletPoint: {
    fontSize: 9.5,
    color: '#475569',
    marginLeft: 0,
    marginBottom: 6,
    lineHeight: 1.6,
  },
  // Skills
  skillItem: {
    marginBottom: 11,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#e2e8f0',
    letterSpacing: 0.3,
  },
  skillBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
  },
  skillBarFill: {
    height: 6,
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  skillPercentage: {
    fontSize: 8.5,
    color: '#94a3b8',
  },
  // Personal Skills
  personalSkillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 9,
    color: '#e2e8f0',
  },
  // Personal Info
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    fontSize: 9.5,
  },
  infoLabel: {
    width: '45%',
    color: '#475569',
    fontWeight: 'bold',
  },
  infoValue: {
    width: '55%',
    color: '#0f172a',
  },
  // Area of Interest
  areaItem: {
    fontSize: 9.5,
    color: '#475569',
    marginBottom: 6,
    marginLeft: 12,
  },
  // Declaration
  declaration: {
    fontSize: 9.5,
    color: '#475569',
    lineHeight: 1.6,
    marginTop: 10,
  },
  signatureSection: {
    marginTop: 20,
  },
  signatureText: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 4,
  },
  signatureLine: {
    borderTop: '1 solid #cbd5e1',
    width: 150,
    marginTop: 20,
  },
  // Footer Badge
  footerBadge: {
    position: 'absolute',
    bottom: 20,
    right: 28,
    fontSize: 11,
    color: '#10b981',
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  // Language
  languageItem: {
    marginBottom: 10,
  },
});

const ResumePDF2Page = () => {
  // Calculate years of experience dynamically
  const yearsOfExperience = calculateExperience("2018-04-01");

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Contacts Section */}
          <View style={[styles.sidebarSection, { marginTop: 0 }]}>
            <Text style={styles.sidebarTitle}>CONTACT</Text>

            <Text style={styles.contactLabel}>ADDRESS</Text>
            <Text style={styles.contactText}>9, Jayam Nagar,{'\n'}Bahour,{'\n'}Puducherry, India</Text>

            <Text style={styles.contactLabel}>PHONE</Text>
            <Text style={styles.contactText}>+91 7010405953</Text>

            <Text style={styles.contactLabel}>EMAIL</Text>
            <Text style={styles.contactText}>sathish.stack@gmail.com</Text>
          </View>

          {/* Social Links Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>ONLINE</Text>

            <Text style={styles.contactLabel}>LINKEDIN</Text>
            <Text style={styles.socialItem}>linkedin.com/in/{'\n'}sathish-kumar-184aa962</Text>

            <Text style={styles.contactLabel}>GITHUB</Text>
            <Text style={styles.socialItem}>github.com/{'\n'}angularsathish</Text>

            <Text style={styles.contactLabel}>PORTFOLIO</Text>
            <Text style={styles.socialItem}>sathish-nx-three.vercel.app</Text>
          </View>

          {/* Skills Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>TECHNICAL SKILLS</Text>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>ANGULAR</Text>
                <Text style={styles.skillPercentage}>90%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '90%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>REACT / NEXT.JS</Text>
                <Text style={styles.skillPercentage}>88%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '88%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>NODE.JS</Text>
                <Text style={styles.skillPercentage}>85%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '85%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>NESTJS</Text>
                <Text style={styles.skillPercentage}>82%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '82%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>TYPESCRIPT</Text>
                <Text style={styles.skillPercentage}>90%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '90%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>GRAPHQL</Text>
                <Text style={styles.skillPercentage}>80%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '80%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>FIREBASE</Text>
                <Text style={styles.skillPercentage}>90%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '90%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>MYSQL</Text>
                <Text style={styles.skillPercentage}>78%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '78%' }]} />
              </View>
            </View>

            <View style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>MONGODB</Text>
                <Text style={styles.skillPercentage}>82%</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '82%' }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Right Content */}
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.headerInitials}>S/K</Text>
          <Text style={styles.name}>SATHISH KUMAR</Text>
          <Text style={styles.jobTitle}>Full-Stack Developer</Text>
          <View style={styles.headerDivider} />

          {/* Profile Section */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Professional Summary</Text>
            <Text style={styles.profileText}>
              Experienced Full-Stack Developer with {yearsOfExperience}+ years of expertise in building scalable, high-performance
              e-commerce applications. Specialized in Angular, React, Next.js, Node.js, NestJS, GraphQL, and REST APIs.
              Proven track record in developing comprehensive merchant and client-facing applications with focus on payment
              processing, inventory management, and customer loyalty programs. Strong problem-solving skills with ability to
              deliver complex business solutions using modern technologies.
            </Text>
          </View>

          {/* Education Section */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Education</Text>

            <View style={{ marginBottom: 14, position: 'relative' }}>
              <Text style={styles.itemTitle}>Dr. C.V. Raman University</Text>
              <Text style={styles.itemSubtitle}>Bachelor's in Computer Science</Text>
              <Text style={styles.itemDate}>2010 – 2013</Text>
              <Text style={styles.itemPercentage}>63.9%</Text>
            </View>

            <View style={{ marginBottom: 14, position: 'relative' }}>
              <Text style={styles.itemTitle}>Higher Secondary Education</Text>
              <Text style={styles.itemSubtitle}>St. Joseph's Higher Secondary School</Text>
              <Text style={styles.itemDate}>2008 – 2010</Text>
              <Text style={styles.itemPercentage}>68.4%</Text>
            </View>

            <View style={{ position: 'relative' }}>
              <Text style={styles.itemTitle}>High School</Text>
              <Text style={styles.itemSubtitle}>St. Joseph's Higher Secondary School</Text>
              <Text style={styles.itemDate}>Until 2008</Text>
              <Text style={styles.itemPercentage}>76.8%</Text>
            </View>
          </View>

          {/* Work Experience */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Work Experience</Text>

            <View>
              <Text style={styles.itemTitle}>Full-Stack Developer</Text>
              <Text style={styles.itemSubtitle}>Actech Software Pvt Ltd, Puducherry</Text>
              <Text style={styles.itemDate}>April 2018 – Present ({yearsOfExperience}+ years)</Text>

              <Text style={styles.bulletPoint}>• Architected and developed comprehensive e-commerce platform serving both merchant admin and client-facing applications using Angular, React, and Next.js frameworks</Text>
              <Text style={styles.bulletPoint}>• Designed and implemented scalable REST APIs and GraphQL services with Node.js and NestJS, managing Firebase, MySQL, and MongoDB databases for optimal performance</Text>
              {/* <Text style={styles.bulletPoint}>• Led integration of multiple payment gateways, Purchase Order systems, Quotation management, Sales tracking, Return & Exchange workflows</Text> */}
              
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Personal Skills */}
          <View style={[styles.sidebarSection, { marginTop: 0 }]}>
            <Text style={styles.sidebarTitle}>SOFT SKILLS</Text>

            <View style={{ marginTop: 10 }}>
              <View style={styles.personalSkillItem}>
                <Text>Team Collaboration</Text>
                <Text>90/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Leadership</Text>
                <Text>85/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Problem Solving</Text>
                <Text>92/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Communication</Text>
                <Text>88/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Creative Thinking</Text>
                <Text>90/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Innovation</Text>
                <Text>90/100</Text>
              </View>
              <View style={styles.personalSkillItem}>
                <Text>Time Management</Text>
                <Text>87/100</Text>
              </View>
            </View>
          </View>

          {/* Languages */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>LANGUAGES</Text>

            <View style={styles.languageItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>TAMIL</Text>
                <Text style={styles.skillPercentage}>Native</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '95%' }]} />
              </View>
            </View>

            <View style={styles.languageItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>ENGLISH</Text>
                <Text style={styles.skillPercentage}>Intermediate</Text>
              </View>
              <View style={styles.skillBar}>
                <View style={[styles.skillBarFill, { width: '65%' }]} />
              </View>
            </View>
          </View>

          {/* Certifications */}
          {/* <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>TOOLS & OTHERS</Text>
            <Text style={styles.socialItem}>Git & GitHub</Text>
            <Text style={styles.socialItem}>Docker</Text>
            <Text style={styles.socialItem}>Vercel & Netlify</Text>
            <Text style={styles.socialItem}>Postman & Insomnia</Text>
            <Text style={styles.socialItem}>VS Code</Text>
            <Text style={styles.socialItem}>Agile/Scrum</Text>
            <Text style={styles.socialItem}>CI/CD Pipelines</Text>
          </View> */}
        </View>

        {/* Right Content */}
        <View style={styles.content}>
          {/* Experience Continued */}
          {/* <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Experience Continued</Text>

            <Text style={styles.bulletPoint}>• Provided technical leadership and mentorship to junior developers throughout coding phases and project progression</Text>
            <Text style={styles.bulletPoint}>• Maintained and optimized existing systems for adaptation to evolving business requirements and technology changes</Text>
            <Text style={styles.bulletPoint}>• Utilized user stories and Agile methodologies to develop technical requirements for delivering new features and modules in a timely, cost-effective manner</Text>
            
           
          </View> */}

          {/* Key Projects */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Key Projects</Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={styles.itemTitle}>E-Commerce Platform - Merchant & Client Applications</Text>
              <Text style={styles.itemSubtitle}>Angular, React, Next.js | Node.js, NestJS | GraphQL, REST | Firebase, MySQL, MongoDB</Text>

              <Text style={styles.bulletPoint}>• Built comprehensive merchant admin platform managing inventory, orders, customer data, and business analytics</Text>
              <Text style={styles.bulletPoint}>• Developed customer-facing shopping application with intuitive UX, product browsing, cart management, and checkout flow</Text>
              <Text style={styles.bulletPoint}>• Integrated multiple payment gateways including Stripe, Razorpay for seamless transaction processing</Text>
              <Text style={styles.bulletPoint}>• Implemented Purchase Order system, Quotation management, invoicing, and automated reporting</Text>
              <Text style={styles.bulletPoint}>• Created Return & Exchange (RMA) workflow with automated refund processing</Text>
              {/* <Text style={styles.bulletPoint}>• Developed digital gift card system with balance tracking and redemption functionality</Text> */}
              {/* <Text style={styles.bulletPoint}>• Built points-based loyalty rewards program with tier management and real-time push notifications</Text> */}
            </View>
          </View>

          {/* Areas of Interest */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Areas of Interest</Text>
            <Text style={styles.areaItem}>• Modern Frontend Development (Angular, React, Next.js, Vue.js)</Text>
            <Text style={styles.areaItem}>• Backend Architecture & API Design (Node.js, NestJS, Express.js)</Text>
            <Text style={styles.areaItem}>• Cloud Solutions & Serverless Computing (Firebase, AWS, Vercel)</Text>
            <Text style={styles.areaItem}>• Database Design & Optimization (MySQL, MongoDB, PostgreSQL)</Text>
            <Text style={styles.areaItem}>• GraphQL & REST API Development</Text>
            <Text style={styles.areaItem}>• E-Commerce Solutions & Payment Integration</Text>
            <Text style={styles.areaItem}>• Real-time Applications & WebSocket Communication</Text>
            <Text style={styles.areaItem}>• Performance Optimization & Code Quality</Text>
          </View>

          {/* Personal Information */}
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Personal Information</Text>

            <View style={{ marginTop: 8 }}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nationality</Text>
                <Text style={styles.infoValue}>Indian</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>26th April 1992</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Marital Status</Text>
                <Text style={styles.infoValue}>Married</Text>
              </View>
            </View>
          </View>

          {/* Declaration */}
          <View style={[styles.contentSection, { marginBottom: 0 }]}>
            <Text style={styles.contentTitle}>Declaration</Text>
            <Text style={styles.declaration}>
              I hereby declare that all the above information given by me is true and accurate to the best of my knowledge and belief.
            </Text>

            <View style={styles.signatureSection}>
              <Text style={styles.signatureText}>Date: {new Date().toLocaleDateString('en-GB')}</Text>
              <Text style={styles.signatureText}>Place: Puducherry</Text>
              <View style={styles.signatureLine} />
            </View>
          </View>

          {/* Footer Badge */}
          <Text style={styles.footerBadge}>S/K</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF2Page;
