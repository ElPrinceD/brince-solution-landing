import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatisticCounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export const StatisticCounter = ({ value, suffix = '+', label, delay = 0 }: StatisticCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-6xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </motion.div>
  );
};

