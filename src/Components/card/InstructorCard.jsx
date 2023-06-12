import { Card, Rating } from "flowbite-react";
import React from "react";

import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const InstructorCard = ({ data }) => {
  const { name, image, ratings, students, howmanycourse, _id } = data;
  return (
    <>
      <div className='max-w-xs' data-aos='flip-up'>
        <Card>
          <img src={image} alt='' />
          <h2 className='text-xl font-bold text-stone-800 '> Name : {name} </h2>
          <p className='text-lg font-semibold text-indigo-500'>
            {" "}
            Already Enroll :{" "}
            <span className='text-xl font-bold'> {students}</span>
          </p>
          <p className='text-lg font-semibold text-indigo-500'>
            {" "}
            Total Course :{" "}
            <span className='text-xl font-bold'> {howmanycourse}</span>
          </p>
          <p className='text-lg font-semibold text-indigo-500'>
            {" "}
            Email :{" "}
            <span className='text-xl font-bold lowercase'>
              {name}@gmail.com
            </span>
          </p>
          <div
            className='flex justify-between items-center'
            data-aos='flip-down'>
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
            <Link to={`/instructor/${_id}`}>
              <button className='flex justify-center items-center px-5 bg-indigo-600 text-white rounded-3xl font-bold text-xs py-2'>
                <p>See Details</p> <BsArrowRight />{" "}
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default InstructorCard;
