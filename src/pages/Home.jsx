import React, { useEffect, useState } from "react";
import TopSection from "../Components/Header/TopSection";

import HeaderTitle from "../Components/Title/HeaderTitle";
import SwiperCard from "../Components/Carousel/SwiperCard";
import InstructorCard from "../Components/card/InstructorCard";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import useInstructor from "../Hooks/useInstructor";
import Subsdcribe from "../Components/Subscribe/Subsdcribe";
import QualityOfContent from "../Components/VIdeoSection/QualityOfContent";
// ..
AOS.init();
const Home = () => {
  const [data, setData] = useState([]);
  const [instructor] = useInstructor();

  useEffect(() => {
    fetch(`http://localhost:5000/courses`)
      .then((response) => response.json())
      .then((res) => setData(res));
  }, []);

  return (
    <>
      <div>
        <div data-aos='fade-right' data-aos-duration='1000'>
          <TopSection />
        </div>
        <div>
          <HeaderTitle title={" Popular Course   "} />
        </div>
        <div data-aos='fade-left' data-aos-duration='1600'>
          <SwiperCard data={data} />
        </div>
        <div>
          <HeaderTitle title={" Popular  Instructors    "} />
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
              {instructor.map((ele) => {
                return (
                  <div data-aos='zoom-out-up' data-aos-duration='1500'>
                    <InstructorCard
                      data={ele}
                      data-aos='zoom-out-up'
                      data-aos-duration='1500'
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          data-aos='flip-left'
          data-aos-easing='ease-out-cubic'
          data-aos-duration='1800'>
          <QualityOfContent />
        </div>
        <div
          className='my-5'
          data-aos='flip-right'
          data-aos-easing='ease-out-cubic'
          data-aos-duration='1500'>
          <Subsdcribe />
        </div>
      </div>
    </>
  );
};

export default Home;
