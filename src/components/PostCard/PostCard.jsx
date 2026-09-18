import React, { useContext, useState } from "react";
import {
  MoreHorizontal,
  Globe,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
 SendHorizontal,
} from "lucide-react";
import { userContext } from "../../pages/context/user.context";
import axios from "axios";
import { toast } from "sonner";

export default function PostCard({ postDetails, onEdit }) {
  const {
    likesCount,
    commentsCount,
    likes,
    id,
    sharesCount,
    image,
    body,
    user,
    createdAt,
    privacy,
  } = postDetails;

  const { token, userInfo } = useContext(userContext);
  const [showMenu, setShowMenu] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentCommentsCount, setCurrentCommentsCount] =useState(commentsCount);
  const [openCommentMenu, setOpenCommentMenu] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");


  async function handleDeletepost() {
    try {
      const config = {
        url: `https://route-posts.routemisr.com/posts/${id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(config);

      if (data.success) {
        toast.success(data.message);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  async function handlelikes() {
    try {
      const config = {
        url: `https://route-posts.routemisr.com/posts/${id}/like`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(config);

      console.log(data);

      setCurrentLikes(data.data.likesCount);
      setLiked(data.data.liked);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleCreateComment() {
    try {
      if (!comment.trim()) return;

      const myFormData = new FormData();

      myFormData.append("content", comment);

      const config = {
        url: `https://route-posts.routemisr.com/posts/${id}/comments`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: myFormData,
      };

      const { data } = await axios.request(config);

      console.log("create comment data", data);

      setComments((oldComments) => [
        ...oldComments,
        data.data.comment,
      ]);

      setCurrentCommentsCount((oldCount) => oldCount + 1);

      setComment("");

      toast.success("Comment added");
    } catch (error) {
      console.log("create comment error", error);
    }
  }


  function handleStartEdit(comment) {
    setEditingCommentId(comment._id);
    setEditCommentText(comment.content);
    setOpenCommentMenu(null);
  }


  function handleCancelEdit() {
    setEditingCommentId(null);
    setEditCommentText("");
  }


async function handleUpdateComment(comment) {
  try {
    if (!editCommentText.trim()) return;

    const myFormData = new FormData();

    myFormData.append("content", editCommentText);

    const config = {
      url: `https://route-posts.routemisr.com/posts/${id}/comments/${comment.id}`,
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: myFormData,
    };

    console.log("Updatee url:", config.url);

    const { data } = await axios.request(config);

    console.log("update comment data:", data);

    const updatedComment = data.data.comment;

    setComments((oldComments) =>
      oldComments.map((item) =>
        item.id === comment.id
          ? updatedComment
          : item
      )
    );

    setEditingCommentId(null);
    setEditCommentText("");

    toast.success("Comment updated");
  } catch (error) {
    console.log("update comment error:", error);
  }
}

  async function handleDeleteComment(comment) {
    try {
      const config = {
        url: `https://route-posts.routemisr.com/posts/${id}/comments/${comment._id}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.request(config);

      console.log("delete comment data", data);

      setComments((oldComments) =>
        oldComments.filter(
          (item) => item._id !== comment._id
        )
      );

      setCurrentCommentsCount((oldCount) =>
        Math.max(0, oldCount - 1)
      );

      setOpenCommentMenu(null);

      toast.success(data.message || "Comment deleted");
    } catch (error) {
      console.log( error);
    }
  }

  return (
    <article className="h-auto w-120 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">


      <div className="flex items-start justify-between px-4 py-3">

        <div className="flex items-center gap-3">

          <img
            src={user.photo}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-sm font-semibold text-gray-900">
                {user.name}
              </h3>

              <span className="text-sm text-gray-400">
                @{user.username}
              </span>

            </div>

            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">

              <span>
                {new Date(createdAt).toLocaleDateString("en-GB")}
              </span>

              <span>•</span>

              <Globe size={13} />

              <span>{privacy}</span>

            </div>

          </div>

        </div>


        <div className="relative">

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100"
          >
            <MoreHorizontal size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 z-50 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">


              {userInfo?._id === user._id && (
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    onEdit(postDetails);
                  }}
                  className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Post
                </button>
              )}


              {userInfo?._id === user._id && (
                <button
                  onClick={handleDeletepost}
                  type="button"
                  className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete Post
                </button>
              )}

            </div>
          )}

        </div>

      </div>


      <div className="px-4 pb-4">

        <p className="text-sm text-gray-700">
          {body}
        </p>

      </div>


      <div className="w-full">

        {image && (
          <img
            src={image}
            alt="Post"
            className="w-full h-95 object-cover"
          />
        )}

      </div>


      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 text-xs text-gray-400">

        <div className="flex items-center gap-1.5">

          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500">

            <Heart
              size={12}
              className="fill-white text-white"
            />

          </div>

          <span>
            {currentLikes}
          </span>

        </div>

        <div className="flex gap-4">

          <span>
            {currentCommentsCount} comments
          </span>

          <span>
            {sharesCount} shares
          </span>

        </div>

      </div>


      <div className="grid grid-cols-4 border-b border-gray-100 px-2 py-1">


        <button
          onClick={handlelikes}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-gray-600 transition hover:bg-gray-100"
        >

          <Heart
            size={20}
            strokeWidth={1.7}
            className={
              liked
                ? "text-red-500"
                : "text-gray-600"
            }
          />

          <span
            className={
              liked
                ? "text-red-500"
                : "text-gray-600"
            }
          >
            Like
          </span>

        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-gray-600 transition hover:bg-gray-100">

          <MessageCircle
            size={20}
            strokeWidth={1.7}
          />

          <span>
            Comment
          </span>

        </button>


        <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-gray-600 transition hover:bg-gray-100">

          <Repeat2
            size={20}
            strokeWidth={1.7}
          />

          <span>
            Share
          </span>

        </button>


        <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-gray-600 transition hover:bg-gray-100">

          <Bookmark
            size={20}
            strokeWidth={1.7}
          />

          <span>
            Save
          </span>

        </button>

      </div>


      {comments.length > 0 && (
        <div className="border-b border-gray-100 px-4 py-3">

          <div className="space-y-4">

            {comments.map((comment) => (

              <div
                key={comment._id}
                className="flex gap-3"
              >


                <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />


                <div className="min-w-0 flex-1">

                  {editingCommentId === comment._id ? (


                    <div className="flex items-center gap-2">

                      <input
                        value={editCommentText}
                        onChange={(e) =>
                          setEditCommentText(e.target.value)
                        }
                        autoFocus
                        className="h-9 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 outline-none focus:border-gray-500"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateComment(comment)
                        }
                        className="rounded-lg bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                      >
                        Cancel
                      </button>

                    </div>

                  ) : (


                    <div>

                      <div className="flex items-start gap-2">


                        <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-2.5">

                          <p className="text-sm font-semibold text-gray-900">
                            {comment.commentCreator.name}
                          </p>

                          <p className="mt-0.5 wrap-break-word text-sm text-gray-700">
                            {comment.content}
                          </p>

                        </div>


                        {userInfo?._id === comment.commentCreator.id && (

                          <div className="relative shrink-0">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenCommentMenu(
                                  openCommentMenu === comment._id
                                    ? null
                                    : comment._id
                                )
                              }
                              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            >
                              <MoreHorizontal size={17} />
                            </button>


                            {openCommentMenu === comment._id && (

                              <div className="absolute right-0 top-8 z-50 w-28 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">


                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStartEdit(comment)
                                  }
                                  className="w-full px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteComment(comment)
                                  }
                                  className="w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                                >
                                  Delete
                                </button>

                              </div>

                            )}

                          </div>

                        )}

                      </div>


                      <div className="mt-1.5 flex items-center gap-3 px-2 text-xs text-gray-400">

                        <span>
                          {new Date(
                            comment.createdAt
                          ).toLocaleDateString("en-GB")}
                        </span>

                        <button
                          type="button"
                          className="font-medium transition hover:text-gray-700"
                        >
                          Like
                        </button>

                        <span>
                          {comment.likesCount || 0} likes
                        </span>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>
      )}


      <div className="flex items-center gap-2 px-4 py-3">


        <img
          src={userInfo?.photo}
          alt="profile"
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />


        <div className="flex flex-1 items-center gap-2">

          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment..."
            className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-500"
          />


          <button
            type="button"
            onClick={handleCreateComment}
            className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-white transition hover:bg-amber-500"
          >
            <SendHorizontal size={17} />
          </button>

        </div>

      </div>

    </article>
  );
}