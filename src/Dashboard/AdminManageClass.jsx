import React, { useEffect, useState } from "react";
import BG from "../assets/Homepage/BG.png";
import { Button, Dropdown, Table } from "flowbite-react";
import { toast } from "react-toastify";

const AdminManageClass = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/courses`)
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
      });
  }, [data]);
  const changeStatus = (value, id) => {
    fetch(`http://localhost:5000/courses?id=${id}&value=${value}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast(" Role updated successfully");
        }
      });
  };

  return (
    <div>
      <div
        className='relative '
        data-aos='flip-right'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='900'>
        <img src={BG} alt='Your Image' className='w-full' />
        <div className='absolute inset-0 bg-black/10 opacity-10 rounded-2xl'></div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-2xl md:text-4xl lg:text-6xl font-bold text-indigo-500'>
            Admin Manage Classes
          </span>
        </div>
      </div>

      <div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Image </Table.HeadCell>
            <Table.HeadCell>Course Name </Table.HeadCell>
            <Table.HeadCell> Instructor name </Table.HeadCell>

            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Feedback</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {data.map((ele, index) => {
              return (
                <Table.Row
                  key={ele._id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'>
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
                    <div>Available Seat : {ele.enrollment}</div>
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {ele.instructor}
                    <div> {ele?.email || `${ele.instructor}@gmail.`}</div>
                  </Table.Cell>
                  <Table.Cell
                    className={`text-${
                      ele.status === "pending"
                        ? "red-500"
                        : ele.status === "denied"
                        ? "yellow-500"
                        : ele.status === "approved"
                        ? "green-500"
                        : "yellow-400"
                    } font-bold uppercase`}>
                    {ele?.status}
                  </Table.Cell>

                  <Table.Cell>
                    {" "}
                    <Dropdown size={"sm"} label='Choose one ' color={"purple"}>
                      <Dropdown.Item
                        onClick={() => changeStatus("pending", ele._id)}>
                        Pending{" "}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => changeStatus("approved", ele._id)}>
                        Approved
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => changeStatus("denied", ele._id)}>
                        Denied
                      </Dropdown.Item>
                    </Dropdown>
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

export default AdminManageClass;
