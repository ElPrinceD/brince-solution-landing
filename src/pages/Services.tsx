import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services, appointments } from '../utils/constants';
import { AppointmentCard } from '../components/AppointmentCard';

const serviceImages = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
];

export const Services = () => {
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            Comprehensive solutions tailored to your business needs
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-navy-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700"
                >
                  {/* Image Header */}
                  <div className="relative h-64 md:h-96 overflow-hidden">
                    <img
                      src={serviceImages[index] || serviceImages[0]}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-5xl md:text-6xl">{service.icon}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    {/* Description */}
                    <div className="space-y-6 mb-8">
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                      {service.fullDescription && (
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          {service.fullDescription}
                        </p>
                      )}
                    </div>

                    {/* What We Offer */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          What We Offer:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="text-primary-500 dark:text-primary-400 text-xl mt-1">✓</span>
                              <p className="text-gray-700 dark:text-gray-300 flex-1">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Our Approach */}
                    {service.approach && service.approach.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Our Approach
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {service.approach.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="text-primary-500 dark:text-primary-400 text-xl mt-1">•</span>
                              <p className="text-gray-700 dark:text-gray-300 flex-1">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Why Choose Us */}
                    {service.whyChoose && service.whyChoose.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Why Choose {service.id === 'educational' ? 'Brince Solutions Educational Recruitment?' : 'Us?'}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {service.whyChoose.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <span className="text-primary-500 dark:text-primary-400 text-xl mt-1">•</span>
                              <p className="text-gray-700 dark:text-gray-300 flex-1">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Closing Statement */}
                    {service.closingStatement && (
                      <div className="mb-8 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
                        <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                          {service.closingStatement}
                        </p>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                      {service.cta && (
                        <Link
                          to={service.ctaLink || '/contact'}
                          className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          {service.cta}
                        </Link>
                      )}
                      {service.ctaSecondary && (
                        <Link
                          to={service.ctaLink || '/contact'}
                          className="inline-block px-8 py-4 bg-transparent border-2 border-primary-500 dark:border-primary-400 text-primary-500 dark:text-primary-400 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                        >
                          {service.ctaSecondary}
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-20 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Online Appointments and Master Class
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              (GMT+00:00) Edinburgh, London
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg font-semibold">
                All Services
              </span>
              <span className="px-4 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg">
                Business consultancy
              </span>
              <span className="px-4 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg">
                Ai Business Conference
              </span>
              <span className="px-4 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg">
                General Consultation
              </span>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {appointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment.id}
                id={appointment.id}
                title={appointment.title}
                duration={appointment.duration}
                price={appointment.price}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
