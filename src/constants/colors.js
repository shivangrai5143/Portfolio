// Color palette constants for the portfolio
// Used for consistent theming across light and dark modes

export const colors = {
    // Light Mode Colors
    light: {
        primary: '#3B82F6',      // blue-500
        primaryDark: '#2563EB',  // blue-600
        primaryLight: '#60A5FA', // blue-400
        secondary: '#8B5CF6',    // violet-500
        accent: '#10B981',       // emerald-500
        background: '#FFFFFF',
        surface: '#F9FAFB',      // gray-50
        surfaceHover: '#F3F4F6', // gray-100
        text: '#111827',         // gray-900
        textSecondary: '#6B7280', // gray-500
        border: '#E5E7EB',       // gray-200
    },

    // Dark Mode Colors
    dark: {
        primary: '#60A5FA',      // blue-400
        primaryDark: '#93C5FD',  // blue-300
        primaryLight: '#3B82F6', // blue-500
        secondary: '#A78BFA',    // violet-400
        accent: '#34D399',       // emerald-400
        background: '#0F172A',   // slate-900
        surface: '#1E293B',      // slate-800
        surfaceHover: '#334155', // slate-700
        text: '#F9FAFB',         // gray-50
        textSecondary: '#9CA3AF', // gray-400
        border: '#374151',       // gray-700
    },
};

// Gradient definitions
export const gradients = {
    hero: {
        light: 'from-blue-50 via-indigo-50 to-purple-50',
        dark: 'from-slate-900 via-blue-900 to-slate-900',
    },
    card: {
        light: 'from-white to-gray-50',
        dark: 'from-slate-800 to-slate-900',
    },
    primary: {
        light: 'from-blue-500 to-indigo-600',
        dark: 'from-blue-400 to-indigo-500',
    },
};

export default colors;
