import {
    SiReact,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiJavascript,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiFirebase,
    SiGit,
    SiGithub,
    SiPostman,
    SiVercel,
    SiCloudinary,
    SiPython,
    SiC,
    SiMysql,
    SiTypescript,
    SiOpenai,
    SiSocketdotio,
    SiPrisma,
    SiPostgresql,
    SiDocker,
    SiRedux,
    SiNextdotjs,
} from 'react-icons/si';
import { FaJava, FaCode } from 'react-icons/fa';

/**
 * Maps a tech name (string) to a corresponding React Icon and brand color.
 * Supports GitHub language names and common topic names.
 * 
 * @param {string} name - The name of the technology/language
 * @returns {{ name: string, icon: React.ElementType, color: string }}
 */
export const getTechDetails = (name) => {
    const n = name.toLowerCase().replace(/\s+/g, '');

    const mapping = {
        react: { icon: SiReact, color: 'text-cyan-500' },
        reactjs: { icon: SiReact, color: 'text-cyan-500' },
        javascript: { icon: SiJavascript, color: 'text-yellow-400' },
        typescript: { icon: SiTypescript, color: 'text-blue-500' },
        html: { icon: SiHtml5, color: 'text-orange-600' },
        html5: { icon: SiHtml5, color: 'text-orange-600' },
        css: { icon: SiCss3, color: 'text-blue-600' },
        css3: { icon: SiCss3, color: 'text-blue-600' },
        tailwind: { icon: SiTailwindcss, color: 'text-cyan-400' },
        tailwindcss: { icon: SiTailwindcss, color: 'text-cyan-400' },
        node: { icon: SiNodedotjs, color: 'text-green-600' },
        nodejs: { icon: SiNodedotjs, color: 'text-green-600' },
        express: { icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
        expressjs: { icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
        mongodb: { icon: SiMongodb, color: 'text-green-500' },
        mongo: { icon: SiMongodb, color: 'text-green-500' },
        firebase: { icon: SiFirebase, color: 'text-yellow-500' },
        firestore: { icon: SiFirebase, color: 'text-orange-500' },
        mysql: { icon: SiMysql, color: 'text-blue-500' },
        postgresql: { icon: SiPostgresql, color: 'text-blue-400' },
        postgres: { icon: SiPostgresql, color: 'text-blue-400' },
        python: { icon: SiPython, color: 'text-blue-500' },
        java: { icon: FaJava, color: 'text-red-500' },
        c: { icon: SiC, color: 'text-blue-700' },
        git: { icon: SiGit, color: 'text-orange-600' },
        github: { icon: SiGithub, color: 'text-black dark:text-white' },
        vercel: { icon: SiVercel, color: 'text-black dark:text-white' },
        cloudinary: { icon: SiCloudinary, color: 'text-blue-500' },
        openai: { icon: SiOpenai, color: 'text-green-500' },
        'socket.io': { icon: SiSocketdotio, color: 'text-gray-900 dark:text-white' },
        socketio: { icon: SiSocketdotio, color: 'text-gray-900 dark:text-white' },
        prisma: { icon: SiPrisma, color: 'text-blue-900 dark:text-blue-300' },
        docker: { icon: SiDocker, color: 'text-blue-500' },
        redux: { icon: SiRedux, color: 'text-purple-600' },
        nextjs: { icon: SiNextdotjs, color: 'text-black dark:text-white' },
    };

    return mapping[n] || { name, icon: FaCode, color: 'text-gray-500' };
};

/**
 * Formats a list of GitHub topics/languages into the techStack format required by ProjectCard.
 * 
 * @param {string[]} techs - Array of technology names
 * @returns {Array<{ name: string, icon: React.ElementType, color: string }>}
 */
export const formatTechStack = (techs) => {
    if (!techs || !Array.isArray(techs)) return [];
    
    // Deduplicate and filter out filler strings
    const unique = [...new Set(techs.filter(t => t && typeof t === 'string'))];
    
    return unique.map(t => {
        const details = getTechDetails(t);
        return {
            name: t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, ' '),
            ...details
        };
    });
};
