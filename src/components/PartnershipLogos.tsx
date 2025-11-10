import { motion } from 'framer-motion';
import { partners } from '../utils/constants';

export const PartnershipLogos = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Our Approved Partners
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

