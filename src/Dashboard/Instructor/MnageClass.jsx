import React from "react";
import BG from "../../assets/Homepage/BG.png";
import { Avatar, Button, Table } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
const MnageClass = () => {
  const [data, setdata] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/course?email=${user?.email}`)
      .then((res) => res.json())
      .then((resData) => {
        setdata(resData);
      });
  }, []);

  const deleteCourse = (id) => {
    axios
      .delete(`http://localhost:5000/courses?id=${id}&email=${user?.email}`)
      .then((response) => {
        if (response.data) {
          toast("Course deleted");
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
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
              Manage Your Class Here
            </span>
          </div>
        </div>

        <Table hoverable>
          <Table.Head>
            <Table.HeadCell> No. </Table.HeadCell>
            <Table.HeadCell>Image </Table.HeadCell>
            <Table.HeadCell> Name </Table.HeadCell>
            <Table.HeadCell> Total Enroll </Table.HeadCell>
            <Table.HeadCell> feedback </Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {data.map((ele, index) => {
              return (
                <Table.Row
                  key={ele._id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <img
                      src={ele.image}
                      alt=''
                      className='border h-12 lg:w-20 lg:h-20 rounded-xl'
                    />
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {ele.coursename}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {ele.enrollment}
                  </Table.Cell>

                  <Table.Cell>{ele.feedback || " No Feedback Now "}</Table.Cell>
                  <Table.Cell>{ele.status}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={"failure"}
                      onClick={() => deleteCourse(ele._id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MnageClass;
