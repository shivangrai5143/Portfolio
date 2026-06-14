"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { siteConfig } from "@/constants/site-config";

/** Map platform names → react-icon components */
const platformIconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaXTwitter,
};

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks = ({ className = "", iconSize = 28 }: SocialLinksProps) => {
  return (
    <div className={`flex justify-center gap-6 ${className}`}>
      {siteConfig.socialLinks.map((social, index) => {
        const Icon = platformIconMap[social.platform] ?? FaGithub;
        return (
          <motion.a
            key={social.platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.2, y: -3 }}
            className={`text-gray-600 dark:text-gray-400 ${social.hoverColor} transition-all duration-300`}
            aria-label={social.platform}
          >
            <Icon size={iconSize} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
