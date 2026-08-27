"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowLeft, FaExternalLinkAlt, FaEye, FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getDocument } from "@/lib/firestore";
import { projectsData } from "@/constants/projects";
import { experiences, education } from "@/constants/experience";
import { skillCategories } from "@/constants/skills";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"document" | "pdf">("document");

  const FALLBACK_URL = "/api/resume/download?v=latest";

  useEffect(() => {
    getDocument<{ resumeUrl: string }>("settings", "resume")
      .then((data) => {
        if (data?.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayUrl = resumeUrl || FALLBACK_URL;
  const isCloudinary = resumeUrl !== null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300 print:bg-white print:p-0">
      {/* Hide navbar on print */}
      <div className="print:hidden">
        <Navbar activeSection="resume" />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 print:p-0 print:max-w-none">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 print:hidden"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium text-sm"
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-gray-200 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setViewMode("document")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === "document"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FaEye size={12} /> Interactive View
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === "pdf"
                    ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <FaFilePdf size={12} /> PDF Viewer
              </button>
            </div>

            {isCloudinary && (
              <a
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-xs"
              >
                <FaExternalLinkAlt size={11} /> Open PDF Tab
              </a>
            )}

            <a
              href={displayUrl}
              download="Shivang_Rai_Resume.pdf"
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:translate-y-0 text-xs"
            >
              <FaDownload /> Download PDF
            </a>
          </div>
        </motion.div>

        {/* VIEW MODE: INTERACTIVE A4 DOCUMENT PREVIEW */}
        {viewMode === "document" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm border border-gray-200 dark:border-slate-800 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
              {/* Header */}
              <header className="text-center pb-4 mb-5 border-b border-slate-300">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  SHIVANG RAI
                </h1>
                <p className="text-sm font-bold text-blue-900 mt-1">
                  Full-Stack Developer · AI Automation & Data Science
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 mt-2 font-medium">
                  <a href="mailto:raishivang69@gmail.com" className="text-blue-600 hover:underline">
                    Gmail
                  </a>
                  <span className="text-slate-400">|</span>
                  <a href="https://github.com/shivangrai5143" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                  <span className="text-slate-400">|</span>
                  <a href="https://linkedin.com/in/shivang-rai-58b45728b" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                  <span className="text-slate-400">|</span>
                  <a href="https://shivang-2005.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Portfolio
                  </a>
                  <span className="text-slate-400">|</span>
                  <span>+91 7905192935</span>
                  <span className="text-slate-400">|</span>
                  <span>Lucknow, India</span>
                </div>
              </header>

              {/* Summary */}
              <section className="mb-5">
                <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 mb-2 border-b-2 border-blue-900">
                  SUMMARY
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Full-Stack Developer with hands-on experience building scalable web applications, AI multi-agent orchestration, and production backend systems. Proficient in React.js, .NET MVC, C#, SQL Server, Node.js, and Python. Adept at full-stack architecture, REST API engineering, real-time systems, and delivering robust software solutions.
                </p>
              </section>

              {/* Education */}
              <section className="mb-5">
                <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 mb-2 border-b-2 border-blue-900">
                  EDUCATION
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-slate-900">{edu.title}</span>
                      <span className="text-slate-500 font-medium">{edu.duration}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{edu.org}</p>
                    {edu.points.map((pt, i) => (
                      <p key={i} className="text-[11px] text-slate-600 mt-0.5">
                        {pt}
                      </p>
                    ))}
                  </div>
                ))}
              </section>

              {/* Technical Skills */}
              <section className="mb-5">
                <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 mb-2 border-b-2 border-blue-900">
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(skillCategories).map(([cat, skills]) => (
                    <div key={cat} className="flex flex-col sm:flex-row sm:items-baseline text-xs">
                      <span className="font-bold text-slate-900 sm:w-36 shrink-0">{cat}:</span>
                      <span className="text-slate-700">{skills.map((s) => s.label).join(", ")}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section className="mb-5">
                <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 mb-2 border-b-2 border-blue-900">
                  EXPERIENCE
                </h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-baseline text-xs mb-1">
                      <span className="font-bold text-slate-900">
                        {exp.title} — <span className="text-blue-900 font-bold">{exp.org}</span>
                      </span>
                      <span className="text-slate-500 font-medium">{exp.duration}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700 pl-3">
                      {exp.points.map((pt, i) => (
                        <li key={i} className="list-disc">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="mb-5">
                <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider pb-1 mb-2 border-b-2 border-blue-900">
                  PROJECTS
                </h2>
                <div className="space-y-3">
                  {projectsData.map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex justify-between items-baseline mb-1 flex-wrap gap-1">
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-slate-900 hover:text-blue-600 hover:underline flex items-center gap-1.5 group"
                        >
                          {proj.title}
                          <FaExternalLinkAlt size={10} className="text-blue-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <span className="text-[11px] text-slate-500 font-normal">
                          {proj.techStack.join(", ")}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {/* VIEW MODE: PDF IFRAME VIEWER */}
        {viewMode === "pdf" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[210mm] mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[1100px]"
          >
            {(loading || iframeLoading) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 z-10">
                <div className="w-12 h-12 border-4 border-gray-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4" />
                <p className="text-gray-500 dark:text-slate-400 font-medium text-sm">Loading PDF preview…</p>
              </div>
            )}

            {!loading && (
              <iframe
                src={displayUrl}
                className="w-full h-full min-h-[1100px] border-none"
                title="Resume PDF Viewer"
                onLoad={() => setIframeLoading(false)}
              />
            )}
          </motion.div>
        )}
      </main>

      {/* Print CSS styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
