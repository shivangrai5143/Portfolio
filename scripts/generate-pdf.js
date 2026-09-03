import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const ResumeDocument = () => React.createElement(
  Document,
  { title: "Shivang Rai - Resume", author: "Shivang Rai" },
  React.createElement(
    Page,
    { size: "A4", style: styles.page },
    // HEADER
    React.createElement(
      View,
      { style: styles.header },
      React.createElement(Text, { style: styles.name }, "SHIVANG RAI"),
      React.createElement(Text, { style: styles.subtitle }, "Full-Stack Developer · AI Automation & Data Science"),
      React.createElement(
        View,
        { style: styles.contactLine },
        React.createElement(Link, { src: "mailto:raishivang69@gmail.com", style: styles.link }, "raishivang69@gmail.com"),
        React.createElement(Text, { style: styles.separator }, "|"),
        React.createElement(Link, { src: "https://github.com/shivangrai5143", style: styles.link }, "GitHub"),
        React.createElement(Text, { style: styles.separator }, "|"),
        React.createElement(Link, { src: "https://linkedin.com/in/shivang-rai-58b45728b", style: styles.link }, "LinkedIn"),
        React.createElement(Text, { style: styles.separator }, "|"),
        React.createElement(Link, { src: "https://shivang-2005.vercel.app", style: styles.link }, "Portfolio"),
        React.createElement(Text, { style: styles.separator }, "|"),
        React.createElement(Text, null, "+91 7905192935"),
        React.createElement(Text, { style: styles.separator }, "|"),
        React.createElement(Text, null, "Lucknow, India")
      )
    ),

    // SUMMARY
    React.createElement(
      View,
      { style: styles.section },
      React.createElement(Text, { style: styles.sectionTitle }, "SUMMARY"),
      React.createElement(
        Text,
        { style: styles.summaryText },
        "Full-Stack Developer specializing in AI-integrated systems, with hands-on experience building scalable web applications, multi-agent AI pipelines, and cloud-deployed backend services. Proficient across modern frontend, backend, and database technologies, with hands-on experience in both JavaScript (Node.js/Express) and Python (Django/FastAPI) ecosystems, along with REST API design, authentication systems, real-time data streaming (WebSockets/SSE), and cloud infrastructure (AWS, GCP). Seeking a Software Engineering Internship to contribute this experience to production-scale engineering problems."
      )
    ),

    // EDUCATION
    React.createElement(
      View,
      { style: styles.section },
      React.createElement(Text, { style: styles.sectionTitle }, "EDUCATION"),
      React.createElement(
        View,
        { style: styles.eduHeader },
        React.createElement(Text, { style: styles.eduDegree }, "Bachelor of Technology (B.Tech) in Computer Science & Information Technology"),
        React.createElement(Text, { style: styles.eduDate }, "Expected: May 2027")
      ),
      React.createElement(Text, { style: styles.eduInstitution }, "Babu Banarasi Das University"),
      React.createElement(
        Text,
        { style: styles.eduCoursework },
        React.createElement(Text, { style: styles.boldLabel }, "Relevant Coursework : "),
        "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks"
      )
    ),

    // TECHNICAL SKILLS
    React.createElement(
      View,
      { style: styles.section },
      React.createElement(Text, { style: styles.sectionTitle }, "TECHNICAL SKILLS"),
      [
        ["Frontend:", "React.js, Next.js, Redux Toolkit, TypeScript, JavaScript (ES6+), Tailwind CSS, Vite, HTML5/CSS3"],
        ["Backend:", "C#, .NET MVC, ASP.NET Core, Node.js, Express.js, Python, FastAPI, RESTful APIs, WebSockets"],
        ["AI & Automation:", "Multi-Agent AI Pipelines, Gemini API, MCP (Model Context Protocol), Pydantic Schemas, SSE"],
        ["Databases & Data:", "SQL Server, PostgreSQL, MongoDB, MySQL, Redis, Firebase Firestore, Pandas, NumPy"],
        ["DevOps & Tools:", "Git/GitHub, Docker, GitHub Actions, AWS (EC2, S3), Nginx, Firebase, Vercel, Render"],
        ["Languages:", "C#, JavaScript, TypeScript, Python, Java, C++, SQL"]
      ].map(([cat, list], i) =>
        React.createElement(
          View,
          { key: i, style: styles.skillsRow },
          React.createElement(Text, { style: styles.skillCategory }, cat),
          React.createElement(Text, { style: styles.skillList }, list)
        )
      )
    ),

    // EXPERIENCE
    React.createElement(
      View,
      { style: styles.section },
      React.createElement(Text, { style: styles.sectionTitle }, "EXPERIENCE"),
      React.createElement(
        View,
        { style: styles.itemGroup },
        React.createElement(
          View,
          { style: styles.itemHeader },
          React.createElement(
            Text,
            { style: styles.itemTitle },
            "Software Developer Intern (React & .NET) — ",
            React.createElement(Text, { style: styles.itemCompany }, "Scurry Infotech LLP")
          ),
          React.createElement(Text, { style: styles.itemDate }, "Aug 2026 – Present")
        ),
        [
          ["Frontend Development : ", "Translated 15+ complex Figma mockups into fully responsive React components, ensuring strict cross-browser compatibility and improving client-side routing."],
          [".NET MVC & REST APIs : ", "Configured working Docker environments for the frontend architecture, streamlining local development and reducing onboarding setup time by roughly 40%."],
          ["Database & SQL Server : ", "Engineered and maintained 10+ REST API endpoints in .NET MVC, successfully handling data routing for core business modules."],
          ["Debugging & Git Collaboration : ", "Resolved 20+ critical bugs across the frontend and backend during agile sprints, significantly boosting system stability."]
        ].map(([label, text], i) =>
          React.createElement(
            View,
            { key: i, style: styles.bulletPoint },
            React.createElement(Text, { style: styles.bulletDot }, "•"),
            React.createElement(
              Text,
              { style: styles.bulletText },
              React.createElement(Text, { style: styles.boldLabel }, label),
              text
            )
          )
        )
      )
    ),

    // PROJECTS
    React.createElement(
      View,
      { style: styles.section },
      React.createElement(Text, { style: styles.sectionTitle }, "PROJECTS"),
      [
        {
          title: "APTICO — CAREER PROGRESS & GAMIFICATION PLATFORM",
          githubUrl: "https://github.com/VivekYadav-77/Aptico",
          tech: "React.js, FastAPI, Gemini API, Pydantic, Redis",
          bullets: [
            ["", "Engineered a full-stack platform (Next.js, Fastify, PostgreSQL/Neon via Drizzle ORM) that transforms job-search activity into a gamified XP and achievement system, leveraging an event-driven architecture that decouples XP calculation from reward delivery."],
            ["", "Integrated the Google Gemini API for AI-driven resume feedback and WebSockets for real-time multi-user progress synchronization; enforced Zod schema validation on the API layer and implemented TanStack Query on the frontend for type-safe, optimistic data fetching."]
          ]
        },
        {
          title: "REAL-TIME CHAT & CALLING APPLICATION",
          githubUrl: "https://github.com/shivangrai5143/CHAT-APP",
          tech: "React.js, Firebase Firestore, WebRTC, Tailwind CSS",
          bullets: [
            ["Real-Time Messaging: ", "Engineered messaging platform with Firebase Firestore snapshot listeners, supporting 1-on-1/group chats, typing indicators, and presence tracking with sub-second latency."],
            ["P2P Audio/Video : ", "Integrated WebRTC mesh architecture for direct peer-to-peer encrypted voice and video calls with automated client-side media compression."]
          ]
        },
        {
          title: "TRAFFIC INTELLIGENCE & ANALYTICS SYSTEM",
          githubUrl: "https://github.com/shivangrai5143/Traffic-intelligence-System",
          tech: "Python, FastAPI, React.js, Pandas, Leaflet",
          bullets: [
            ["Data Pipeline : ", "Processed 50k+ road transport records using Pandas & NumPy to analyze accident clusters, casualty severity, and peak congestion trends."],
            ["Geospatial Dashboard : ", "Created interactive heatmaps using Leaflet and React, powered by asynchronous FastAPI endpoints for rapid data filtering."]
          ]
        },
        {
          title: "THE ROASTING HOUSE — E-COMMERCE PLATFORM",
          githubUrl: "https://github.com/VivekYadav-77/The-Roasting-House",
          tech: "Next.js, TypeScript, Node.js, PostgreSQL, AWS S3",
          bullets: [
            ["", "Built a full-stack e-commerce platform (React, Node.js, Express, MongoDB) with JWT-based authentication (access/refresh tokens), OTP email verification, and a complete cart-to-checkout order flow."],
            ["", "Implemented real-time order tracking using Socket.io for live status updates and an integrated Gemini API chatbot for customer support."]
          ]
        }
      ].map((proj, i) =>
        React.createElement(
          View,
          { key: i, style: styles.itemGroup },
          React.createElement(
            View,
            { style: styles.itemHeader },
            React.createElement(
              Text,
              { style: styles.itemTitle },
              React.createElement(Link, { src: proj.githubUrl, style: styles.titleLink }, proj.title)
            ),
            React.createElement(Text, { style: styles.itemTech }, proj.tech)
          ),
          proj.bullets.map(([label, text], j) =>
            React.createElement(
              View,
              { key: j, style: styles.bulletPoint },
              React.createElement(Text, { style: styles.bulletDot }, "•"),
              React.createElement(
                Text,
                { style: styles.bulletText },
                label ? React.createElement(Text, { style: styles.boldLabel }, label) : null,
                text
              )
            )
          )
        )
      )
    )
  )
);

const outputPath = path.resolve(__dirname, '../public/resume.pdf');
console.log('Rendering PDF to:', outputPath);

ReactPDF.renderToFile(React.createElement(ResumeDocument), outputPath)
  .then(() => {
    console.log('Successfully generated public/resume.pdf');
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
