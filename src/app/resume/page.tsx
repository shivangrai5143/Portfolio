"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ResumePage() {
  const [loading, setLoading] = useState(true);

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

          <a
            href="/api/resume/download"
            download
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaDownload /> Download PDF
          </a>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[70vh]"
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 z-10">
              <div className="w-12 h-12 border-4 border-gray-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-500 dark:text-slate-400 font-medium">Generating your dynamic resume...</p>
            </div>
          )}
          
          <iframe
            src="/api/resume/download"
            className="w-full h-full border-none"
            title="Resume PDF Viewer"
            onLoad={() => setLoading(false)}
          />
        </motion.div>
      </main>
    </div>
  );
}
