import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import BG from "../../assets/Homepage/BG.png";
import { useEffect } from "react";
import CourseCard from "../../Components/card/CourseCard";
const EnrollClass = () => {
  const [enrollment, setEnrollment] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/enrolled-courses?email=${user?.email}`)
      .then((res) => res.json())
      .then((result) => {
        setEnrollment(result);
      });
  }, [enrollment]);

  return (
    <div>
      <div
        className='relative my-5'
        data-aos='flip-right'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='900'>
        <img src={BG} alt='Your Image' className='w-full' />
        <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
            Your Enroll Classes
          </span>
        </div>
      </div>
      <div>
        <div>
          {
            <div>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                {enrollment.map((ele) => {
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
  );
};

export default EnrollClass;
