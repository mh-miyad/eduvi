import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { toast } from "react-toastify";

const TableRow = ({ item }) => {
  const { name, email, image, role, _id } = item;

  const makeRole = (value, id) => {
    fetch(`http://localhost:5000/users/admin?id=${id}&value=${value}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast(" Role updated successfully");
        }
      });
  };
  const deleteUser = (id) => {
    fetch(` http://localhost:5000/users/admin/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        toast("User deleted successfully:", data);
        console.log(data);
        // Perform any additional actions after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle error condition
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
        {name}
      </td>
      <td class='px-6 py-4'>{email}</td>
      <td class='px-6 py-4'>{role}</td>
      <td class='px-6 py-4'>
        <Dropdown size={"sm"} label='Choose one ' color={"purple"}>
          <Dropdown.Item onClick={() => makeRole("admin", _id)}>
            Admin{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => makeRole("instructor", _id)}>
            Instructor
          </Dropdown.Item>
        </Dropdown>
      </td>

      <td class='flex items-center px-6 py-4 space-x-3'>
        <button
          onClick={() => deleteUser(_id)}
          class='font-medium text-red-600 dark:text-red-500 hover:underline border p-2 rounded-lg'>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
