import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SkillCard = ({ name, icon: Icon, color, index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
        >
            <Icon className={`text-3xl ${color}`} />
            <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
        </motion.div>
    );
};

SkillCard.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    index: PropTypes.number,
};

export default SkillCard;
