import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brightHRPartnership } from '../utils/constants';

export const BrightHR = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            BrightHR Partnership
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            We're proud to have partnered with BrightHR, the leader in HR and health & safety.
          </motion.p>
        </div>
      </section>

      {/* Partnership Details */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center mb-16"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {brightHRPartnership.title}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {brightHRPartnership.description}
              </p>
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
                className="rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                HR software & 24/7 employment law advice that saves you time and money
              </h3>
              <ul className="space-y-3">
                {brightHRPartnership.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-500 dark:text-primary-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Health & safety software and 24/7 advice ensuring a compliant and safe workplace
              </h3>
              <ul className="space-y-3">
                {brightHRPartnership.features.slice(5).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary-500 dark:text-primary-400 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Demo Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-4xl font-bold mb-4">
              See why more than 100,000 business owners trust BrightHR
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Here at BrightHR we support business owners from the off, reducing admin and stress, leaving you to do the thing your best at... running your business. Over 100,000 business across countries rely on us to simplify their people management as well provide expert legal advice - making sure your business is on the right side of the law.
            </p>
            <p className="text-lg text-gray-100 mb-8">
              Book a demo with one of our software experts, who can show you just how we can benefit your business
            </p>
            <div className="bg-white dark:bg-navy-900 rounded-2xl p-8 max-w-2xl mx-auto">
              <form className="space-y-4 text-left">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                    placeholder="ACME Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                    placeholder="01632 960410"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-white"
                    placeholder="john.smith@acmeinc.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all"
                >
                  Start my free demo
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

