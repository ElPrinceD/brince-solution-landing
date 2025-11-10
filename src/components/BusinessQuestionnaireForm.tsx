import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

interface BusinessQuestionnaireFormProps {
  onSuccess?: () => void;
}

export const BusinessQuestionnaireForm = ({ onSuccess }: BusinessQuestionnaireFormProps) => {
  const [state, handleSubmit] = useForm('xanawgzj');

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Thank You!
        </h3>
        <p className="text-xl text-gray-100 mb-6">
          We've received your business information. Our team will review it and get back to you within 24 hours.
        </p>
        <p className="text-lg text-gray-200">
          We're excited to help grow your business!
        </p>
        {onSuccess && (
          <button
            onClick={onSuccess}
            className="mt-6 px-8 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Close
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-2">
      {/* Scrollable form container */}
      <div className="space-y-6 pr-2">
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-semibold text-white mb-2">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="Enter your business name"
          />
        </div>

        {/* Contact Person */}
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-semibold text-white mb-2">
            Contact Person <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="Full name"
          />
          <ValidationError prefix="Contact Person" field="contactPerson" errors={state.errors} />
        </div>

        {/* Position/Title */}
        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-white mb-2">
            Position/Title
          </label>
          <input
            type="text"
            id="position"
            name="position"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., CEO, Manager, Owner"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
            Email Address <span className="text-red-300">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="your.email@example.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="+44 123 456 7890"
          />
        </div>

        {/* Business Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-white mb-2">
            Business Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Street address, City, Postcode"
          />
        </div>

        {/* Nature of Business */}
        <div>
          <label htmlFor="natureOfBusiness" className="block text-sm font-semibold text-white mb-2">
            What is the nature of your business?
          </label>
          <input
            type="text"
            id="natureOfBusiness"
            name="natureOfBusiness"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., Retail, Manufacturing, Services"
          />
        </div>

        {/* Business Activities */}
        <div>
          <label htmlFor="businessActivities" className="block text-sm font-semibold text-white mb-2">
            Please describe your business activities in detail:
          </label>
          <textarea
            id="businessActivities"
            name="businessActivities"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Describe what your business does..."
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-semibold text-white mb-2">
            Which industry does your business operate in?
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., Technology, Healthcare, Finance"
          />
        </div>

        {/* Products/Services */}
        <div>
          <label htmlFor="productsServices" className="block text-sm font-semibold text-white mb-2">
            What are your main products or services?
          </label>
          <textarea
            id="productsServices"
            name="productsServices"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="List your main products or services..."
          />
        </div>

        {/* Target Market */}
        <div>
          <label htmlFor="targetMarket" className="block text-sm font-semibold text-white mb-2">
            Who are your primary customers or target market?
          </label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., Individuals, Businesses, Government"
          />
        </div>

        {/* Years in Operation */}
        <div>
          <label htmlFor="yearsOperation" className="block text-sm font-semibold text-white mb-2">
            How long has your business been in operation? <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="yearsOperation"
            name="yearsOperation"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., 2 years, 5 years, Startup"
          />
          <ValidationError prefix="Years Operation" field="yearsOperation" errors={state.errors} />
        </div>

        {/* Business Structure */}
        <div>
          <label htmlFor="businessStructure" className="block text-sm font-semibold text-white mb-2">
            What is your business structure? <span className="text-red-300">*</span>
          </label>
          <select
            id="businessStructure"
            name="businessStructure"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select business structure</option>
            <option value="Sole Proprietorship" className="bg-primary-700">Sole Proprietorship</option>
            <option value="Partnership" className="bg-primary-700">Partnership</option>
            <option value="Limited Liability Company (LLC)" className="bg-primary-700">Limited Liability Company (LLC)</option>
            <option value="Corporation" className="bg-primary-700">Corporation</option>
            <option value="Other" className="bg-primary-700">Other</option>
          </select>
          <ValidationError prefix="Business Structure" field="businessStructure" errors={state.errors} />
        </div>

        {/* Number of Employees */}
        <div>
          <label htmlFor="employees" className="block text-sm font-semibold text-white mb-2">
            How many employees or team members do you have? <span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="employees"
            name="employees"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all"
            placeholder="e.g., 1-5, 10-20, 50+"
          />
          <ValidationError prefix="Employees" field="employees" errors={state.errors} />
        </div>

        {/* Business Locations */}
        <div>
          <label htmlFor="locations" className="block text-sm font-semibold text-white mb-2">
            What are your key business locations or branches (if any)? <span className="text-red-300">*</span>
          </label>
          <textarea
            id="locations"
            name="locations"
            rows={2}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="List your business locations..."
          />
          <ValidationError prefix="Locations" field="locations" errors={state.errors} />
        </div>

        {/* Short-term Goals */}
        <div>
          <label htmlFor="shortTermGoals" className="block text-sm font-semibold text-white mb-2">
            What are your short-term business goals (next 12 months)? <span className="text-red-300">*</span>
          </label>
          <textarea
            id="shortTermGoals"
            name="shortTermGoals"
            rows={3}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Describe your goals for the next 12 months..."
          />
          <ValidationError prefix="Short Term Goals" field="shortTermGoals" errors={state.errors} />
        </div>

        {/* Long-term Goals */}
        <div>
          <label htmlFor="longTermGoals" className="block text-sm font-semibold text-white mb-2">
            What are your long-term business goals (3–5 years)? <span className="text-red-300">*</span>
          </label>
          <textarea
            id="longTermGoals"
            name="longTermGoals"
            rows={3}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Describe your goals for the next 3-5 years..."
          />
          <ValidationError prefix="Long Term Goals" field="longTermGoals" errors={state.errors} />
        </div>

        {/* Current Challenges */}
        <div>
          <label htmlFor="challenges" className="block text-sm font-semibold text-white mb-2">
            What challenges or issues is your business currently facing? <span className="text-red-300">*</span>
          </label>
          <textarea
            id="challenges"
            name="challenges"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Describe the challenges you're facing..."
          />
          <ValidationError prefix="Challenges" field="challenges" errors={state.errors} />
        </div>

        {/* Services Seeking */}
        <div>
          <label htmlFor="servicesSeeking" className="block text-sm font-semibold text-white mb-2">
            What type of support or services are you seeking from us? <span className="text-red-300">*</span>
          </label>
          <textarea
            id="servicesSeeking"
            name="servicesSeeking"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Describe what services or support you need..."
          />
          <ValidationError prefix="Services Seeking" field="servicesSeeking" errors={state.errors} />
        </div>

        {/* Additional Comments */}
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-semibold text-white mb-2">
            Any other information or comments you'd like to share about your business: <span className="text-red-300">*</span>
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
            placeholder="Any additional information..."
          />
          <ValidationError prefix="Additional Info" field="additionalInfo" errors={state.errors} />
        </div>

        {/* Error Display */}
        {state.errors && Object.keys(state.errors).length > 0 && (
          <div className="bg-red-500/20 border-2 border-red-300 rounded-xl p-4">
            <p className="text-red-100 text-sm font-medium">
              Please check the form and try again.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:transform-none"
        >
          {state.submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Questionnaire'
          )}
        </button>
      </div>
    </form>
  );
};

