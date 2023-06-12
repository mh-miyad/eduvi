import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BG from "../assets/Homepage/BG.png";
import { Rating } from "flowbite-react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const InstructorDetails = () => {
  const data = useLoaderData();
  const {
    name,
    image,
    certifications,
    howmanycourse,
    experience,
    about,
    graduate,
    students,
    ratings,
  } = data[0];

  return (
    <>
      <div className='my-10 text-gray-700 font-semibold'>
        <div className='relative ' data-aos='zoom-in'>
          <img src={BG} alt='Your Image' className='w-full' />
          <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
              Instructor Details
            </span>
          </div>
        </div>
        <div className=''>
          {/* here information  name  and photo */}
          <div className='flex  items-center gap-10'>
            <img
              src={image}
              alt=''
              className='w-56 '
              data-aos='flip-right'
              data-aos-easing='ease-out-cubic'
              data-aos-duration='1000'
            />
            <div>
              {" "}
              <div className='text-xl md:text-2xl lg:text-4xl mb-4'>{name}</div>
              <div>Instructor and Teacher </div>
            </div>
          </div>
          {/* here information  name and Photo */}

          <div className='flex justify-between flex-col md:flex-row  items-center gap-11'>
            <div
              className='w-1/2'
              data-aos='flip-left'
              data-aos-easing='ease-out-cubic'
              data-aos-duration='1000'>
              <button className='border px-10 py-3 font-bold  uppercase my-6 rounded-xl bg-indigo-600 text-white  '>
                About
              </button>

              <div className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl'>
                <span className='  font-bold text-3xl    '>About {name}</span>
                <p className=' my-4 whitespace-normal'>{about}</p>
                <span className='  font-bold text-3xl   my-5  '>
                  Certification
                </span>
                {certifications.map((ele, index) => (
                  <p className='text-xl '>
                    {" "}
                    {index + 1} .{ele}
                  </p>
                ))}
              </div>
            </div>
            <div className='w-1/2'>
              <div className='flex flex-col gap-2'>
                <div
                  className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl '
                  data-aos='zoom-in-right'>
                  <h3 className='text-xl md:text-2xl  font-bold  text-gray-700'>
                    {" "}
                    Total Student :{" "}
                    <span className='text-indigo-500'> {students}</span>{" "}
                  </h3>
                </div>
                {/* ------------------------------------ */}
                <div
                  className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl'
                  data-aos='zoom-in-left'>
                  <h3 className='text-xl md:text-2xl  font-bold  text-gray-700 flex '>
                    <span className=''>
                      Ratings :{" "}
                      <span className='text-yellow-400'>{ratings} </span>
                    </span>
                    <Rating>
                      <Rating.Star filled={ratings >= 1 ? true : false} />
                      <Rating.Star filled={ratings >= 2 ? true : false} />
                      <Rating.Star filled={ratings >= 3 ? true : false} />
                      <Rating.Star filled={ratings >= 4 ? true : false} />
                      <Rating.Star filled={ratings >= 5 ? true : false} />
                    </Rating>
                  </h3>
                </div>
                {/* ------------------------------------ */}
                <div
                  className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl'
                  data-aos='zoom-in-right'>
                  <h3 className='text-xl md:text-2xl  font-bold  text-gray-700'>
                    {" "}
                    Experience :{" "}
                    <span className='uppercase text-indigo-600 text-lg'>
                      {" "}
                      {experience}
                    </span>{" "}
                  </h3>
                </div>
                {/* ------------------------------------ */}
                <div
                  className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl'
                  data-aos='zoom-in-left'>
                  <h3 className='text-xl md:text-2xl  font-bold  text-gray-700'>
                    {" "}
                    Grauduated :{" "}
                    <span className='text-indigo-600'> {graduate}</span>{" "}
                  </h3>
                </div>
                {/* ------------------------------------ */}
                <div
                  className='border shadow-sm  shadow-indigo-800/50 px-10 py-5 rounded-2xl'
                  data-aos='zoom-in-right'>
                  <h3 className='text-xl md:text-2xl  font-bold  text-gray-700'>
                    {" "}
                    Total Courses :{" "}
                    <span className='text-red-400'> {howmanycourse}</span>{" "}
                  </h3>
                </div>

                {/* ------------------------------------ */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDetails;
