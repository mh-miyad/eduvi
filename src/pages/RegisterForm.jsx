import React, { useState } from "react";
import logo from "../assets/Homepage/logo.png";
import { useForm } from "react-hook-form";
// import GoogleButton from "../Components/GoogleBnt/GoogleButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudinaryContext } from "cloudinary-react";
import { Cloudinary } from "cloudinary-core";
import { FileInput, Label, Select, Spinner } from "flowbite-react";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../assets/Homepage/carousel/68312-login.json";
const RegisterForm = () => {
  const { user, login, updateUser, createUser, googleSignIn } =
    useContext(AuthContext);
  const cloudinaryCore = new Cloudinary({ cloud_name: "your_cloud_name" });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [islogin, setLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUser(data.name, imgUrl);
      if (loggedUser) {
        const userData = {
          name: data.name,
          email: data.email,
          image: imgUrl,
          role: data?.role || "student",
        };
        // user data
        setLoader(true);
        fetch(`https://eduvi-server.vercel.app/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((resdata) => {
            if (resdata.insertedId) {
              setLoader(false);
              toast("Sign  Up  successful");
              navigate("/");
            }
          });
      }
    });
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

  const handleLogIn = (e) => {
    e.preventDefault();
    login(email, password).then((result) => {
      const loggedUser = result.user;
      if (loggedUser) {
        toast("Sign In Successful");
        navigate("/");
      } else {
        toast("Please Log In");
      }
    });
  };

  const SignInByGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        if (user) {
          toast("Sign in successful");
          navigate("/");
          const userData = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            role: "student",
          };

          fetch("https://eduvi-server.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((resdata) => {
              if (resdata.insertedId) {
                toast("Sign in successful");
                navigate("/");
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='bg-white dark:bg-gray-900'>
        <div className='lg:flex justify-center flex-col-reverse items-center lg:flex-row h-screen gap-20'>
          <div className=' hidden lg:block w-1/2 my-20 '>
            <div className='mt-10'>
              <Lottie animationData={loginImage} loop={true} />
            </div>
          </div>

          <div className='flex items-center w-full  lg:w-1/2 max-w-md px-6 mx-auto '>
            <div className='flex-1'>
              <div className='text-center'>
                <div className='flex justify-center mx-auto'>
                  <img className='w-auto h-7 sm:h-12' src={logo} alt='' />
                </div>

                <p className='mt-3 text-gray-500 font-bold text-xl dark:text-gray-300'>
                  Sign in to access your account
                </p>
              </div>

              <div className='mt-8'>
                {islogin ? (
                  <form onSubmit={handleLogIn}>
                    <div>
                      <label
                        htmlFor='email1'
                        className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@example.com'
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <div className='flex justify-between mb-2'>
                        <label
                          htmlFor='password1'
                          className='text-sm text-gray-600 dark:text-gray-200'>
                          Password
                        </label>
                        <a
                          href='#'
                          className='text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline'>
                          Forgot password?
                        </a>
                      </div>

                      <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>

                    <div className='mt-6'>
                      <input
                        type='submit'
                        value={"Sign in"}
                        className='w-full cursor-pointer px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                      />
                    </div>
                  </form>
                ) : (
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <label
                          htmlFor='name'
                          className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                          Full Name
                        </label>
                        <input
                          type='text'
                          name='name'
                          id='name'
                          {...register("name", { required: true })}
                          placeholder='Example : Mahamudul hasan Miyad '
                          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='phone'
                          className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>
                          Email Address
                        </label>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          {...register("email", { required: true })}
                          placeholder='name@example.com'
                          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                        />
                      </div>
                      <div className='mt-6'>
                        <div className='flex justify-between mb-2'>
                          <label
                            htmlFor='password'
                            className='text-sm text-gray-600 dark:text-gray-200'>
                            Password
                          </label>
                        </div>

                        <input
                          type='password'
                          name='password'
                          id='password'
                          placeholder='Your Password'
                          {...register("password", { required: true })}
                          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40'
                        />
                      </div>{" "}
                      <div className='mt-6'>
                        <div className='flex justify-between mb-2'>
                          <label
                            htmlFor='Confirm password'
                            className='text-sm text-gray-600 dark:text-gray-200'>
                            Confirm Password
                          </label>
                        </div>

                        <input
                          type='password'
                          name='confirmPassword'
                          id='confirmPassword'
                          placeholder='Confirm Password'
                          {...register("confirmPassword", { required: true })}
                          className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-400 focus:outline-none focus:ring focus:ring-opacity-40'
                        />
                      </div>
                      <div className='max-w-md' id='select'>
                        <div className='mb-2 block'>
                          <Label htmlFor='role' value='Select your Role' />
                        </div>
                        <Select id='role' required {...register("role")}>
                          <option>Choose One </option>
                          <option value={"instructor"}>Instructor</option>
                          <option value={"student"}>Student</option>
                        </Select>
                      </div>
                      <div className='mt-6'>
                        {!loader ? (
                          <input
                            type='submit'
                            value={"Sign in"}
                            className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                          />
                        ) : (
                          <Spinner
                            aria-label='Purple spinner example'
                            color='purple'
                          />
                        )}
                      </div>
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
                )}

                {islogin ? (
                  <p className='mt-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{" "}
                    <a
                      className='text-indigo-500 focus:outline-none focus:underline hover:underline cursor-pointer'
                      onClick={() => setLogin(false)}>
                      {" "}
                      Sign Up
                    </a>
                  </p>
                ) : (
                  <p className='mt-6 text-sm text-center text-gray-400'>
                    Already have An Account ?{" "}
                    <a
                      className='text-indigo-500 focus:outline-none focus:underline hover:underline cursor-pointer'
                      onClick={() => setLogin(true)}>
                      {" "}
                      Log In
                    </a>
                  </p>
                )}
              </div>
              <div className=' my-4 ml-20'>
                <div>
                  <div className=''>
                    <button
                      onClick={SignInByGoogle}
                      className='border-2  hover:border-slate-500 hover:text-black hover:bg-white  transition-transform duration-200 delay-75  uppercase flex gap-2 px-10 text-sm items-center py-2 bg-gray-100  rounded-xl font-bold text-gray-500  '>
                      {" "}
                      <FcGoogle className='w-5 h-5' /> Sign In with Google{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
