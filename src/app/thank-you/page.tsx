'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export default function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-10 text-center border border-gray-100 dark:border-slate-700"
      >
        <div className="text-6xl mb-6">🚀</div>

        <h1 className="text-4xl font-bold mb-4 font-heading text-gray-900 dark:text-white">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-sans">
          Your message has been successfully sent. I&apos;ll get back to you as
          soon as possible.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-lg font-sans"
        >
          <FaArrowLeft />
          Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
