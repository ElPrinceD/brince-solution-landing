import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableSectionProps {
  title: string;
  subtitle?: string;
  preview: string;
  fullContent: string;
  items?: Array<{ title: string; description: string }>;
}

export const ExpandableSection = ({ title, subtitle, preview, fullContent, items }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg">
      {subtitle && (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{subtitle}</h3>
      )}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{preview}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">{fullContent}</p>
            {items && (
              <ul className="space-y-3 mb-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">{item.title}</span>
                        {item.description && (
                          <span className="text-gray-700 dark:text-gray-300 ml-2">{item.description}</span>
                        )}
                      </div>
                    </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 font-semibold inline-flex items-center transition-colors"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

