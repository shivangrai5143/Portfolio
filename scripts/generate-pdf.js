import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        React.createElement(Link, { src: "mailto:raishivang69@gmail.com", style: styles.link }, "Gmail"),
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
        "Full-Stack Developer with hands-on experience building scalable web applications, AI multi-agent orchestration, and production backend systems. Proficient in React.js, .NET MVC, C#, SQL Server, Node.js, and Python. Adept at full-stack architecture, REST API engineering, real-time systems, and delivering robust software solutions."
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
          ["Frontend Development : ", "Built and maintained responsive, cross-browser web interfaces using React.js, JavaScript, HTML, and CSS, managing client-side application routes for smooth navigation."],
          [".NET MVC & REST APIs : ", "Developed and modified application features in .NET MVC (C#), engineering REST APIs and backend request routing for seamless frontend-backend communication."],
          ["Database & SQL Server : ", "Managed database operations with SQL Server, executing queries and optimizing data retrieval for core business modules."],
          ["Debugging & Git Collaboration : ", "Diagnosed and resolved end-to-end frontend and backend issues to boost system stability, using Git for version control within an agile team environment."]
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
          tech: "React.js, FastAPI, Gemini API, Pydantic, Redis",
          bullets: [
            ["Multi-Agent AI Pipeline : ", "Architected a 3-agent orchestration system (Auditor, Strategist, Copywriter) via Gemini API with Pydantic validation, eliminating untyped JSON output failures."],
            ["Real-Time Streaming : ", "Implemented Server-Sent Events (SSE) for zero-polling live feedback on React UI, integrating Redis-cached XP progression and leaderboard rankings."]
          ]
        },
        {
          title: "REAL-TIME CHAT & CALLING APPLICATION",
          tech: "React.js, Firebase Firestore, WebRTC, Tailwind CSS",
          bullets: [
            ["Real-Time Messaging: ", "Engineered messaging platform with Firebase Firestore snapshot listeners, supporting 1-on-1/group chats, typing indicators, and presence tracking with sub-second latency."],
            ["P2P Audio/Video : ", "Integrated WebRTC mesh architecture for direct peer-to-peer encrypted voice and video calls with automated client-side media compression."]
          ]
        },
        {
          title: "TRAFFIC INTELLIGENCE & ANALYTICS SYSTEM",
          tech: "Python, FastAPI, React.js, Pandas, Leaflet",
          bullets: [
            ["Data Pipeline : ", "Processed 50k+ road transport records using Pandas & NumPy to analyze accident clusters, casualty severity, and peak congestion trends."],
            ["Geospatial Dashboard : ", "Created interactive heatmaps using Leaflet and React, powered by asynchronous FastAPI endpoints for rapid data filtering."]
          ]
        },
        {
          title: "THE ROASTING HOUSE — E-COMMERCE PLATFORM",
          tech: "Next.js, TypeScript, Node.js, PostgreSQL, AWS S3",
          bullets: [
            ["Auth & Storefront : ", "Built an e-commerce platform with JWT authentication, role-based access control (Admin/Customer), persistent cart state, and order lifecycle workflows."],
            ["Cloud Storage & CI/CD : ", "Integrated AWS S3 for product media uploads and configured automated GitHub Actions CI/CD workflows for continuous deployment."]
          ]
        }
      ].map((proj, i) =>
        React.createElement(
          View,
          { key: i, style: styles.itemGroup },
          React.createElement(
            View,
            { style: styles.itemHeader },
            React.createElement(Text, { style: styles.itemTitle }, proj.title),
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
                React.createElement(Text, { style: styles.boldLabel }, label),
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
