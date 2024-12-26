import React, { useState, useEffect } from "react";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = [
    "https://i.postimg.cc/NMhVys0r/flight2.jpg",
    "https://i.postimg.cc/wTdqKzcM/flight1.jpg",
    "https://i.postimg.cc/76gR0FCt/flight3.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] ">
      <div className="absolute inset-0 flex justify-center items-center">
        {/* Previous Button */}
        <button
          className="absolute left-4 text-white text-2xl bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          onClick={prevSlide}
        >
          &#8249;
        </button>

        {/* Next Button */}
        <button
          className="absolute right-4 text-white text-2xl bg-opacity-50 hover:bg-opacity-75 rounded-full p-2"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>

      {/* Banner Image */}
      <div className="w-full h-full">
        <img
          src={bannerImages[currentIndex]}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
