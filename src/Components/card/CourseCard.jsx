import { Card, Rating } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

// import img from "../../assets/Homepage/Course/Thumnail-1.png";

const CourseCard = ({ course }) => {
  const { coursename, image, ratings, price, available_seat, enrollment, _id } =
    course;
  return (
    <div className='max-w-sm'>
      <Card imgAlt={coursename} imgSrc={image}>
        <a href='#'>
          <h5 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            {coursename}
          </h5>
        </a>
        <div className='mb-5 mt-2.5 flex items-center justify-between'>
          <Rating>
            <Rating.Star filled={ratings >= 1 ? true : false} />
            <Rating.Star filled={ratings >= 2 ? true : false} />
            <Rating.Star filled={ratings >= 3 ? true : false} />
            <Rating.Star filled={ratings >= 4 ? true : false} />
            <Rating.Star filled={ratings >= 5 ? true : false} />

            <span className='ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'>
              <p>{ratings}</p>
            </span>
          </Rating>

          <div className='text-xs'>
            <div className='font-bold text-gray-400 my-3'> Available Seat</div>
            <div className='text-white bg-indigo-500 text-center p-2 rounded-3xl font-bold  '>
              {" "}
              {available_seat}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-sm font-bold text-indigo-600'>
            {" "}
            Already <br /> Finish: <span className='text-lg'>{enrollment}</span>
          </div>
          <span className='text-3xl font-bold text-indigo-700 dark:text-white'>
            ${price}
          </span>
          <Link to={`/class/${_id}`}>
            <a className='rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'>
              View Course
            </a>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
