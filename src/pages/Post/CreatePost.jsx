import React, { useRef, useState } from "react";
import postService from "../../services/postsService";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(image);
    if (!title || !slug || !image) {
      setMessage("Please fill all fields and select an image.");
      setIsSubmitting(false);
      return;
    }
    try {
      await postService.addNewPost(title, slug, "", image);
      setMessage("Post added successfully!");
    } catch (error) {
      setMessage(`Failed to add post: ${error.message}`);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
      setTitle("");
      setSlug("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md shadow-lg max-w-xl mx-auto mt-6 px-4 md:px-6 py-2 bg-base-200"
    >
      <div className="text-red-500 font-bold text-center">
        {message && message}
      </div>
      <div className="mb-2 mx-auto mt-4">
        <label htmlFor="title" className="cursor-pointer block pb-1 font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="input input-bordered input-sm w-full rounded-md mt-1"
        />
      </div>
      <div className="mb-2 mx-auto mt-4">
        <label htmlFor="Slug" className="cursor-pointer block pb-1 font-bold">
          Slug:
        </label>
        <input
          type="text"
          id="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter Slug"
          className="input input-bordered input-sm w-full rounded-md mt-1"
        />
      </div>
      <div className="mb-2 mx-auto mt-4">
        <label htmlFor="image" className="cursor-pointer block pb-1 font-bold">
          Feature Image:
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="file-input file-input-bordered w-full file-input-sm rounded-md"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-info btn-sm"
        >
          {isSubmitting ? "Adding Post..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
