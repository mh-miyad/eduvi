import React from "react";
import video from "../../assets/Homepage/carousel/Video call.png";
import img1 from "../../assets/Homepage/carousel/1.png";
import img2 from "../../assets/Homepage/carousel/2.png";
import img3 from "../../assets/Homepage/carousel/3.png";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
const QualityOfContent = () => {
  return (
    <div className='my-10'>
      <div className='text-center' data-aos='fade-up-left'>
        <div className='text-2xl md:text-3xl lg:text-5xl uppercase font-bold text-gray-700 dark:text-indigo-500 shadow-md p-5 dark:shadow-indigo-500/40'>
          High quality video, <br /> audio & live classes
        </div>
        <p className=' lg:w-2/5 mx-auto text-sm md:text-md my-4 font-semibold text-neutral-800 dark:text-white shadow-lg p-5 shadow-neutral-500 rounded-xl'>
          High-definition video is video of higher resolution and quality than{" "}
          standard-definition. While there is no standardized meaning for
          high-definition, generally any video image with considerably more than{" "}
          480 vertical scan lines or 576 vertical lines is considered
          high-definition.
        </p>
      </div>
      <div className='flex flex-col ' data-aos='fade-up-right'>
        <img src={video} alt='' className='max-auto' />
        <div className='flex '>
          <img
            src={img1}
            alt=''
            className='mx-auto h-10 md:h-auto'
            data-aos='fade-up-left'
          />
          <img
            src={img2}
            alt=''
            className='mx-auto h-10 md:h-auto'
            data-aos='fade-up-right'
          />
          <img
            src={img3}
            alt=''
            className='mx-auto h-10 md:h-auto'
            data-aos='fade-down-right'
          />
        </div>
      </div>
    </div>
  );
};

export default QualityOfContent;
