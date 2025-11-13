import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitLead, type LeadSubmissionData } from '../utils/api';

interface BusinessQuestionnaireFormProps {
  onSuccess?: () => void;
}

export const BusinessQuestionnaireForm = ({ onSuccess }: BusinessQuestionnaireFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data: LeadSubmissionData = {
      businessName: formData.get('businessName') as string || '',
      contactPerson: formData.get('contactPerson') as string,
      position: formData.get('position') as string || '',
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      businessAddress: formData.get('businessAddress') as string || '',
      natureOfBusiness: formData.get('natureOfBusiness') as string || '',
      businessActivities: formData.get('businessActivities') as string || '',
      industry: formData.get('industry') as string || '',
      productsServices: formData.get('productsServices') as string || '',
      targetMarket: formData.get('targetMarket') as string || '',
      yearsOperation: formData.get('yearsOperation') as string,
      businessStructure: formData.get('businessStructure') as string,
      employees: formData.get('employees') as string,
      locations: formData.get('locations') as string,
      shortTermGoals: formData.get('shortTermGoals') as string,
      longTermGoals: formData.get('longTermGoals') as string,
      challenges: formData.get('challenges') as string,
      servicesSeeking: formData.get('servicesSeeking') as string,
      additionalInfo: formData.get('additionalInfo') as string,
      companySize: formData.get('companySize') as string || '',
      annualRevenue: formData.get('annualRevenue') as string || '',
      preferredContactMethod: formData.get('preferredContactMethod') as string || '',
      urgencyLevel: formData.get('urgencyLevel') as string || '',
      budgetRange: formData.get('budgetRange') as string || '',
    };

    try {
      await submitLead(data);
      setSubmitSuccess(true);
      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (error: any) {
      if (error.message) {
        try {
          const errorData = JSON.parse(error.message);
          setErrors(errorData);
        } catch {
          setErrors({ general: [error.message] });
        }
      } else {
        setErrors({ general: ['Failed to submit form. Please try again.'] });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex-1 flex flex-col min-h-0">
      {/* Scrollable form container */}
      <div className="space-y-4 sm:space-y-6 pr-1 sm:pr-2 overflow-y-auto flex-1 -mr-1 sm:-mr-2">
        {/* General Errors */}
        {errors.general && (
          <div className="bg-red-500/20 border-2 border-red-300 rounded-xl p-4">
            <p className="text-red-100 text-sm font-medium">{errors.general[0]}</p>
          </div>
        )}
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
          {errors.contactPerson && <p className="text-red-300 text-xs mt-1">{errors.contactPerson[0]}</p>}
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
          {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email[0]}</p>}
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
          {errors.yearsOperation && <p className="text-red-300 text-xs mt-1">{errors.yearsOperation[0]}</p>}
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
          {errors.businessStructure && <p className="text-red-300 text-xs mt-1">{errors.businessStructure[0]}</p>}
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
          {errors.employees && <p className="text-red-300 text-xs mt-1">{errors.employees[0]}</p>}
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
          {errors.locations && <p className="text-red-300 text-xs mt-1">{errors.locations[0]}</p>}
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
          {errors.shortTermGoals && <p className="text-red-300 text-xs mt-1">{errors.shortTermGoals[0]}</p>}
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
          {errors.longTermGoals && <p className="text-red-300 text-xs mt-1">{errors.longTermGoals[0]}</p>}
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
          {errors.challenges && <p className="text-red-300 text-xs mt-1">{errors.challenges[0]}</p>}
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
          {errors.servicesSeeking && <p className="text-red-300 text-xs mt-1">{errors.servicesSeeking[0]}</p>}
        </div>

        {/* Company Size */}
        <div>
          <label htmlFor="companySize" className="block text-sm font-semibold text-white mb-2">
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select company size</option>
            <option value="1-5 employees" className="bg-primary-700">1-5 employees</option>
            <option value="6-20 employees" className="bg-primary-700">6-20 employees</option>
            <option value="21-50 employees" className="bg-primary-700">21-50 employees</option>
            <option value="51-200 employees" className="bg-primary-700">51-200 employees</option>
            <option value="201-500 employees" className="bg-primary-700">201-500 employees</option>
            <option value="500+ employees" className="bg-primary-700">500+ employees</option>
          </select>
        </div>

        {/* Annual Revenue Range */}
        <div>
          <label htmlFor="annualRevenue" className="block text-sm font-semibold text-white mb-2">
            Annual Revenue Range
          </label>
          <select
            id="annualRevenue"
            name="annualRevenue"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select revenue range</option>
            <option value="Under £50,000" className="bg-primary-700">Under £50,000</option>
            <option value="£50,000 - £100,000" className="bg-primary-700">£50,000 - £100,000</option>
            <option value="£100,000 - £250,000" className="bg-primary-700">£100,000 - £250,000</option>
            <option value="£250,000 - £500,000" className="bg-primary-700">£250,000 - £500,000</option>
            <option value="£500,000 - £1,000,000" className="bg-primary-700">£500,000 - £1,000,000</option>
            <option value="£1,000,000+" className="bg-primary-700">£1,000,000+</option>
            <option value="Prefer not to say" className="bg-primary-700">Prefer not to say</option>
          </select>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label htmlFor="preferredContactMethod" className="block text-sm font-semibold text-white mb-2">
            Preferred Contact Method
          </label>
          <select
            id="preferredContactMethod"
            name="preferredContactMethod"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select preferred method</option>
            <option value="Email" className="bg-primary-700">Email</option>
            <option value="Phone" className="bg-primary-700">Phone</option>
            <option value="Video Call" className="bg-primary-700">Video Call</option>
            <option value="In-Person Meeting" className="bg-primary-700">In-Person Meeting</option>
            <option value="No Preference" className="bg-primary-700">No Preference</option>
          </select>
        </div>

        {/* Urgency Level */}
        <div>
          <label htmlFor="urgencyLevel" className="block text-sm font-semibold text-white mb-2">
            Urgency Level
          </label>
          <select
            id="urgencyLevel"
            name="urgencyLevel"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select urgency level</option>
            <option value="Immediate (Within 1 week)" className="bg-primary-700">Immediate (Within 1 week)</option>
            <option value="Urgent (Within 1 month)" className="bg-primary-700">Urgent (Within 1 month)</option>
            <option value="Moderate (1-3 months)" className="bg-primary-700">Moderate (1-3 months)</option>
            <option value="Planning (3-6 months)" className="bg-primary-700">Planning (3-6 months)</option>
            <option value="Future Consideration (6+ months)" className="bg-primary-700">Future Consideration (6+ months)</option>
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-semibold text-white mb-2">
            Budget Range for Services
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:ring-2 focus:ring-white focus:border-white transition-all"
          >
            <option value="" className="bg-primary-700">Select budget range</option>
            <option value="Under £1,000" className="bg-primary-700">Under £1,000</option>
            <option value="£1,000 - £5,000" className="bg-primary-700">£1,000 - £5,000</option>
            <option value="£5,000 - £10,000" className="bg-primary-700">£5,000 - £10,000</option>
            <option value="£10,000 - £25,000" className="bg-primary-700">£10,000 - £25,000</option>
            <option value="£25,000 - £50,000" className="bg-primary-700">£25,000 - £50,000</option>
            <option value="£50,000+" className="bg-primary-700">£50,000+</option>
            <option value="To be discussed" className="bg-primary-700">To be discussed</option>
          </select>
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
          {errors.additionalInfo && <p className="text-red-300 text-xs mt-1">{errors.additionalInfo[0]}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 sm:py-5 bg-white text-primary-600 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 active:scale-95 sm:hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl disabled:transform-none touch-manipulation min-h-[56px] flex items-center justify-center"
        >
          {isSubmitting ? (
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

