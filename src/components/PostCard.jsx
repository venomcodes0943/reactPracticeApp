import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ title, content, date, slug, image }) => {
  return (
    <Link to={`/post/${slug}`} className="w-72 rounded-md shadow-xl">
      <figure className="p-4">
        <img className="rounded-lg w-96 h-auto" src={image} alt="Shoes" />
      </figure>
      <div className="mt-2 px-3 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-2xl font-bold">{title}</div>
          <div>{date}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
