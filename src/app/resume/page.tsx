"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { getDocument } from "@/lib/firestore";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  // Static fallback PDF route (exists in the codebase)
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar activeSection="resume" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex flex-col">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <FaArrowLeft /> Back to Portfolio
          </Link>

          <div className="flex items-center gap-3">
            {isCloudinary && (
              <a
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-xl font-medium hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all text-sm"
              >
                <FaExternalLinkAlt size={12} /> Open in Tab
              </a>
            )}
            <a
              href={displayUrl}
              download="Shivang_Rai_Resume.pdf"
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <FaDownload /> Download PDF
            </a>
          </div>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[70vh]"
        >
          {(loading || iframeLoading) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 z-10">
              <div className="w-12 h-12 border-4 border-gray-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-500 dark:text-slate-400 font-medium">Loading resume…</p>
            </div>
          )}

          {!loading && (
            <iframe
              src={displayUrl}
              className="w-full h-full border-none"
              style={{ minHeight: "70vh" }}
              title="Resume PDF Viewer"
              onLoad={() => setIframeLoading(false)}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
}
