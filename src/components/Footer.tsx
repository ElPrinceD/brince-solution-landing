import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { companyInfo } from '../utils/constants';
import logo from '../assets/brince solutions logo.jpg';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Our Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const serviceLinks = [
    { path: '/services#educational', label: 'Educational Services' },
    { path: '/services#recruitment', label: 'Recruitment Services' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
  ];

  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <img
                src={logo}
                alt={companyInfo.name}
                className="h-10 w-auto object-contain"
              />
              <h3 className="text-2xl font-bold text-white">{companyInfo.name}</h3>
            </div>
            <p className="text-sm text-gray-300 dark:text-gray-400">{companyInfo.tagline}</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 dark:text-gray-400">
                <span className="text-primary-400">✉</span> {companyInfo.email}
              </p>
              <p className="text-gray-300 dark:text-gray-400">
                <span className="text-primary-400">✆</span> {companyInfo.phone.join(' / ')}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary-400 transition-colors text-sm"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl hover:text-primary-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-sm">
          <p className="text-gray-300 dark:text-gray-400">
            Copyright © {currentYear} {companyInfo.fullName} - All Rights Reserved.
          </p>
          <p className="mt-2 text-gray-400 dark:text-gray-500">Powered by Brince Solutions</p>
        </div>
      </div>
    </footer>
  );
};

