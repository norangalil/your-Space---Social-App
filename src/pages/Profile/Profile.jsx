import {
  Camera,
  Edit3,
  MoreHorizontal,
  Users,
  CalendarDays,
  Mail,
  Link as LinkIcon,
  Grid3X3,
  Info,
  Heart,
  MessageCircle,
  Share2,
  Image,
} from "lucide-react";

import { userContext } from "../context/user.context";
import { useContext, useEffect, useState } from "react";
import PostForm from "../../components/PostForm/PostForm";
import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";

export default function Profile() {
  const { userInfo, token } = useContext(userContext);

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const getUserPosts = async () => {
    try {
      if (!userInfo?._id || !token) return;

      const { data } = await axios.get(
        `https://route-posts.routemisr.com/users/${userInfo._id}/posts`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Userpostts", data);

      setPosts(data?.data?.posts || data?.data || []);
    } catch (error) {
      console.log( error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [userInfo, token]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  
  return (
    <div >

      <div className="w-full ">
        <div className="max-w-5xl mx-auto">

          <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-80 overflow-hidden bg-amber-400 sm:rounded-b-xl">

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-6xl sm:text-8xl font-bold">
                COVER
              </span>
            </div>

            <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 bg-white text-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-md hover:bg-gray-100 transition">
              <Camera size={16} />
              <span className="hidden sm:inline">Edit Cover</span>
            </button>

          </div>

          <div className="px-4 sm:px-6">
            <div className="relative">

              <div className="flex justify-center sm:justify-start -mt-14 sm:-mt-16 md:-mt-20">
                <div className="relative">

                  <img
                    src={userInfo.photo}
                    alt={userInfo.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                  />

                  <button className="absolute bottom-1 right-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center hover:bg-gray-300 transition">
                    <Camera size={16} />
                  </button>

                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-4 pt-3 pb-4">

                <div className="flex-1 text-center sm:text-left min-w-0">

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 wrap-break-words">
                    {userInfo.name}
                  </h1>

                  <p className="text-gray-500 mt-1">
                    @{userInfo.username}
                  </p>

                  <div className="flex justify-center sm:justify-start flex-wrap gap-4 mt-3 text-sm text-gray-500">

                    <span className="flex items-center gap-1.5">
                      <Users size={16} />
                      {userInfo.followersCount} Followers
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Users size={16} />
                      {userInfo.followingCount} Following
                    </span>

                  </div>

                </div>

                

              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-5 lg:px-6 mt-4 sm:mt-5 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-4 lg:gap-5">

          <aside className="w-full space-y-4">

            <div className="bg-white rounded-xl p-5 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Intro
              </h2>

              <div className="space-y-4">

                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <CalendarDays size={19} className="text-gray-400 shrink-0" />
                  <span>
                    Born{" "}
                    {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <CalendarDays size={19} className="text-gray-400 shrink-0" />
                  <span>
                    Joined{" "}
                    {new Date(userInfo.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <Mail size={19} className="text-gray-400 shrink-0" />
                  <span className="break-all">
                    {userInfo.email}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-gray-600 text-sm">
                  <LinkIcon size={19} className="text-gray-400 shrink-0" />
                  <span>@{userInfo.username}</span>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Profile Stats
              </h2>

              <div className="grid grid-cols-3 text-center">

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {userInfo.followersCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Followers
                  </p>
                </div>

                <div className="border-x border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">
                    {userInfo.followingCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Following
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {userInfo.bookmarksCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Saved
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-xl font-bold text-gray-900">
                  Photos
                </h2>

                <button className="text-sm text-blue-600 hover:underline">
                  See All
                </button>

              </div>

              <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">

                <div className="aspect-square bg-blue-100 flex items-center justify-center">
                  <Image size={22} className="text-blue-300" />
                </div>

                <div className="aspect-square bg-indigo-100 flex items-center justify-center">
                  <Image size={22} className="text-indigo-300" />
                </div>

                <div className="aspect-square bg-purple-100 flex items-center justify-center">
                  <Image size={22} className="text-purple-300" />
                </div>

              </div>

            </div>

          </aside>

      <main 
  className="min-w-0 space-y-4 flex flex-col items-center">

  <div className="w-full max-w-2xl">
    <PostForm
      onPostCreated={getUserPosts}
      editingPost={editingPost}
      onEditDone={() => setEditingPost(null)}
    />
  </div>

  {posts.length > 0 ? (
    posts.map((post) => (
      <PostCard
        key={post._id}
        postDetails={post}
        onEdit={(post) => setEditingPost(post)}
      />
    ))
  ) : (
    <div className="w-full max-w-2xl rounded-xl bg-white p-8 text-center text-gray-500">
      No posts yet.
    </div>
  )}

</main>

        </div>

      </div>

    </div>
  );
}