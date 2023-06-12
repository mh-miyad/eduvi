import React from "react";
import banner from "../assets/Homepage/Instructor_header-1.png";
import useInstructor from "../Hooks/useInstructor";
import InstructorCard from "../Components/card/InstructorCard";

const Instructor = () => {
  const [instructor] = useInstructor();
  return (
    <>
      <div>
        <div
          data-aos='fade-up-right'
          data-aos-duration='1500'
          className='flex  items-center justify-around border  py-5 mb-20 shadow-2xl rounded-xl mt-10 bg-gradient-to-br from-gray-200 via-blue-100 to-white'>
          <div className='text-xl md:text-2xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-400 text-transparent bg-clip-text'>
            Eduvi has <br /> the qualified mentor
          </div>

          <div>
            <img src={banner} alt='' className='w-20 md:w-40 lg:w-full' />
          </div>
        </div>

        <div className='text-center mb-10'>
          <span
            className='border px-10 mx-5 py-3 rounded-xl bg-indigo-700 text-white font-bold'
            data-aos-duration='1500'
            data-aos='fade-up-right'>
            {" "}
            English
          </span>
          <span
            className='border px-10 mx-5 py-3 rounded-xl bg-indigo-700 text-white font-bold'
            data-aos-duration='1500'
            data-aos='fade-up-left'>
            {" "}
            Chinese
          </span>
          <span
            className='border px-10 mx-5 py-3 rounded-xl bg-indigo-700 text-white font-bold'
            data-aos-duration='1500'
            data-aos='fade-up-right'>
            {" "}
            Japan
          </span>
        </div>

        <div>
          <div>
            {
              <div>
                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                  {instructor.map((ele) => {
                    return (
                      <div data-aos='flip-up' data-aos-duration='1300'>
                        <InstructorCard data={ele} />
                      </div>
                    );
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
