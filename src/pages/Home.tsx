import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { StatisticCounter } from '../components/StatisticCounter';
import { TestimonialCard } from '../components/TestimonialCard';
import { NewsCard } from '../components/NewsCard';
import { LeadGenForm } from '../components/LeadGenForm';
import { AppointmentCard } from '../components/AppointmentCard';
import { TrainingForm } from '../components/TrainingForm';
import { services, testimonials, newsPosts, brightHRPartnership, appointments } from '../utils/constants';

export const Home = () => {
  return (
    <div className="pt-20">
      <Hero />

      {/* Lead Generation Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 Lead Generation & Business Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              We specialize in setting up powerful lead generation systems for companies. 
              Get expert consultation, strategic guidance, and proven solutions that drive results. 
              Join hundreds of successful businesses that trust Brince Solutions for their lead generation needs.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="relative rounded-xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">📈</div>
                  <h3 className="font-bold text-lg mb-2 text-white">Proven Results</h3>
                  <p className="text-sm text-gray-100">Increase your leads with our tested strategies</p>
                </div>
              </div>
              <div className="relative rounded-xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-teal-600/80 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-lg mb-2 text-white">Targeted Approach</h3>
                  <p className="text-sm text-gray-100">Reach the right audience for your business</p>
                </div>
              </div>
              <div className="relative rounded-xl p-6 overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-red-600/80 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-bold text-lg mb-2 text-white">Quick Setup</h3>
                  <p className="text-sm text-gray-100">Get your lead generation system running fast</p>
                </div>
              </div>
            </div>
            <LeadGenForm />
          </motion.div>
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
              <span className="px-4 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg">
                Business Setup Consultation
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

      {/* Testimonials / Google Reviews */}
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
            <p className="text-gray-600 dark:text-gray-400">
              Real reviews from our Google Business profile
            </p>
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

