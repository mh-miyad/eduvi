import { Avatar } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/AuthProvider";
import { toast } from "react-toastify";

const TableRowB = ({ coursename, image, price, _id }) => {
  const { user } = useContext(AuthContext);
  const deleteCourse = (_id) => {
    fetch(
      `http://localhost:5000/select-item?itemId=${_id}&email=${user.email}`,
      {
        method: "DELETE",
      },
    )
      .then((res) => res.text()) // Read response as text instead of JSON
      .then((result) => {
        toast(result);
      });
  };

  return (
    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <td class='w-4 p-4'>
        <div class='flex items-center'>
          <input
            id='checkbox-table-search-1'
            type='checkbox'
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label for='checkbox-table-search-1' class='sr-only'>
            checkbox
          </label>
        </div>
      </td>

      <th scope='row' class='px-6 py-4'>
        <Avatar size={"lg"} img={image} />
      </th>
      <td class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {coursename}
      </td>
      <td class='px-6 py-4'>{price}</td>
      <td class=' px-6 py-4'>
        <button
          onClick={() => deleteCourse(_id)}
          class='font-medium text-red-600 dark:text-red-500  border p-2 rounded-lg hover:bg-red-600 hover:text-white'>
          Delete
        </button>
      </td>

      <td class=' px-6 py-4 '>
        <Link
          to={`/dashboard/payments`}
          class='font-medium text-indigo-600 dark:text-indigo-500  border p-2 rounded-lg hover:bg-indigo-600 hover:text-white'>
          Pay
        </Link>
      </td>
    </tr>
  );
};

export default TableRowB;
