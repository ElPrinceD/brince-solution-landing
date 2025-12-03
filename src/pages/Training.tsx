import { motion } from 'framer-motion';
import { TrainingForm } from '../components/TrainingForm';

export const Training = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Professional Training Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            Advance your career with our comprehensive, nationally recognized training programs
          </motion.p>
        </div>
      </section>

      {/* Health and Social Care Training Level 3 */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-navy-800 dark:via-navy-900 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                  🎓 Professional Training
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Health and Social Care Training Level 3 (NVQ Level 3)
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  Advance your career in health and social care with our comprehensive NVQ Level 3 qualification. 
                  This nationally recognized certification is designed for individuals working in care settings who 
                  want to develop their skills and knowledge to provide high-quality support to those in need.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Comprehensive Curriculum</p>
                      <p className="text-gray-600 dark:text-gray-400">Covering all essential aspects of health and social care practice</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Nationally Recognized</p>
                      <p className="text-gray-600 dark:text-gray-400">NVQ Level 3 qualification accepted across the UK</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Expert Support</p>
                      <p className="text-gray-600 dark:text-gray-400">Dedicated assessors and trainers to guide you through your journey</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💼</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Career Advancement</p>
                      <p className="text-gray-600 dark:text-gray-400">Open doors to senior roles and specialized positions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Course Price</p>
                      <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">£1,200</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Flexible Payment Options Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Image and Form */}
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-8 md:p-12">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661540468885-8b63977d821f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                    alt="Health and Social Care Training"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/95 to-primary-700/95"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Course Image */}
                  <div className="mb-6 rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1661540468885-8b63977d821f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                      alt="Person studying for professional training"
                      className="w-full h-48 md:h-64 object-cover"
                      onError={(e) => {
                        // Fallback image if primary fails
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                  
                  {/* Form */}
                  <TrainingForm />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

