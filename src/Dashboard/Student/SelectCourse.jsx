import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import TableBody from "../../Components/Table/CourseTable/TableBody";
import BG from "../../assets/Homepage/BG.png";
import PaymentHis from "./PaymentHis";

const SelectCourse = () => {
  const { user, setlabel, setprice, setCardDetails } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let totalPrice = 0;
    if (Array.isArray(data)) {
      data.forEach((price) => {
        totalPrice += price.price;
      });
    }
    setTotal(totalPrice);
    setprice(parseFloat(total?.toFixed(2)));
  }, [data]);

  useEffect(() => {
    fetch(`http://localhost:5000/select?email=${user?.email}`)
      .then((res) => res.json())
      .then((result) => {
        setCardDetails(result);
        setlabel(result?.length || 0);
        setData(result);
        setLoading(false);
      });
  }, [data]);

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
            Your Select Class
          </span>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : data.length > 0 ? (
        <div>
          <TableBody data={data} />
          <div className='text-xl md:text-3xl text-right border shadow-2xl p-5 my-5 rounded-2xl'>
            <span>Your Should Pay :</span>{" "}
            <span className='font-bold'>Total ${total}</span>
          </div>
        </div>
      ) : (
        <div>
          <div className='text-center text-xl md:text-2xl lg:text-5xl font-semibold'>
            No courses selected.
          </div>
          <PaymentHis></PaymentHis>
        </div>
      )}
    </div>
  );
};

export default SelectCourse;
