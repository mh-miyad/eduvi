import React, { useEffect, useState } from "react";
import BG from "../assets/Homepage/BG.png";
import TableComp from "../Components/Table/TableComp";

const ManageUser = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((response) => response.json())
      .then((result) => setData(result));
  }, [data]);
  return (
    <>
      <div>
        <div className='relative ' data-aos='zoom-in'>
          <img src={BG} alt='Your Image' className='w-full' />
          <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
              Manage All Users
            </span>
          </div>
        </div>
        <div>
          <p> All User Information </p>
        </div>
        <div>
          <TableComp data={data} />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
