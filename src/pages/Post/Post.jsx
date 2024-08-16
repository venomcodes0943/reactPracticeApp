import React, { useEffect, useState } from "react";
import postService from "../../services/postsService";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const myPost = await postService.getSingleDoc(slug);
        setPost(myPost);
      } catch (error) {
        console.error("Failed to fetch post:", error.message);
      }
    };
    fetchPost();
  }, [slug]);
  console.log(post);

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="md:px-10 mt-5 max-w-4xl mx-auto">
      <figure>
        <img
          src={post.image}
          className="rounded-lg shadow-lg"
          alt="postImage"
        />
      </figure>
      <div className="flex items-center justify-between mt-3">
        <div className="text-3xl">{post.title}</div>
        <div className="text-xl">
          {new Date(post.createdAt.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="mt-4 text-xl">{post.content}</div>
    </div>
  );
};

export default Post;
