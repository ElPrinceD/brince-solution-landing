import { motion } from 'framer-motion';
import { NewsCard } from '../components/NewsCard';
import { newsPosts } from '../utils/constants';

export const News = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-100 max-w-3xl mx-auto"
          >
            Stay informed with our latest news, announcements, and updates
          </motion.p>
        </div>
      </section>

      {/* News Posts */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold">
                All Posts
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-navy-700">
                AI Conference
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-navy-700">
                Partnerships
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-navy-700">
                Announcements
              </button>
            </div>
          </div>

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

          {/* Full Post Content */}
          <div className="mt-12 space-y-12">
            {newsPosts.map((post, index) => (
              <motion.article
                key={post.id}
                id={`${post.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h2>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  loading="lazy"
                />
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

