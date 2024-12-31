import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SuccessStoris = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.3,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="success-stories py-16 bg-blue-50 dark:bg-gray-900 dark:text-white"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {/* Success Story 1 */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="story-card bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-lg overflow-hidden"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={index}
          >
            <img
              src={`/successStoris/storis${index + 1}.jpg`}
              alt={`Story ${index + 1}`}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {index === 0
                  ? "Lost Wallet Found"
                  : index === 1
                  ? "Reunited with Lost Pet"
                  : "Missing Engagement Ring Found"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                {index === 0
                  ? "John lost his wallet in a crowded market, but thanks to our platform, it was returned to him in just two days."
                  : index === 1
                  ? "Sarah's missing dog, Bella, was found by a kind stranger who used our website to connect with her."
                  : "A lost engagement ring was returned to its owner after a week, thanks to community efforts."}
              </p>
              <Link
                to={
                  index === 0
                    ? "/stories/lost-wallet"
                    : index === 1
                    ? "/stories/lost-pet"
                    : "/stories/lost-ring"
                }
                className="block transition rounded-lg px-4 py-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white text-center font-extrabold"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStoris;
