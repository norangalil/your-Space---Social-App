import  { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/user.context';
import axios from 'axios';
import PostCard from '../../components/PostCard/PostCard';
import PostForm from '../../components/PostForm/PostForm';

export default function Home() {

const [posts , setPost] = useState(null)
const [editingPost, setEditingPost] = useState(null)
const {token} = useContext(userContext)



async function getHomeFeed() {
  try {
    const options = {
      url: "https://route-posts.routemisr.com/posts",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.request(options);
    console.log(data.data.posts)

setPost(data.data.posts);
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("ERROR:", error.response?.data);
  }

 
}

useEffect(() => {
  if (token) {
    getHomeFeed();
  }
}, [token]);



  return (
    <>
    <PostForm
  editingPost={editingPost}
  onPostCreated={getHomeFeed}
  onEditDone={() => setEditingPost(null)}
/>
    {posts? <div className="w-full flex flex-col items-center gap-5"> { posts.map((post) =>
 <PostCard 
  key={post._id}
  postDetails={post}
  onEdit={(post) => setEditingPost(post)}
  
/>
)} </div> : <h2> Loading </h2>}
    </>
  )
}
