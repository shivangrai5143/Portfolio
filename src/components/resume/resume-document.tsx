import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#1f2937',
    lineHeight: 1.35,
  },
  // Header section
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  contactLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 9,
    color: '#475569',
    flexWrap: 'wrap',
    gap: 4,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  separator: {
    color: '#94a3b8',
    marginHorizontal: 3,
  },
  // Section styling
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingBottom: 2,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1e3a8a',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.35,
  },
  // Education
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
  },
  eduDate: {
    fontSize: 8.5,
    color: '#475569',
  },
  eduInstitution: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 2,
  },
  eduCoursework: {
    fontSize: 8.5,
    color: '#475569',
  },
  // Skills
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
    fontSize: 8.5,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    width: 115,
  },
  skillList: {
    color: '#334155',
    flex: 1,
  },
  // Experience & Projects
  itemGroup: {
    marginBottom: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
  },
  itemCompany: {
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
  },
  itemTech: {
    fontSize: 8.5,
    color: '#475569',
    fontFamily: 'Helvetica',
  },
  itemDate: {
    fontSize: 8.5,
    color: '#475569',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 1.5,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 8,
    fontSize: 9,
    color: '#0f172a',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#334155',
    lineHeight: 1.3,
  },
  boldLabel: {
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
});

export const ResumeDocument = () => (
  <Document title="Shivang Rai - Resume" author="Shivang Rai">
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>SHIVANG RAI</Text>
        <Text style={styles.subtitle}>Full-Stack Developer · AI Automation & Data Science</Text>
        <View style={styles.contactLine}>
          <Link src="mailto:raishivang69@gmail.com" style={styles.link}>Gmail</Link>
          <Text style={styles.separator}>|</Text>
          <Link src="https://github.com/shivangrai5143" style={styles.link}>GitHub</Link>
          <Text style={styles.separator}>|</Text>
          <Link src="https://linkedin.com/in/shivang-rai-58b45728b" style={styles.link}>LinkedIn</Link>
          <Text style={styles.separator}>|</Text>
          <Link src="https://shivang-2005.vercel.app" style={styles.link}>Portfolio</Link>
          <Text style={styles.separator}>|</Text>
          <Text>+91 7905192935</Text>
          <Text style={styles.separator}>|</Text>
          <Text>Lucknow, India</Text>
        </View>
      </View>

      {/* SUMMARY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text style={styles.summaryText}>
          Full-Stack Developer with hands-on experience building scalable web applications, AI multi-agent orchestration, and production backend systems. Proficient in React.js, .NET MVC, C#, SQL Server, Node.js, and Python. Adept at full-stack architecture, REST API engineering, real-time systems, and delivering robust software solutions.
        </Text>
      </View>

      {/* EDUCATION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <View style={styles.eduHeader}>
          <Text style={styles.eduDegree}>Bachelor of Technology (B.Tech) in Computer Science & Information Technology</Text>
          <Text style={styles.eduDate}>Expected: May 2027</Text>
        </View>
        <Text style={styles.eduInstitution}>Babu Banarasi Das University</Text>
        <Text style={styles.eduCoursework}>
          <Text style={styles.boldLabel}>Relevant Coursework : </Text>
          Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks
        </Text>
      </View>

      {/* TECHNICAL SKILLS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Frontend:</Text>
          <Text style={styles.skillList}>React.js, Next.js, Redux Toolkit, TypeScript, JavaScript (ES6+), Tailwind CSS, Vite, HTML5/CSS3</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Backend:</Text>
          <Text style={styles.skillList}>C#, .NET MVC, ASP.NET Core, Node.js, Express.js, Python, FastAPI, RESTful APIs, WebSockets</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>AI & Automation:</Text>
          <Text style={styles.skillList}>Multi-Agent AI Pipelines, Gemini API, MCP (Model Context Protocol), Pydantic Schemas, SSE</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Databases & Data:</Text>
          <Text style={styles.skillList}>SQL Server, PostgreSQL, MongoDB, MySQL, Redis, Firebase Firestore, Pandas, NumPy</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>DevOps & Tools:</Text>
          <Text style={styles.skillList}>Git/GitHub, Docker, GitHub Actions, AWS (EC2, S3), Nginx, Firebase, Vercel, Render</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Languages:</Text>
          <Text style={styles.skillList}>C#, JavaScript, TypeScript, Python, Java, C++, SQL</Text>
        </View>
      </View>

      {/* EXPERIENCE */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>
              Software Developer Intern (React & .NET) — <Text style={styles.itemCompany}>Scurry Infotech LLP</Text>
            </Text>
            <Text style={styles.itemDate}>Aug 2026 – Present</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Frontend Development : </Text>
              Built and maintained responsive, cross-browser web interfaces using <Text style={styles.boldLabel}>React.js, JavaScript, HTML, and CSS</Text>, managing client-side application routes for smooth navigation.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>.NET MVC & REST APIs : </Text>
              Developed and modified application features in <Text style={styles.boldLabel}>.NET MVC (C#)</Text>, engineering <Text style={styles.boldLabel}>REST APIs</Text> and backend request routing for seamless frontend-backend communication.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Database & SQL Server : </Text>
              Managed database operations with <Text style={styles.boldLabel}>SQL Server</Text>, executing queries and optimizing data retrieval for core business modules.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Debugging & Git Collaboration : </Text>
              Diagnosed and resolved end-to-end frontend and backend issues to boost system stability, using <Text style={styles.boldLabel}>Git</Text> for version control within an agile team environment.
            </Text>
          </View>
        </View>
      </View>

      {/* PROJECTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROJECTS</Text>

        {/* Project 1 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>APTICO — CAREER PROGRESS & GAMIFICATION PLATFORM</Text>
            <Text style={styles.itemTech}>React.js, FastAPI, Gemini API, Pydantic, Redis</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Multi-Agent AI Pipeline : </Text>
              Architected a 3-agent orchestration system (Auditor, Strategist, Copywriter) via <Text style={styles.boldLabel}>Gemini API</Text> with <Text style={styles.boldLabel}>Pydantic</Text> validation, eliminating untyped JSON output failures.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Real-Time Streaming : </Text>
              Implemented <Text style={styles.boldLabel}>Server-Sent Events (SSE)</Text> for zero-polling live feedback on React UI, integrating <Text style={styles.boldLabel}>Redis-cached</Text> XP progression and leaderboard rankings.
            </Text>
          </View>
        </View>

        {/* Project 2 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>REAL-TIME CHAT & CALLING APPLICATION</Text>
            <Text style={styles.itemTech}>React.js, Firebase Firestore, WebRTC, Tailwind CSS</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Real-Time Messaging: </Text>
              Engineered messaging platform with Firebase Firestore snapshot listeners, supporting 1-on-1/group chats, typing indicators, and presence tracking with sub-second latency.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>P2P Audio/Video : </Text>
              Integrated <Text style={styles.boldLabel}>WebRTC</Text> mesh architecture for direct peer-to-peer encrypted voice and video calls with automated client-side media compression.
            </Text>
          </View>
        </View>

        {/* Project 3 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>TRAFFIC INTELLIGENCE & ANALYTICS SYSTEM</Text>
            <Text style={styles.itemTech}>Python, FastAPI, React.js, Pandas, Leaflet</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Data Pipeline : </Text>
              Processed 50k+ road transport records using <Text style={styles.boldLabel}>Pandas & NumPy</Text> to analyze accident clusters, casualty severity, and peak congestion trends.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Geospatial Dashboard : </Text>
              Created interactive heatmaps using <Text style={styles.boldLabel}>Leaflet</Text> and React, powered by asynchronous <Text style={styles.boldLabel}>FastAPI</Text> endpoints for rapid data filtering.
            </Text>
          </View>
        </View>

        {/* Project 4 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>THE ROASTING HOUSE — E-COMMERCE PLATFORM</Text>
            <Text style={styles.itemTech}>Next.js, TypeScript, Node.js, PostgreSQL, AWS S3</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Auth & Storefront : </Text>
              Built an e-commerce platform with JWT authentication, role-based access control (Admin/Customer), persistent cart state, and order lifecycle workflows.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Cloud Storage & CI/CD : </Text>
              Integrated <Text style={styles.boldLabel}>AWS S3</Text> for product media uploads and configured automated GitHub Actions CI/CD workflows for continuous deployment.
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
