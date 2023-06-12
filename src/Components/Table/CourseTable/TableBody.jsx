import React from "react";
import TableRowB from "./TableRowB";

const TableBody = ({ data }) => {
  return (
    <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='p-4'>
              <div class='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label for='checkbox-all-search' class='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' class='px-6 py-3'>
              Course Image
            </th>
            <th scope='col' class='px-6 py-3'>
              Name
            </th>
            <th scope='col' class='px-6 py-3'>
              Price
            </th>

            <th scope='col' class='px-6 py-3'>
              Action
            </th>
            <th scope='col' class='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRowB
                _id={item?._id}
                coursename={item?.coursename}
                image={item?.image}
                price={item?.price}
                key={item?._id}
              />
            ))
          ) : (
            <>
              <tr>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableBody;
