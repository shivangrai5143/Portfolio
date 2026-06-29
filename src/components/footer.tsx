"use client";

import { FaGithub } from "react-icons/fa";
import SocialLinks from "@/components/social-links";
import { NAV_LINKS, siteConfig } from "@/constants/site-config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Row: Logo + Social */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent"
          >
            Portfolio
          </a>

          {/* Social links */}
          <SocialLinks iconSize={22} />
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-slate-800 mb-6" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-slate-500">
          {/* Copyright */}
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>



          {/* GitHub link */}
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <FaGithub size={16} />
            Source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
