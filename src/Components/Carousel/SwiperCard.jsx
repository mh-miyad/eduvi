import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";
import { Pagination, Autoplay } from "swiper";
import CourseCard from "../card/CourseCard";
import { useMediaQuery } from "react-responsive";
const SwiperCard = ({ data }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  let slidesPerView = isMobile ? 1 : isTablet ? 2 : 3;
  return (
    <div>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className=''>
        {data.map((item) => (
          <div className=''>
            <SwiperSlide className=''>
              <CourseCard course={item} key={item._id} />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCard;
