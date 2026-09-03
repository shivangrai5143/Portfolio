import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 32,
    paddingRight: 32,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1e293b',
    lineHeight: 1.3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 5,
  },
  name: {
    fontSize: 19,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    marginBottom: 3,
  },
  contactLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8.8,
    color: '#475569',
    flexWrap: 'wrap',
    gap: 4,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  titleLink: {
    color: '#0f172a',
    textDecoration: 'none',
    fontFamily: 'Helvetica-Bold',
  },
  separator: {
    color: '#94a3b8',
    marginHorizontal: 3,
  },
  section: {
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
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
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  eduDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
  },
  eduDate: {
    fontSize: 9,
    color: '#475569',
  },
  eduInstitution: {
    fontSize: 9.5,
    color: '#334155',
    marginBottom: 2,
  },
  eduCoursework: {
    fontSize: 9,
    color: '#475569',
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 2.5,
    fontSize: 9,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    width: 120,
  },
  skillList: {
    color: '#334155',
    flex: 1,
  },
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
    fontSize: 9,
    color: '#475569',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: '#0f172a',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.8,
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
          <Link src="mailto:raishivang69@gmail.com" style={styles.link}>raishivang69@gmail.com</Link>
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
          Full-Stack Developer specializing in AI-integrated systems, with hands-on experience building scalable web applications, multi-agent AI pipelines, and cloud-deployed backend services. Proficient across modern frontend, backend, and database technologies, with hands-on experience in both JavaScript (Node.js/Express) and Python (Django/FastAPI) ecosystems, along with REST API design, authentication systems, real-time data streaming (WebSockets/SSE), and cloud infrastructure (AWS, GCP). Seeking a Software Engineering Internship to contribute this experience to production-scale engineering problems.
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
              Translated 15+ complex Figma mockups into fully responsive React components, ensuring strict cross-browser compatibility and improving client-side routing.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>.NET MVC & REST APIs : </Text>
              Configured working Docker environments for the frontend architecture, streamlining local development and reducing onboarding setup time by roughly 40%.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Database & SQL Server : </Text>
              Engineered and maintained 10+ REST API endpoints in .NET MVC, successfully handling data routing for core business modules.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Debugging & Git Collaboration : </Text>
              Resolved 20+ critical bugs across the frontend and backend during agile sprints, significantly boosting system stability.
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
            <Text style={styles.itemTitle}>
              <Link src="https://github.com/VivekYadav-77/Aptico" style={styles.titleLink}>
                APTICO — CAREER PROGRESS & GAMIFICATION PLATFORM
              </Link>
            </Text>
            <Text style={styles.itemTech}>React.js, FastAPI, Gemini API, Pydantic, Redis</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Engineered a full-stack platform (Next.js, Fastify, PostgreSQL/Neon via Drizzle ORM) that transforms job-search activity into a gamified XP and achievement system, leveraging an event-driven architecture that decouples XP calculation from reward delivery.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Integrated the Google Gemini API for AI-driven resume feedback and WebSockets for real-time multi-user progress synchronization; enforced Zod schema validation on the API layer and implemented TanStack Query on the frontend for type-safe, optimistic data fetching.
            </Text>
          </View>
        </View>

        {/* Project 2 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>
              <Link src="https://github.com/shivangrai5143/CHAT-APP" style={styles.titleLink}>
                REAL-TIME CHAT & CALLING APPLICATION
              </Link>
            </Text>
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
              Integrated WebRTC mesh architecture for direct peer-to-peer encrypted voice and video calls with automated client-side media compression.
            </Text>
          </View>
        </View>

        {/* Project 3 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>
              <Link src="https://github.com/shivangrai5143/Traffic-intelligence-System" style={styles.titleLink}>
                TRAFFIC INTELLIGENCE & ANALYTICS SYSTEM
              </Link>
            </Text>
            <Text style={styles.itemTech}>Python, FastAPI, React.js, Pandas, Leaflet</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Data Pipeline : </Text>
              Processed 50k+ road transport records using Pandas & NumPy to analyze accident clusters, casualty severity, and peak congestion trends.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.boldLabel}>Geospatial Dashboard : </Text>
              Created interactive heatmaps using Leaflet and React, powered by asynchronous FastAPI endpoints for rapid data filtering.
            </Text>
          </View>
        </View>

        {/* Project 4 */}
        <View style={styles.itemGroup}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>
              <Link src="https://github.com/VivekYadav-77/The-Roasting-House" style={styles.titleLink}>
                THE ROASTING HOUSE — E-COMMERCE PLATFORM
              </Link>
            </Text>
            <Text style={styles.itemTech}>Next.js, TypeScript, Node.js, PostgreSQL, AWS S3</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Built a full-stack e-commerce platform (React, Node.js, Express, MongoDB) with JWT-based authentication (access/refresh tokens), OTP email verification, and a complete cart-to-checkout order flow.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              Implemented real-time order tracking using Socket.io for live status updates and an integrated Gemini API chatbot for customer support.
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
