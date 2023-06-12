import React from "react";
import img from "../../assets/Homepage/carousel/Subscribe.png";

const Subsdcribe = () => {
  return (
    <div>
      <div className='relative'>
        <img src={img} alt='Your Image' className='w-full h-48 lg:h-auto' />
        <div className='absolute inset-0  opacity-50'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white  text-center text-md md:text-2xl lg:text-5xl font-bold'>
            Subscribe For Get Update <br />
            Every New Courses
            <p className='text-gray-500 text-xs md:text-md lg:text-lg mt-4'>
              20k+ students daily learn with Eduvi. Subscribe for new courses.
            </p>
            <div className='text-sm flex my-4 mx-auto'>
              <input
                type='email'
                id='helper-text'
                aria-describedby='helper-text-explanation'
                class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@gamil.com'></input>
              <button className='px-5 lg:px-10 lg:py-3 text-sm bg-purple-600 rounded-xl'>
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subsdcribe;
