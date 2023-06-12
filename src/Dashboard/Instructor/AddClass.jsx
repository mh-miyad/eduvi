import React, { useState } from "react";
import BG from "../../assets/Homepage/BG.png";
import { useForm, useFieldArray } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { CloudinaryContext } from "cloudinary-react";
import { Cloudinary } from "cloudinary-core";
import { FileInput, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
const AddClass = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const cloudinaryCore = new Cloudinary({ cloud_name: "your_cloud_name" });
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courseModules",
  });
  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    setPrice(parseInt(inputValue)); // Convert the input value to an integer and update the price state
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    if (!image) {
      toast("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "testVision");
    setLoader(true);
    fetch(`https://api.cloudinary.com/v1_1/visionarydev/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((img) => {
        toast("Upload successful");
        setLoader(false);
        setImgUrl(img.url);

        // Perform any necessary actions with the uploaded image data
      })
      .catch((error) => {
        toast("Upload error:", error);
      });
  };
  const onSubmit = (data) => {
    const publishCourse = {
      ...data,
      price: price,
      image: imgUrl,
      email: user?.email,
      feedback: "",
      status: "pending",
      category: "popular",
    };

    axios
      .post("http://localhost:5000/courses", publishCourse)
      .then((response) => {
        if (response.data.insertedId) {
          toast(" Course Add Successful  ");
          reset();
        } // Handle the response data
      })
      .catch((error) => {
        console.error(error);
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
              Add My Classes Here
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='coursename'
              id='coursename'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("coursename", { required: true })}
              required
            />
            <label
              for='coursename'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Course Name
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='ratings'
              id='ratings'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("ratings", { required: true })}
              required
            />
            <label
              for='ratings'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Ratings
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              onChange={handlePriceChange}
              type='number'
              name='price'
              id='price'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              required
            />
            <label
              for='price'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Price
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='description'
              id='description'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("description", { required: true })}
              required
            />
            <label
              for='description'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Description
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='available_seat'
              id='available_seat'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("available_seat", { required: true })}
              required
            />
            <label
              for='available_seat'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Available Seats
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='instructor'
              id='instructor'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              defaultValue={user?.displayName}
              {...register("instructor", { required: true })}
              required
            />
            <label
              for='instructor'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Instructor
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='courseDuration'
              id='courseDuration'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("courseDuration", { required: true })}
              required
            />
            <label
              for='courseDuration'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Course Duration
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='enrollment'
              id='enrollment'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("enrollment", { required: true })}
              required
            />
            <label
              for='enrollment'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Enrollment Students
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='finished'
              id='finished'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              {...register("finished", { required: true })}
              required
            />
            <label
              for='finished'
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Already Finished This Course
            </label>
          </div>
          <div class='relative z-0 w-full mb-6 group'>
            <input
              type='text'
              name='courseDescription'
              id='courseDescription'
              class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              {...register("courseDescription", { required: true })}
              required
            />
            <label
              for='courseDescription '
              class='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
              Course Description
            </label>
          </div>

          <div className='relative z-0 w-full mb-6 group'>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  type='text'
                  name={`courseModules[${index}].name`}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  placeholder=' '
                  defaultValue={field.name} // Set the default value for each courseModules field
                  {...register(`courseModules[${index}].name`, {
                    required: true,
                  })}
                  required
                />
                <button
                  type='button'
                  onClick={() => remove(index)}
                  class='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => append({ name: "" })}
              class='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'>
              Add Course modules
            </button>
          </div>

          {!loader ? (
            <button
              type='submit'
              class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Submit
            </button>
          ) : (
            <Spinner aria-label='Purple spinner example' color='purple' />
          )}
        </form>
        <div>
          <label
            htmlFor='photo'
            className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
            Upload Your Profile Picture
          </label>
          <div>
            <CloudinaryContext cloudName='visionarydev'>
              <FileInput
                helperText='A profile picture is useful to confirm your are logged into your account'
                id='file'
                onChange={handleFileUpload}
              />

              <button
                onClick={handleUpload}
                className='px-5 py-2 bg-indigo-500 rounded-lg text-xl text-white'>
                Upload
              </button>
            </CloudinaryContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
