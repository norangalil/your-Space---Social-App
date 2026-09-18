
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../pages/context/user.context";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";

export default function PostForm({
  onPostCreated,
  editingPost,
  onEditDone,
}) {

  const { token, userInfo } = useContext(userContext);

  const [ImagePreview, setImagePreview] = useState(null);

  const formik = useFormik({

    initialValues: {
      body: "",
      image: null,
    },

    onSubmit: async (values) => {

      try {

        const myFormData = new FormData();

        myFormData.append("body", values.body);

        if (values.image) {
          myFormData.append("image", values.image);
        }

        if (editingPost) {

          const config = {
            url: `https://route-posts.routemisr.com/posts/${editingPost._id}`,
            method: "PUT",

            headers: {
              authorization: `Bearer ${token}`,
            },

            data: myFormData,
          };

          const { data } = await axios.request(config);

          console.log("UPDATE POST:", data);

          if (data.success) {

            toast.success(data.message);

            formik.resetForm();
            setImagePreview(null);

            if (onEditDone) {
              onEditDone();
            }

            if (onPostCreated) {
              onPostCreated();
            }
          }

        }
        else {

          const config = {
            url: "https://route-posts.routemisr.com/posts",
            method: "POST",

            headers: {
              authorization: `Bearer ${token}`,
            },

            data: myFormData,
          };

          const { data } = await axios.request(config);

          console.log("CREATE POST:", data);

          if (data.success) {

            toast.success(data.message);

            formik.resetForm();
            setImagePreview(null);

            if (onPostCreated) {
              onPostCreated();
            }
          }
        }

      } catch (error) {

        console.log("POST ERROR:", error);

        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
      }
    },
  });


  useEffect(() => {

    if (editingPost) {

      formik.setValues({
        body: editingPost.body || "",
        image: null,
      });

      setImagePreview(editingPost.image || null);

    } else {

      formik.resetForm();
      setImagePreview(null);

    }

  }, [editingPost]);


  return (

    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">

      <form onSubmit={formik.handleSubmit}>


        <div className="flex gap-3">

          <img
            src={userInfo?.photo}
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />

          <textarea
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="flex-1 min-w-0 bg-gray-100 rounded-2xl px-4 sm:px-5 py-3 text-gray-700 text-sm outline-none resize-none"
            placeholder="What's on your mind?"
            rows="3"
          />

        </div>


        {ImagePreview && (

          <div className="relative mt-4">

            <img
              src={ImagePreview}
              alt="Post preview"
              className="w-full max-h-100 object-cover rounded-xl border border-gray-200"
            />

            <button
              type="button"
              onClick={() => {

                setImagePreview(null);
                formik.setFieldValue("image", null);

              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 cursor-pointer"
            >
              ✕
            </button>

          </div>

        )}



        <div className="border-t border-gray-200 mt-4 pt-3 flex flex-wrap justify-around gap-1">


          <label className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">

            📷

            <span>Photo</span>

            <input
              type="file"
              name="image"
              className="hidden"
              accept="image/*"
              onChange={(e) => {

                const imageFile = e.currentTarget.files[0];

                if (!imageFile) return;

                formik.setFieldValue("image", imageFile);

                const imageUrl =URL.createObjectURL(imageFile);
                setImagePreview(imageUrl);

              }}
            />

          </label>

          <button
            type="submit"
            className="bg-amber-400 text-white text-sm font-medium px-6 rounded-lg hover:bg-amber-500 transition cursor-pointer"
          >
            {editingPost ? "Update" : "Post"}
          </button>

        </div>

      </form>

    </div>

  );
}