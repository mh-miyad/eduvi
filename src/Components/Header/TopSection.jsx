import React from "react";
import img from "../../assets/Homepage/Frame 24.png";
import AutoType from "../AutoType";
import CountUp from "react-countup";
import { FaUserGraduate } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPlayBtnFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import img1 from "../../assets/Homepage/Course/amd.png";
import img2 from "../../assets/Homepage/Course/twitch.png";
import img3 from "../../assets/Homepage/Course/appearin.png";
import img4 from "../../assets/Homepage/Course/google.png";
import img5 from "../../assets/Homepage/Course/intel.png";
import img6 from "../../assets/Homepage/Course/meta.png";
import img7 from "../../assets/Homepage/Course/reddit.png";
import img8 from "../../assets/Homepage/Course/qiwi.png";
import img9 from "../../assets/Homepage/Course/weibo.png";
import Lottie from "lottie-react";
import headerImg from "../../assets/Homepage/carousel/99151-online-education-blue.json";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const TopSection = () => {
  return (
    <div className='my-10 '>
      <div className='flex justify-around items-center flex-col gap-20 md:flex-row'>
        <div className='w-full lg:w-1/2  rounded-xl '>
          <h2 className='text-teal-500 font-bold  shadow-sm'>
            E-COURSE PLATFORM
          </h2>
          <h1 className='text-lg md:text-2xl'>
            {" "}
            <span className='text-2xl  md:text-5xl  text-gray-600 dark:text-white font-extrabold  tracking-wider leading-snug'>
              {" "}
              Grow up your skills by <br /> online courses with{" "}
              <span className='text-violet-600'>Eduvi</span>
              <br />
            </span>{" "}
            <div className='my-5 '>
              <AutoType />
            </div>
          </h1>
          <div className='my-5'>
            <p className='text-lg font-bold text-indigo-500 text-center shadow py-3 uppercase'>
              {" "}
              Our Sponsors{" "}
            </p>
            <div className='my-10'>
              <Marquee speed={100}>
                <img src={img1} alt='' className='mr-10 h-12' />
                <img src={img2} alt='' className='mr-10 h-12' />
                <img src={img3} alt='' className='mr-10 h-12' />
                <img src={img4} alt='' className='mr-10 h-12' />
                <img src={img5} alt='' className='mr-10 h-12' />
                <img src={img6} alt='' className='mr-10 h-12' />
                <img src={img7} alt='' className='mr-10 h-12' />
                <img src={img8} alt='' className='mr-10 h-12' />
                <img src={img9} alt='' className='mr-10 h-12' />
              </Marquee>
            </div>
          </div>
        </div>

        <div className='lg:w-1/2'>
          <Lottie animationData={headerImg} loop={true} />
        </div>
      </div>
      <div className='uppercase text-center text-3xl text-indigo-600 shadow-xl w-1/2 p-5 shadow-violet-500/20 mx-auto  font-bold '>
        About Our Platform
      </div>
      <div className='my-10 flex gap-10 justify-evenly items-center flex-wrap'>
        <div
          data-aos='flip-left'
          data-aos-duration='1500'
          className='text-center text-xl md:text-2xl  shadow-2xl   rounded-t-2xl font-bold border-4 p-5 md:p-10'>
          <CountUp end={1200} className='text-2xl md:text-4xl' />
          <br />
          <FaUserGraduate className='w-12 h-12 mx-auto text-cyan-400 my-2 md:my-5' />
          Instructor
        </div>
        <div
          data-aos='flip-up'
          data-aos-duration='1500'
          className='text-center text-xl md:text-2xl  shadow-2xl   rounded-t-2xl font-bold border-4 p-5 md:p-10'>
          <CountUp end={12673902} className='text-2xl md:text-4xl' />
          <br />
          <HiUserGroup className='w-12 h-12 mx-auto text-indigo-400 my-2  md:my-5' />
          Active User
        </div>
        <div
          data-aos='flip-right'
          data-aos-duration='1500'
          className='text-center text-xl md:text-2xl  shadow-2xl   rounded-t-2xl font-bold border-4 p-5 md:p-10'>
          <CountUp end={519298} className='text-2xl md:text-4xl' />
          <br />
          <BsFillPlayBtnFill className='w-12 h-12 mx-auto text-red-400 my-2  md:my-5' />
          Hours of content
        </div>
      </div>
    </div>
  );
};

export default TopSection;
