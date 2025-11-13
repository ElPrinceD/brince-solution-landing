import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { testimonials } from '../utils/constants';
import { PartnershipLogos } from '../components/PartnershipLogos';
import { ExpandableSection } from '../components/ExpandableSection';

export const About = () => {
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
            We are expert in Business Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            ABOUT US
          </motion.p>
        </div>
      </section>

      {/* Trained and Reliable Team */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Trained and Reliable Team
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Brince Solutions is a dynamic Advertising, Sales, Marketing, Business set up and Training company dedicated to helping businesses and individuals achieve sustainable growth and long-term success. We combine creativity, strategy, and expertise to deliver tailored solutions that increase visibility, strengthen brand presence, and improve performance.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our services span across advertising campaigns, digital and traditional marketing, sales consultancy, and professional training programmed designed to equip teams with the skills and confidence to thrive in today's competitive market.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At Brince Solutions, we pride ourselves on being more than just a service provider — we are a trusted partner, committed to driving measurable results, building strong client relationships, and inspiring excellence at every level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Testimonials
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="mb-4">
                  <span className="text-primary-500 dark:text-primary-400 font-semibold text-lg">1. {testimonial.name}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic text-lg">
                  "{testimonial.text}"
                </p>
                <div className="text-gray-600 dark:text-gray-400">
                  — {testimonial.name}{testimonial.role || testimonial.company ? `, ${[testimonial.role, testimonial.company].filter(Boolean).join(', ')}` : ''}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all"
            >
              Book An Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story - Expandable */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExpandableSection
            subtitle="Brince Solutions Ltd"
            title="Our Story"
            preview="Brince Solutions was founded with a simple but powerful idea: to bridge the gap between businesses and their growth potential. We recognized that many organisations struggled with visibility, sales performance, and the right skills to stay competitive in a fast-changing marketplace. Out of this need, Brince Solutions was born."
            fullContent="From humble beginnings, we've grown into a trusted partner for businesses across various industries, helping them navigate the complexities of modern business through innovative solutions, expert guidance, and unwavering commitment to excellence. Our journey has been marked by continuous learning, adaptation, and a relentless focus on delivering value to our clients."
          />
        </div>
      </section>

      {/* Our Services - Expandable */}
      <section className="py-20 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExpandableSection
            title="Our Services"
            preview="At Brince Solutions, we offer a wide range of professional services designed to help businesses and individuals achieve growth, visibility, and long-term success. Our core services include:"
            fullContent=""
            items={[
              {
                title: 'Advertising & Marketing',
                description: 'Creative advertising campaigns (digital & traditional)',
              },
              {
                title: 'Social media management',
                description: '& brand promotion',
              },
              {
                title: 'Market research',
                description: 'and customer insights',
              },
              {
                title: 'Sales consultancy',
                description: 'and strategy development',
              },
              {
                title: 'Business setup',
                description: 'and registration services',
              },
              {
                title: 'Training programs',
                description: 'for professional development',
              },
            ]}
          />
        </div>
      </section>

      {/* Our Approach - Expandable */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ExpandableSection
            title="Our Approach – Brince Solutions"
            preview="At Brince Solutions, we believe that every client is unique, which is why we take a personalized, results-driven approach to every project. Our process is built around collaboration, innovation, and measurable impact."
            fullContent=""
            items={[
              {
                title: 'Understanding Your Needs',
                description: 'We start by listening. Through in-depth consultations, we take time to understand your goals, challenges, and unique requirements.',
              },
              {
                title: 'Tailored Solutions',
                description: 'We develop strategies and campaigns that are specific to your business needs and objectives.',
              },
              {
                title: 'Implementation & Execution',
                description: 'Our team ensures campaigns and strategies are executed efficiently for maximum impact.',
              },
              {
                title: 'Performance Tracking',
                description: 'We monitor results, provide reporting, and optimize strategies for continuous improvement.',
              },
            ]}
          />
        </div>
      </section>

      {/* Partners */}
      <PartnershipLogos />
    </div>
  );
};
