import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const RightPlace = () => {
  const testimonials = [
    {
      text: `"I found my lost wallet through this platform within 2 days. Thank you so much!"`,
      author: "John Doe",
    },
    {
      text: `"This website is a lifesaver. I recovered my pet that went missing!"`,
      author: "Jane Smith",
    },
    {
      text: `"Great initiative! The process was seamless and efficient."`,
      author: "Mike Johnson",
    },
    {
      text: `"I was able to return a lost laptop to its owner, thanks to this amazing platform!"`,
      author: "Sarah Lee",
    },
    {
      text: `"The community support here is incredible. Found my keys within a day!"`,
      author: "Chris Evans",
    },
  ];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <>
      <section
        ref={sectionRef}
        className="testimonials py-16 bg-slate-50 dark:bg-gray-700"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center"
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.3,
                  type: "spring",
                }}
              >
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  {testimonial.text}
                </p>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  - {testimonial.author}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RightPlace;
