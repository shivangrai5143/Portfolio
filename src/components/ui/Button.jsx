import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    onClick,
    href,
    className = '',
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary:
            'bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl focus:ring-primary',
        secondary:
            'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
        dark: 'bg-gray-900 dark:bg-slate-700 hover:bg-gray-800 dark:hover:bg-slate-600 text-white shadow-lg hover:shadow-xl focus:ring-gray-500',
        accent:
            'bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white shadow-lg hover:shadow-xl focus:ring-primary',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const classes = clsx(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes} {...props}>
            {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'dark', 'accent']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    icon: PropTypes.elementType,
    onClick: PropTypes.func,
    href: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
