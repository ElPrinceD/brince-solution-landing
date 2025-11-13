import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role?: string;
  company?: string;
  rating: number;
  text: string;
  delay?: number;
}

export const TestimonialCard = ({ name, role, company, rating, text, delay = 0 }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">⭐</span>
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{text}"</p>
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
        {(role || company) && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {[role, company].filter(Boolean).join(', ')}
          </div>
        )}
      </div>
    </motion.div>
  );
};

