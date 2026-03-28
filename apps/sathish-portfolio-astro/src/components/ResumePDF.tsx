// src/components/ResumePDF.tsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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

// SINGLE PAGE with FULL EVEN SPACING - Uses entire A4 page
const styles = StyleSheet.create({
  page: {
    padding: 28,
    paddingBottom: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 12,
    borderBottom: '2 solid #10b981',
    paddingBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginTop: 11,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    borderBottom: '1 solid #d1d5db',
    paddingBottom: 2,
  },
  text: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 2,
    marginBottom: 0,
  },
  experience: {
    marginBottom: 0,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 11,
    color: '#4b5563',
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e8e1d9',
    padding: '2 6',
    borderRadius: 3,
    color: '#1a1a1a',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 28,
    right: 28,
    textAlign: 'center',
    fontSize: 7,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 5,
  },
});

const ResumePDF = () => {
  // Calculate years of experience dynamically
  const yearsOfExperience = calculateExperience("2018-04-01");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>Sathish Kumar</Text>
          <Text style={styles.title}>Full-Stack Developer</Text>
          <View style={styles.contactInfo}>
            <Text>Email: sathish.stack@gmail.com</Text>
            <Text>Phone: +91 7010405953</Text>
            <Text>Location: Puducherry, India</Text>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>
            Experienced Full-Stack Developer with {yearsOfExperience} years expertise in building scalable e-commerce applications.
            Specialized in Angular, React, Next.js, Node.js, GraphQL, and REST APIs. Comprehensive experience developing merchant
            and client-facing applications with focus on payment processing, inventory management, and customer loyalty programs.
          </Text>
        </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>

        <View style={styles.experience}>
          <Text style={styles.jobTitle}>Full-Stack Developer</Text>
          <Text style={styles.company}>Actech Software Pvt Ltd, Puducherry.</Text>
          <Text style={styles.date}>Apr 2018 - Present ({yearsOfExperience} years)</Text>
          <Text style={styles.bulletPoint}>• Architected comprehensive e-commerce platform with merchant admin and client-facing applications using Angular, React, Next.js</Text>
          <Text style={styles.bulletPoint}>• Built scalable REST APIs and GraphQL services with Node.js, managing Firebase, MySQL, and MongoDB databases</Text>
          <Text style={styles.bulletPoint}>• Implemented Payment integration, Purchase orders, Quotations, Sales, Return & Exchange, Gift cards, and Loyalty programs</Text>
          <Text style={styles.bulletPoint}>• Developed real-time notification systems and comprehensive analytics dashboards for business insights</Text>
        </View>
      </View>

      {/* Technical Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillsContainer}>
          <Text style={styles.skill}>JavaScript</Text>
          <Text style={styles.skill}>TypeScript</Text>
          <Text style={styles.skill}>Angular</Text>
          <Text style={styles.skill}>React</Text>
          <Text style={styles.skill}>Next.js</Text>
          <Text style={styles.skill}>Node.js</Text>
          <Text style={styles.skill}>NestJS</Text>
          <Text style={styles.skill}>GraphQL</Text>
          <Text style={styles.skill}>REST API</Text>
          <Text style={styles.skill}>Firebase</Text>
          <Text style={styles.skill}>MySQL</Text>
          <Text style={styles.skill}>MongoDB</Text>
          <Text style={styles.skill}>Express.js</Text>
          <Text style={styles.skill}>Git</Text>
          <Text style={styles.skill}>Tailwind CSS</Text>
          <Text style={styles.skill}>Bootstrap</Text>
        </View>
      </View>

      {/* Education */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.educationItem}>
          <Text style={styles.degree}>Bachelor of Technology in Computer Science</Text>
          <Text style={styles.institution}>Anna University, Chennai</Text>
          <Text style={styles.date}>2014 - 2018</Text>
        </View>
      </View> */}

      {/* Key Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Projects</Text>

        <View style={styles.experience}>
          <Text style={styles.jobTitle}>E-Commerce Merchant & Client Applications</Text>
          <Text style={styles.company}>Angular, React, Next.js | GraphQL, REST API | Firebase, MySQL, MongoDB</Text>
          <Text style={styles.bulletPoint}>• Built merchant admin platform for inventory, orders, analytics and customer-facing shopping application with seamless UX</Text>
          <Text style={styles.bulletPoint}>• Integrated payment gateways, Purchase orders, Quotations, invoicing, reporting, and automated RMA with refunds</Text>
          <Text style={styles.bulletPoint}>• Developed digital gift card system, points-based loyalty rewards, tier management, and real-time push notifications</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Generated with React PDF • Portfolio: https://sathish-nx-three.vercel.app/
      </Text>
    </Page>
  </Document>
  );
};

export default ResumePDF;
