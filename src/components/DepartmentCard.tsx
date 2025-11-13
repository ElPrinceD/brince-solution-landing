import { motion } from 'framer-motion';

interface DepartmentCardProps {
  name: string;
  email: string;
  phone: string;
  icon: string;
  description: string;
  delay?: number;
}

export const DepartmentCard = ({ name, email, phone, icon, description, delay = 0 }: DepartmentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 dark:border-gray-700"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href={`mailto:${email}`}
          className="flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors group"
        >
          <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {email}
        </a>
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition-colors group"
        >
          <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone}
        </a>
      </div>
    </motion.div>
  );
};

