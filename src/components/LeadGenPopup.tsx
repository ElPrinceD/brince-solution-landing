import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BusinessQuestionnaireForm } from './BusinessQuestionnaireForm';

export const LeadGenPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  const handleFormSuccess = () => {
    localStorage.setItem('leadGenPopupSeen', 'true');
    setIsVisible(false);
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

                <div className="relative z-10 p-6 md:p-10">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                  >
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-4">
                      📋 CLIENT BUSINESS INFORMATION QUESTIONNAIRE
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                      Tell Us About Your Business
                    </h2>
                    <p className="text-lg text-gray-100">
                      Help us understand your needs so we can provide the best solution
                    </p>
                  </motion.div>

                  {/* Form */}
                  <BusinessQuestionnaireForm onSuccess={handleFormSuccess} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

