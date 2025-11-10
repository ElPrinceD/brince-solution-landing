import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const [state, handleSubmit] = useForm('xanawgzj');

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-8 text-center"
      >
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
          Thank you for your message!
        </h3>
        <p className="text-green-600 dark:text-green-300">
          We'll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          placeholder="your.email@example.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
          placeholder="Tell us how we can help you..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {state.submitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* reCAPTCHA Notice */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
    </form>
  );
};
