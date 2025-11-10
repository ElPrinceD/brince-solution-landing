import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BusinessQuestionnaireForm } from './BusinessQuestionnaireForm';

export const LeadGenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('leadGenPopupSeen');
    
    if (!hasSeenPopup) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // 1.5 second delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('leadGenPopupSeen', 'true');
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    localStorage.setItem('leadGenPopupSeen', 'true');
    setIsVisible(false);
    setShowForm(false);
  };

  const handleBackToAd = () => {
    setShowForm(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-5xl relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white dark:bg-navy-900 rounded-full shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:scale-110 transition-all border-2 border-gray-200 dark:border-gray-700"
                aria-label="Close popup"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white rounded-3xl shadow-2xl overflow-hidden relative">
                {/* Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>

                <div className="relative z-10 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {!showForm ? (
                      // Original Ad Content
                      <motion.div
                        key="ad"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center max-w-3xl mx-auto"
                      >
                        {/* Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6"
                        >
                          🚀 Welcome to Brince Solutions
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                          Ready to Grow Your Business?
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed"
                        >
                          Get expert consultation, strategic guidance, and proven solutions that drive results. 
                          Join hundreds of successful businesses that trust Brince Solutions.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                        >
                          <button
                            onClick={handleGetStarted}
                            className="px-10 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 w-full sm:w-auto text-center"
                          >
                            Get Started Free
                          </button>
                          <Link
                            to="/services"
                            onClick={handleClose}
                            className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm w-full sm:w-auto text-center"
                          >
                            Explore Services
                          </Link>
                        </motion.div>

                        {/* Benefits */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                        >
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="text-4xl mb-3">✓</div>
                            <h3 className="text-xl font-bold mb-2">Free Consultation</h3>
                            <p className="text-gray-200 text-sm">Start with a no-obligation consultation</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="text-xl font-bold mb-2">Quick Results</h3>
                            <p className="text-gray-200 text-sm">See measurable improvements fast</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                            <div className="text-4xl mb-3">💼</div>
                            <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                            <p className="text-gray-200 text-sm">10+ years of proven expertise</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      // Form Content
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        {/* Back Button */}
                        <button
                          onClick={handleBackToAd}
                          className="mb-6 flex items-center text-white hover:text-gray-200 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Back
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            📋 CLIENT BUSINESS INFORMATION QUESTIONNAIRE
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            Tell Us About Your Business
                          </h2>
                          <p className="text-lg text-gray-100">
                            Help us understand your needs so we can provide the best solution
                          </p>
                        </div>

                        {/* Form */}
                        <BusinessQuestionnaireForm onSuccess={handleFormSuccess} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

