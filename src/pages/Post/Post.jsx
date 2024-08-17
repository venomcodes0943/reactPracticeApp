import React, { useEffect, useState } from "react";
import postService from "../../services/postsService";
import Loader from "../Loader";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const myPost = await postService.getSingleDoc(slug);
        setPost(myPost);
      } catch (error) {
        console.error("Failed to fetch post:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <Loader />;
  }

  if (post === null) {
    return <NotFound />;
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
      <div
        className="mt-4 text-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default Post;
