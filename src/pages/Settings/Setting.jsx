import { useContext, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "sonner";

import {
  User,
  Mail,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  Camera,
} from "lucide-react";

import { userContext } from "../context/user.context";


export default function Settings() {

  const { token, setToken } = useContext(userContext);
 const {userInfo} = useContext(userContext)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = yup.object({

    password: yup
      .string()
      .required("Password is required"),

    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),

    confirmPassword: yup
      .string()
      .required("Please confirm your new password")
      .oneOf(
        [yup.ref("newPassword")],
        "Passwords do not match"
      ),

  });



  async function handleChangePassword(values, { resetForm }) {

    try {

      const options = {

        url: "https://route-posts.routemisr.com/users/change-password",

        method: "PATCH",

        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

        data: {
          password: values.password,
          newPassword: values.newPassword,
        },

      };


      const { data } = await axios.request(options);


      console.log("Change password response:", data);


      if (data.success) {

        toast.success(
          data.message || "Password changed successfully"
        );



        const newToken = data.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);


        resetForm();

      }

    } catch (error) {

      console.log("Change password error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to change password"
      );

    }

  }


  const formik = useFormik({

    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: handleChangePassword,

  });


  return (

    <div className="min-h-screen bg-amber-50 py-6 sm:py-8">

      <div className="max-w-4xl mx-auto px-4 sm:px-6">


        <div className="mb-6">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account and preferences
          </p>

        </div>




        <section className="bg-gray-50 rounded-xl overflow-hidden mb-5 border-amber-300 border">

          <div className="px-5 py-4 border-b border-gray-200">

            <h2 className="text-lg font-semibold text-gray-900">
              Account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage your personal information
            </p>

          </div>


          <div className="p-5">



            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">

              <div className="relative w-fit">

                <img
                  src={userInfo?.photo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                />
              </div>


              <div>

                <h3 className="font-semibold text-gray-900">
                  {userInfo?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  @{userInfo?.username}
                </p>

                

              </div>

            </div>




            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                disabled
                  type="text"
                  defaultValue={userInfo?.name}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>




            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <div className="relative">

                <AtSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                disabled
                  type="text"
                  defaultValue={userInfo?.username}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                disabled
                  type="email"
                  defaultValue={userInfo?.email}
                  className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>



          </div>

        </section>


        <section className="bg-gray-50 rounded-xl shadow-sm overflow-hidden mb-5 border-amber-300 border">


          <div className="px-5 py-4 border-b border-gray-200">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

                <Lock
                  className="text-blue-600"
                  size={20}
                />

              </div>


              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Change Password
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update your password to keep your account secure
                </p>

              </div>

            </div>

          </div>




          <form
            onSubmit={formik.handleSubmit}
            className="p-5"
          >


            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>


              <div className="relative">

                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />


                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  value={formik.values.password}

                  onChange={formik.handleChange}

                  onBlur={formik.handleBlur}

                  placeholder="Enter current password"

                  className={`w-full border rounded-lg pl-10 pr-11 py-2.5 text-sm outline-none focus:ring-2 ${
                    formik.touched.password &&
                    formik.errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />


                <button
                  type="button"

                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >

                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

              {formik.touched.password &&
                formik.errors.password && (

                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.password}
                  </p>

                )}

            </div>


            <div className="mb-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>


              <div className="relative">

                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />


                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }

                  name="newPassword"

                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter new password"
                  className={`w-full border rounded-lg pl-10 pr-11 py-2.5 text-sm outline-none focus:ring-2 ${
                    formik.touched.newPassword &&
                    formik.errors.newPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />


                <button
                  type="button"

                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >

                  {showNewPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>



              {formik.touched.newPassword &&
                formik.errors.newPassword && (

                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.newPassword}
                  </p>

                )}

            </div>


            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>


              <div className="relative">

                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />


                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  name="confirmPassword"

                  value={formik.values.confirmPassword}

                  onChange={formik.handleChange}

                  onBlur={formik.handleBlur}

                  placeholder="Confirm new password"

                  className={`w-full border rounded-lg pl-10 pr-11 py-2.5 text-sm outline-none focus:ring-2 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>



              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (

                  <p className="mt-1 text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </p>

                )}

            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-3">

              <p className="text-xs text-gray-500">
                Your password should be at least 8 characters
                and contain a mix of letters and numbers.
              </p>

            </div>

            <div className="flex justify-end mt-5">

              <button
                type="submit"
                className="bg-amber-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-500 transition cursor-pointer "
              >
                Update Password
              </button>

            </div>

          </form>

        </section>

      </div>

    </div>

  );
}