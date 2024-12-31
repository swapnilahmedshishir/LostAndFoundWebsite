import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="h-screen"
      >
        {/* Slide 1 */}
        <SwiperSlide
          className={`flex justify-center items-center bg-[url('/sliderImage/slider1.jpg')] bg-cover bg-center`}
        >
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">Report Lost Items</h2>
                <p className="mb-5 text-lg">
                  Lost something important? Report your lost items here to
                  connect with those who might have found them.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  Report Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex justify-center items-center bg-[url('/sliderImage/slider3.jpg')] bg-cover bg-center">
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">Browse Found Items</h2>
                <p className="mb-5 text-lg">
                  Explore recently found items and find the one you've lost
                  today.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  View Found Items
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="flex justify-center items-center bg-[url('/sliderImage/slider2.jpg')] bg-cover bg-center">
          <div className="text-white font-montserrat text-center h-full p-5 bg-black/60 rounded-lg">
            <div className="flex justify-center items-center pt-4 md:pt-24">
              <div>
                <h2 className="font-bold mb-5 text-3xl">
                  Connect with Finders
                </h2>
                <p className="mb-5 text-lg">
                  Communicate directly with finders to claim your lost
                  belongings quickly and easily.
                </p>
                <button className="btn py-3 px-14 bg-gradient-to-r from-[#031741] via-[#03d2fc] to-[#022d33] text-white rounded-3xl font-extrabold">
                  Start Connecting
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
