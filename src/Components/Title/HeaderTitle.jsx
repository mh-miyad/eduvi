import React from "react";

const HeaderTitle = ({ title }) => {
  return (
    <div>
      <h2 className=' uppercase text-violet-600 text-center text-2xl md:text-4xl lg:text-5xl font-bold my-5 text-gary-700  border w-1/2  rounded-xl shadow-xl shadow-violet-700/20 mx-auto p-5'>
        {" "}
        {title}
      </h2>
    </div>
  );
};

export default HeaderTitle;
