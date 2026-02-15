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
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Skills data organized by category
export const skillsData = [
    {
        id: 'frontend',
        title: 'Frontend',
        color: 'from-cyan-500 to-blue-500',
        skills: [
            { name: 'React', icon: SiReact, color: 'text-cyan-500' },
            { name: 'HTML', icon: SiHtml5, color: 'text-orange-600' },
            { name: 'CSS', icon: SiCss3, color: 'text-blue-600' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
            { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
        ],
    },
    {
        id: 'backend',
        title: 'Backend',
        color: 'from-green-500 to-emerald-500',
        skills: [
            { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
            { name: 'Express.js', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
        ],
    },
    {
        id: 'database',
        title: 'Database',
        color: 'from-emerald-500 to-teal-500',
        skills: [
            { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
            { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
            { name: 'Firestore', icon: SiFirebase, color: 'text-orange-500' },
        ],
    },
    {
        id: 'languages',
        title: 'Languages',
        color: 'from-amber-500 to-orange-500',
        skills: [
            { name: 'Java', icon: FaJava, color: 'text-red-500' },
            { name: 'Python', icon: SiPython, color: 'text-blue-500' },
            { name: 'C', icon: SiC, color: 'text-blue-700' },
        ],
    },
    {
        id: 'tools',
        title: 'Tools & Others',
        color: 'from-violet-500 to-purple-500',
        skills: [
            { name: 'Git', icon: SiGit, color: 'text-orange-600' },
            { name: 'GitHub', icon: SiGithub, color: 'text-gray-900 dark:text-white' },
            { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
            { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
            { name: 'Cloudinary', icon: SiCloudinary, color: 'text-blue-500' },
        ],
    },
];

export default skillsData;
