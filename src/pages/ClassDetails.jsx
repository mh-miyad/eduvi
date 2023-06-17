import React from "react";
import BG from "../assets/Homepage/BG.png";
import { useLoaderData } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
// ..
AOS.init();
const ClassDetails = () => {
  const { user } = useContext(AuthContext);
  const course = useLoaderData();

  const {
    coursename,
    image,
    ratings,
    price,
    available_seat,
    enrollment,
    _id,
    instructor,
    finished,
    category,
    courseDuration,
    courseModules,
    courseDescription,
    description,
  } = course[0];

  const selectData = () => {
    const userData = {
      coursename,
      email: user?.email,
      image,
      ratings,
      price,
      available_seat,
      enrollment,
      courseID: _id,
      instructor,
      category,
    };
    fetch(`http://localhost:5000/select`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast("  Course Select  successfully");
        }
        if (data.message) {
          toast(data.message);
        }
      });
  };

  return (
    <>
      <div className='text-gray-700'>
        <div
          className='relative '
          data-aos='flip-right'
          data-aos-easing='ease-out-cubic'
          data-aos-duration='900'>
          <img src={BG} alt='Your Image' className='w-full' />
          <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
              Class Details
            </span>
          </div>
        </div>

        <div
          className='flex flex-col lg:flex-row gap-10 items-center'
          data-aos='flip-left'
          data-aos-easing='ease-out-cubic'
          data-aos-duration='1000'>
          <div className='my-10 '>
            <div className=''>
              <img src={image} alt='' className='  rounded-2xl shadow-xl ' />
            </div>
            <div
              className='p-10 rounded-2xl shadow-xl my-10 '
              data-aos='flip-right'
              data-aos-easing='ease-out-cubic'
              data-aos-duration='1000'>
              <div className='   '>
                <p className='text-lg md:text-2xl lg:text-4xl font-bold text-center '>
                  Course Name :{" "}
                  <span className='text-violet-500 '>{coursename}</span>
                  <p className='text-gray-600 text-md'>{description}</p>
                </p>
                <p className='text-lg  lg:text-xl font-bold  my-5 text-center '>
                  Instructor Name :{" "}
                  <span className='text-violet-500 '>{instructor}</span>
                </p>
              </div>
            </div>

            <div
              className='rounded-xl shadow-xl shadow-violet-600/20 border-y-4 border-y-violet-500'
              data-aos='flip-left '
              data-aos-easing='ease-out-cubic'
              data-aos-duration='1000'>
              <div className='p-10 '>
                <h2 className=' text-xl md:text-2xl font-bold pb-3 '>
                  {" "}
                  Course Description{" "}
                </h2>
                <p className=' text-sm font-semibold  md:text-md'>
                  {courseDescription}
                </p>
              </div>
              <div className='p-10 '>
                <h2 class='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                  Course Modules :
                </h2>
                <ul class='max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400'>
                  {courseModules.map((ele) => (
                    <li className='capitalize font-medium p-2'>
                      {ele?.name || ele}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div
            className='p-10 rounded-2xl shadow-2xl border-x-4  border-x-indigo-600 w-10/12 h-1/2'
            data-aos='flip-right'
            data-aos-easing='ease-out-cubic'
            data-aos-duration='1000'>
            <div className='  '>
              <p className='text-md font-bold'>
                Course Duration :{" "}
                <span className='text-violet-500 '>{courseDuration}</span>
              </p>
              <p className='text-md font-bold'>
                Total Student :{" "}
                <span className='text-violet-500 '>{enrollment}</span>
              </p>
              <p className='text-md font-bold'>
                Finished Class :{" "}
                <span className='text-violet-500 '>{finished}</span>
              </p>
              <p className='text-md font-bold'>
                Price : <span className='text-violet-500 '>${price}</span>
              </p>
              <p className='text-md font-bold'>
                Available Seat :{" "}
                <span className='text-violet-500 '>{available_seat}</span>
              </p>
              <p className='text-md font-bold'>
                Ratings : <span className='text-violet-500 '>{ratings}</span>
              </p>
              <p className='text-md font-bold'>
                Category:{" "}
                <span className='text-violet-500 '>
                  {category || "Popular"}
                </span>
              </p>
              {user ? (
                <div className='flex justify-center gap-10 my-4'>
                  <button className='text-white bg-pink-500 px-3 py-2 rounded-lg font-bold '>
                    Add favorite
                  </button>
                  <button
                    className='text-white bg-indigo-500 px-3 py-2 rounded-lg font-bold '
                    onClick={selectData}>
                    {" "}
                    Select Class{" "}
                  </button>
                </div>
              ) : (
                <div className='flex justify-center gap-5 my-6 '>
                  <p className='uppercase text-red-500 font-bold '>
                    {" "}
                    please Log First before you Select This Class{" "}
                  </p>
                  <Button disabled color={"failure"}>
                    Add favorite
                  </Button>
                  <Button disabled color={"purple"}>
                    {" "}
                    Select Class{" "}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ClassDetails;
