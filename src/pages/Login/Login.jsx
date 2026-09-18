import React, { use, useContext, useState } from 'react'
import { useFormik } from 'formik';
import signinImage from "../../assets/Signin.png";
import { toast } from 'sonner';
import axios from 'axios';
import * as yup from  'yup';
import { useNavigate } from 'react-router';
import { userContext } from '../context/user.context';
import { NavLink } from "react-router";

import {
  FaceGrinning,
} from "lucide-react";

export default function Login() {

const navigate = useNavigate();

const [hasWrongInput , SetHasWrongInput] = useState(false)
const {setToken}= useContext(userContext)

  const schema = yup.object({
email : yup.string().required('Email is Required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
password: yup
  .string()
  .required('Password is required'),
  })

const {values , handleBlur , handleChange , handleSubmit , touched , errors , setFieldValue} = useFormik({
  initialValues: {
    email: '',
    password: '',
  },

  validationSchema: schema,

onSubmit: async (values) => {

  console.log("SUBMITTED", values);

  const options = {
    method: 'POST',
    url: 'https://route-posts.routemisr.com/users/signin',
    headers: {
      'content-type': 'application/json',
    },
    data: values,
  };
  try {
  const { data } = await axios.request(options);

    console.log("LOGIN RESPONSE:", data);

    if (data.success) {
      toast.success('Welcome back');  
      //  console.log(data.data.token);
      const token =  data.data.token ;
      setToken(token);
      localStorage.setItem('token', token);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }

  } catch (error) {
  console.log({error});
  if(error.response.data.message === 'incorrect email or password'){
    SetHasWrongInput(true)
  };
    if (error.response.data.message?.includes('fails to match the required pattern:')) {
    SetHasWrongInput(true)
  }

}
}

});


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
                Sign In
              </h1>

              <span className="text-[16px] font-semibold text-[#f5a623]">
                Social App
              </span>
            </div>

            <p className="mt-3 max-w-112.5 text-sm leading-6 text-[#a7a7a7]">
              Connect with people, share your thoughts and
              discover new experiences.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={handleSubmit}>

        

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="email">
                Email
              </label>

              <input
              name='email'
              onChange={(e)=>{
           handleChange(e)
         SetHasWrongInput(false)

              }}
              onBlur={handleBlur}
              value={values.email}
                type="email"
                id="email"
                placeholder="Email@gmail.com"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
              { errors.email && touched.email? <p className='text-red-500 text-sm'> {errors.email}</p> : '' }

            </div>

    

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#343434]" htmlFor="password">
                Password
              </label>

              <input
              name='password'
            onChange={(e)=>{
           handleChange(e)
         SetHasWrongInput(false)
              }}
              onBlur={handleBlur}
              value={values.password}
                type="password"
                id="password"
                placeholder="******"
                className="h-11 w-full rounded-lg bg-[#f6f6f6] px-4 text-sm outline-none transition focus:bg-white focus:ring-1 focus:ring-[#ffa82e]"
              />
            { errors.password && touched.password? <p className='text-red-500 text-sm'> {errors.password}</p> : '' }
              {hasWrongInput? <p className='text-red-500 text-sm'>  Email or Password is Incorrect </p> : '' }

            </div>


            <div className="mt-3 flex items-center justify-between gap-4 sm:col-span-2">

              <p className="text-sm text-[#444]">
                Don't have an account?

                  <NavLink
      to="/signup"
      className="ml-1 font-semibold text-[#f5a623] hover:underline"
    >
      Sign Up
    </NavLink>
              </p>

              <button
                type="submit"
                className="cursor-pointer h-11 rounded-lg bg-[#ffa82e] px-8 text-sm font-semibold text-white transition hover:bg-[#f59a19] "
              >
                Sign in
              </button>

            </div>
          </form>
        </div>

        <div className="relative hidden w-[45%] items-center justify-center overflow-hidden bg-[#fff8df] lg:flex">

          <div className="absolute h-120 w-120 rounded-full bg-[#ffdc69]" />

          <img
            src={signinImage}
            alt="Social app signin"
            className="relative z-10 w-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}