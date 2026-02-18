import {
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiTailwindcss,
    SiJavascript,
    SiFirebase,
    SiCloudinary,
    SiOpenai,
    SiVercel,
} from 'react-icons/si';

export const projectsData = [
    {
        id: 1,
        title: 'Real-Time Chat Application',
        description:
            'A full-stack real-time chat app built with React.js and Firebase. Features include instant messaging, user authentication, image sharing with Cloudinary, and real-time presence indicators.',
        image: '/chat_app_project_1771155656757.png',
        techStack: [
            { name: 'React', icon: SiReact, color: 'text-cyan-500' },
            { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
            { name: 'Cloudinary', icon: SiCloudinary, color: 'text-blue-500' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
            { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
        ],
        githubUrl: 'https://github.com/shivangrai5143/Chat-App',
        liveUrl: 'https://chat-app-demo.vercel.app',
        featured: true,
    },
    {
        id: 2,
        title: 'Project Management System',
        description:
            'A comprehensive project management application with collaborative whiteboard, AI chatbot assistant, task tracking, and team collaboration features. Built with MERN stack.',
        image: '/project_management_app_1771155674075.png',
        techStack: [
            { name: 'React', icon: SiReact, color: 'text-cyan-500' },
            { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
            { name: 'Express', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
            { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
            { name: 'OpenAI', icon: SiOpenai, color: 'text-green-500' },
        ],
        githubUrl: 'https://github.com/shivangrai5143/Project-Management-App',
        liveUrl: 'https://yojnaflow.vercel.app/',
        featured: true,
    },
    {
        id: 3,
        title: 'Coffee Shop MERN Application',
        description:
            'A mobile-friendly e-commerce platform for a coffee shop. Features include product browsing, customizable orders, shopping cart, secure payments, and AI-powered product recommendations.',
        image: '/projects/coffee-shop.svg',
        techStack: [
            { name: 'React', icon: SiReact, color: 'text-cyan-500' },
            { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
            { name: 'Express', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
            { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
            { name: 'Vercel', icon: SiVercel, color: 'text-black dark:text-white' },
        ],
        githubUrl: 'https://github.com/VivekYadav-77/Coffee-Shop-Web-App',
        liveUrl: 'https://the-roasting-house.vercel.app/',
        featured: true,
    },
    {
        id: 4,
        title: 'Weather App',
        description:
            'A responsive weather dashboard providing real-time weather data, 5-day forecasts, and location-based weather information. Clean UI with smooth animations and dark mode support.',
        image: '/projects/weather-app.svg',
        techStack: [
            { name: 'React', icon: SiReact, color: 'text-cyan-500' },
            { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
        ],
        githubUrl: 'https://github.com/shivangrai5143/Weather-App',
        liveUrl: 'https://thunder-weather-app.vercel.app/',
        featured: false,
    },
];

export default projectsData;
