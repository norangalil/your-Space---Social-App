import React, { useState } from 'react'
import { useFormik } from 'formik';
import signupImage from "../../assets/Signup.png";
import { toast } from 'sonner';
import axios from 'axios';
import * as yup from  'yup';
import { useNavigate } from 'react-router';
import { NavLink } from "react-router";
import {
  FaceGrinning,
} from "lucide-react";

export default function Signup() {
const [isUserNameExist , setUserNameExist]= useState(false);
const [isEmailExist , setEmailExist]= useState(false);
const navigate = useNavigate();

function handleEmailhange(e){
setFieldValue('email' , e.target.value)
setEmailExist(false)
  }

function handleUserNamehange(e){
setFieldValue('username' , e.target.value)
setUserNameExist(false)
  }

  const schema = yup.object({
name: yup.string().required('Name is Required').min(3 , 'Name must contain at least 3 character').max(20 , 'Name must contain at max 20 character'),
username : yup.string().required('UserName is Required').min(3 , 'User Name must contain at least 3 character').max(20 , ' User Name must contain at max 20 character'),
email : yup.string().required('Email is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
password: yup
  .string()
  .required('Password is required')
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
  ),
rePassword : yup.string().required('Re-password is required').oneOf([yup.ref('password')] , 'Password not match'),
gender: yup.string().required('Gender is required').oneOf(['male' , 'female'], 'gender must be a male or female'),
dateOfBirth: yup.string().required('date of birth is required')

  })

const {values , handleBlur , handleChange , handleSubmit , touched , errors , setFieldValue} = useFormik({
  initialValues: {
    name: '',
    username: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    rePassword: '',
  },

  validationSchema: schema,

  onSubmit: async (values) => {
      console.log("SUBMITTED", values);
    const options = {
      method: 'POST',
      url: 'https://route-posts.routemisr.com/users/signup',
      headers: {
        'content-type': 'application/json',
      },
      data: values,
    };

  try {
  const { data } = await axios.request(options);
  console.log(data);

  if (data.success) {
    toast.success('Account Created Successfully');
    setTimeout(()=>{ navigate('/login')},2000)
  }
} catch (error) {
  console.log(error.response?.data.message);
  if(error.response?.data.message === 'user already exists.') {
    setEmailExist(true);
  }
  else if(error.response?.data.message === 'username already exists.') {
    setUserNameExist(true);
}
  }}
});

console.log(errors);

  return (
    <div className="min-h-screen bg-linear-to-r from-[#ffe27a] via-[#ffc94f] to-[#ffad27] flex items-center justify-center px-4 py-8">

      <div className="flex w-full max-w-295 min-h-190 overflow-hidden rounded-3xl bg-white shadow-lg">

        <div className="w-full px-8 py-10 md:px-12 lg:w-[55%] lg:px-16">

          <div className="mb-8 flex items-center gap-2">
            <FaceGrinning className="text-3xl text-[#f5b52c]"></FaceGrinning>

            <span className="text-2xl font-bold italic text-[#263447]">
              Your Space
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <h1 className="text-[38px] font-bold leading-none text-[#263447]">
                Create Account
              </h1>

              <span className="text-[16px] font-semibold text-[#f5a623]">
                Social App
              </span>
            </div>

            <p className="mt-3 max-w-112.5 text-sm leading-6 text-[#a7a7a7]">
              Create your account and join our community.
              Connect with people, share your thoughts and
              discover new experiences.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={handleSubmit}>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="fullName">
                Full Name
              </label>

              <input
              name='name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
                type="text"
                id="fullName"
                placeholder="Enter your Full Name"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
            { errors.name && touched.name? <p className='text-red-500 text-sm'> {errors.name}</p> : '' }

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="username">
                Username
              </label>

              <input
              name='username'
              onChange={handleUserNamehange}
               onBlur={handleBlur}
              value={values.username}
                type="text"
                id="username"
                placeholder="Enter Your UserName"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
              { errors.username && touched.username? <p className='text-red-500 text-sm'> {errors.username}</p> : '' }
              {isUserNameExist? <p className='text-red-500 text-sm'> User Name Already Exist </p> : '' }

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="email">
                Email
              </label>

              <input
              name='email'
              onChange={handleEmailhange}
              onBlur={handleBlur}
              value={values.email}
                type="email"
                id="email"
                placeholder="Email@gmail.com"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
              { errors.email && touched.email? <p className='text-red-500 text-sm'> {errors.email}</p> : '' }
              {isEmailExist? <p className='text-red-500 text-sm'> This Email Already Exist </p> : '' }

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="dateOfBirth">
                Date of Birth
              </label>

              <input
              name='dateOfBirth'
              onChange={handleChange}
onBlur={handleBlur}
              value={values.dateOfBirth}
                type="date"
                id="dateOfBirth"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
          { errors.dateOfBirth && touched.dateOfBirth? <p className='text-red-500 text-sm'> {errors.dateOfBirth}</p> : '' }

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="gender">
                Gender
              </label>

              <select
              name='gender'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
                id="gender"
                
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm text-gray-600 outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            { errors.gender && touched.gender? <p className='text-red-500 text-sm'> {errors.gender}</p> : '' }

            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="password">
                Password
              </label>

              <input
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
                type="password"
                id="password"
                placeholder="******"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
            { errors.password && touched.password? <p className='text-red-500 text-sm'> {errors.password}</p> : '' }

            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="rePassword">
                Confirm Password
              </label>

              <input
              name='rePassword'
              onChange={handleChange}
              value={values.rePassword}
              onBlur={handleBlur}
                type="password"
                id="rePassword"
                placeholder="******"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
          { errors.rePassword && touched.rePassword? <p className='text-red-500 text-sm'> {errors.rePassword}</p> : '' }

            </div>

            <div className="mt-3 flex items-center justify-between gap-4 sm:col-span-2">

              <div className="flex items-center gap-1 text-sm text-gray-600">
    <span>Already have an account?</span>

    <NavLink
      to="/login"
      className="font-semibold text-[#f5a623] hover:underline"
    >
      Sign In
    </NavLink>
  </div>

              <button
                type="submit"
                className="cursor-pointer h-11 rounded-lg bg-[#ffa82e] px-8 text-sm font-semibold text-white transition hover:bg-[#f59a19] "
              >
                Register
              </button>

            </div>
          </form>
        </div>

        <div className="relative hidden w-[45%] items-center justify-center overflow-hidden bg-[#fff8df] lg:flex">

          <div className="absolute h-120 w-120 rounded-full bg-[#ffdc69]" />

          <img
            src={signupImage}
            alt="Social app signup"
            className="relative z-10 w-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}