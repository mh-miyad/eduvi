import React from "react";
import banner from "../assets/Homepage/carousel-2.png";
import useClass from "../Hooks/useClass";
import CourseCard from "../Components/card/CourseCard";

const Class = () => {
  const [classes] = useClass();
  return (
    <>
      <div>
        <div
          data-aos='fade-up-left'
          data-aos-duration='1000'
          className='flex  items-center justify-around border  py-5 mb-20 shadow-2xl rounded-xl mt-10 bg-gradient-to-br from-cyan-100  to-white'>
          <div className='text-xl md:text-2xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-pink-400 text-transparent bg-clip-text'>
            Eduvi Courses
            <br /> For All Standards
          </div>

          <div>
            <img src={banner} alt='' className='w-20 md:w-40 lg:w-full' />
          </div>
        </div>
        <div className='text-center text-2xl md:text-4xl lg:text-6xl font-semibold uppercase text-neutral-700 shadow-lg py-4'>
          All Classes Here
        </div>
        <div className='text-center my-10'>
          <div className='flex flex-wrap-reverse gap-10 justify-evenly'>
            <span className='px-10 bg-rose-500 text-white py-3 rounded-xl shadow-xl '>
              English{" "}
            </span>
            <span className='px-10 bg-indigo-500 text-white py-3 rounded-xl shadow-xl '>
              German{" "}
            </span>
            <span className='px-10 bg-green-500 text-white py-3 rounded-xl shadow-xl '>
              Spanish{" "}
            </span>
            <span className='px-10 bg-cyan-500 text-white py-3 rounded-xl shadow-xl '>
              Chinese{" "}
            </span>
          </div>
        </div>
        <div>
          <div>
            {
              <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                  {classes.map((ele) => {
                    return (
                      <div data-aos='flip-up' data-aos-duration='1300'>
                        <CourseCard course={ele} />
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

export default Class;
