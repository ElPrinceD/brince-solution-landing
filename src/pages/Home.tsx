import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { StatisticCounter } from '../components/StatisticCounter';
import { TestimonialCard } from '../components/TestimonialCard';
import { NewsCard } from '../components/NewsCard';
import { AppointmentCard } from '../components/AppointmentCard';
import { services, testimonials, newsPosts, aiConference, brightHRPartnership, appointments } from '../utils/constants';

export const Home = () => {
  return (
    <div className="pt-20">
      <Hero />

      {/* AI Conference Banner */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                AI Business Conference coming soon
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">{aiConference.title}</h2>
              <p className="text-lg text-gray-100">{aiConference.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sm text-gray-200">Date</div>
                  <div className="font-semibold">{aiConference.date}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sm text-gray-200">Location</div>
                  <div className="font-semibold">{aiConference.location}</div>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Learn more
              </Link>
            </div>
            <div className="relative">
              <img
                src={aiConference.image}
                alt="AI Conference"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* BrightHR Partnership */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-navy-800 dark:to-navy-900 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Partnership
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {brightHRPartnership.title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {brightHRPartnership.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {brightHRPartnership.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-primary-500 dark:text-primary-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all"
                >
                  Book your free demo
                </Link>
              </div>
              <div className="relative">
                <img
                  src={brightHRPartnership.logo}
                  alt="BrightHR Partnership"
                  className="rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive solutions for your business needs
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                icon={service.icon}
                description={service.description}
                cta="Learn More"
                ctaLink={`/services#${service.id}`}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatisticCounter value={10} suffix="+" label="Years of Expertise" />
            <StatisticCounter value={50} suffix="+" label="Projects Delivered" />
            <StatisticCounter value={100} suffix="+" label="Happy Clients" />
            <StatisticCounter value={25} suffix="+" label="Team Members" />
          </div>
        </div>
      </section>

      {/* Online Appointments and Master Class */}
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
                title={appointment.title}
                duration={appointment.duration}
                price={appointment.price}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-20 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Stay updated with our latest updates and announcements
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPosts.map((post, index) => (
              <NewsCard
                key={post.id}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                image={post.image}
                link={`/news#${post.id}`}
                delay={index * 0.1}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/news"
              className="inline-block px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

