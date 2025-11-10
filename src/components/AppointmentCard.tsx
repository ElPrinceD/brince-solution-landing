import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AppointmentCardProps {
  title: string;
  duration: string;
  price: string;
  delay?: number;
}

export const AppointmentCard = ({ title, duration, price, delay = 0 }: AppointmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 dark:text-gray-400">{duration}</span>
        <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">{price}</span>
      </div>
      <Link
        to="/contact"
        className="block w-full text-center px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
      >
        BOOK
      </Link>
    </motion.div>
  );
};

