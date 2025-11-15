import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLead } from '../utils/api';

export const WebinarRegistrationForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitLead({
        contactPerson: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.company,
        position: formData.position,
        shortTermGoals: 'Webinar Registration',
        longTermGoals: 'Learn business growth strategies',
        challenges: 'N/A',
        servicesSeeking: 'Free Webinar: How to Grow & Scale Your Business',
        additionalInfo: 'Webinar Registration',
        yearsOperation: 'N/A',
        businessStructure: 'N/A',
        employees: 'N/A',
        locations: 'N/A'
      });

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', company: '', position: '' });
      
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl font-bold text-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl text-center"
      >
        Register Now - It's Free!
      </button>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setSubmitSuccess(false);
                  setError('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </button>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We've sent a confirmation email to {formData.email}. We look forward to seeing you at the webinar!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Register for Free Webinar
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-navy-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-navy-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-navy-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-navy-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-navy-700 dark:text-white"
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Registering...' : 'Complete Registration'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

