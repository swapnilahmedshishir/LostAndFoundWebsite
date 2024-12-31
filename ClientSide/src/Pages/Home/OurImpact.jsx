import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaHandHoldingHeart, FaFileAlt } from "react-icons/fa";

const OurImpact = () => {
  return (
    <>
      <section className="how-it-works py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* How It Works process 1 */}
            <div className="step bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
              <motion.div
                className="text-gray-800 dark:text-white mb-4 text-4xl mx-auto flex justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaFileAlt />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Report Lost Items
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out a simple form to report your lost item and help others
                find it easily.
              </p>
            </div>
            {/* How It Works process 2 */}
            <div className="step bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
              <motion.div
                className="text-gray-800 dark:text-white mb-4 text-4xl mx-auto flex justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaSearch />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Browse Found Items
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check our database of found items to locate what you’ve lost.
              </p>
            </div>
            {/* How It Works process 3 */}
            <div className="step bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
              <motion.div
                className="text-gray-800 dark:text-white mb-4 text-4xl mx-auto flex justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <FaHandHoldingHeart />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Connect with Finders
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contact the finder directly and recover your lost belongings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurImpact;
