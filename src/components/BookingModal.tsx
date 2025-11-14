import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StripeCheckout } from './StripeCheckout';
import { submitLead } from '../utils/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    title: string;
    duration: string;
    price: string;
  };
}

export const BookingModal = ({ isOpen, onClose, appointment }: BookingModalProps) => {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate available dates (Monday-Friday only, next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
        dates.push(date);
      }
    }
    return dates;
  };

  // Generate available times (9am to 5pm)
  const getAvailableTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return times;
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isFree = appointment.price.toLowerCase() === 'free' || appointment.price === '£0';
  const priceAmount = parseFloat(appointment.price.replace(/[£,]/g, '')) || 0;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Submit lead information first
      // Include price in shortTermGoals so backend can detect free bookings
      const priceInfo = isFree ? 'Free' : appointment.price;
      await submitLead({
        contactPerson: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone || '',
        businessName: '',
        position: '',
        businessAddress: '',
        natureOfBusiness: '',
        businessActivities: '',
        industry: '',
        productsServices: '',
        targetMarket: '',
        yearsOperation: 'Not specified',
        businessStructure: 'Not specified',
        employees: 'Not specified',
        locations: 'Not specified',
        shortTermGoals: `Booking: ${appointment.title} - ${priceInfo}`,
        longTermGoals: 'Not specified',
        challenges: 'Not specified',
        servicesSeeking: appointment.title,
        additionalInfo: `Appointment booking - ${appointment.duration} - ${priceInfo}${customerInfo.date ? ` - Date: ${formatDateForDisplay(customerInfo.date)}` : ''}${customerInfo.time ? ` - Time: ${customerInfo.time}` : ''}`,
      });

      if (isFree) {
        // For free appointments, go directly to success
        setStep('success');
      } else {
        // For paid appointments, proceed to payment
        setStep('payment');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit booking information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    setStep('success');
  };

  const handleClose = () => {
    setStep('info');
    setCustomerInfo({ name: '', email: '', phone: '', date: '', time: '' });
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white dark:bg-navy-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-navy-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors z-20"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 md:p-8">
            {step === 'info' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Book {appointment.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Duration: {appointment.duration} • Price: {appointment.price}
                </p>

                <form onSubmit={handleInfoSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="+44 7911 123456"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="date"
                        required
                        value={customerInfo.date}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      >
                        <option value="">Select a date</option>
                        {getAvailableDates().map((date) => (
                          <option key={formatDateForInput(date)} value={formatDateForInput(date)}>
                            {formatDateForDisplay(formatDateForInput(date))}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="time"
                        required
                        value={customerInfo.time}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      >
                        <option value="">Select a time</option>
                        {getAvailableTimes().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl p-4">
                      <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      isFree ? 'Confirm Booking' : 'Continue to Payment'
                    )}
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Complete Payment
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {appointment.title} - {appointment.price}
                </p>

                <StripeCheckout
                  amount={priceAmount}
                  description={`${appointment.title} - ${appointment.duration}`}
                  customerEmail={customerInfo.email}
                  customerName={customerInfo.name}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setStep('info')}
                />
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-6xl mb-4"
                >
                  ✓
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {isFree ? (
                    <>Your free consultation has been booked. We'll contact you shortly to confirm the details.</>
                  ) : (
                    <>Your payment was successful and your appointment has been confirmed. We'll send you a confirmation email shortly.</>
                  )}
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

