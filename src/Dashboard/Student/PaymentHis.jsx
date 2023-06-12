import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";

const PaymentHis = () => {
  const { user, setmenuiD } = useContext(AuthContext);
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch(`https://eduvi-server.vercel.app/payments?email=${user.email}`)
      .then((res) => res.json())
      .then((resdata) => {
        setdata(resdata);

        if (resdata.transactionId) {
          fetch(
            `https://eduvi-server.vercel.app/payments?email=${user.email}`,
            {
              method: "PATCH",
            },
          )
            .then((res) => res.json())
            .then((resdata) => {
              console.log(resdata);
            });
        }

        const itemsdata = resdata.map((item) => item.menuItems);
        setmenuiD(itemsdata);
      });
  }, [data]);
  return (
    <div>
      <div className='text-center text-xl md:text-2xl lg:text-4xl font-bold my-5 uppercase shadow-2xl p-6'>
        {" "}
        Your payment History{" "}
      </div>

      {data.map((items, index) => {
        return (
          <>
            <div className='flex gap-10 border p-8 shadow-md shadow-indigo-400/40'>
              <ol className=' '>
                {" "}
                <li className='border p-4 rounded-full bg-indigo-300 '>
                  {index + 1}
                </li>
              </ol>
              <div className='mx-5 '>
                <div className='text-md font-semibold p-3 '>
                  Your Transaction ID :{" "}
                  <span className='text-lg text-indigo-600 shadow-lg '>
                    {items.transactionId}
                  </span>
                </div>
                <div className='text-md font-semibold p-2'>
                  Total price : ${items.price}
                </div>
                <div className='text-md font-semibold p-2'>
                  Your Enroll Date : {items.date}
                </div>
                <div className='text-md font-semibold p-2'>
                  Quantity Of Course : {items.quantity}
                </div>
                <div className='text-md font-semibold p-2'>
                  Name Of These Course :{" "}
                  <ol>
                    {items.itemNames.map((ele) => (
                      <li>{ele || index}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default PaymentHis;
