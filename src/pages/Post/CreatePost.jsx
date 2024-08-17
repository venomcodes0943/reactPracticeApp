import React, { useRef, useState } from "react";
import postService from "../../services/postsService";
import { Editor } from "@tinymce/tinymce-react";

const CreatePost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [content, setContent] = useState("");

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    const inpTitle = e.target.value;
    setTitle(inpTitle);
    const generateSlug = inpTitle.toLowerCase().trim().replace(/\s+/g, "-");
    setSlug(generateSlug);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(image);
    if (!title || !slug || !content || !image) {
      setMessage("Please fill all fields and select an image.");
      setIsSubmitting(false);
      return;
    }
    try {
      await postService.addNewPost(title, slug, content, image);
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
      className="rounded-md shadow-lg mx-auto mt-6 px-4 md:px-6 py-2 bg-base-200"
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
          onChange={handleTitleChange}
          placeholder="Enter Title"
          className="input input-bordered input-sm w-full rounded-md mt-1 max-w-lg"
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
          readOnly
          placeholder="Enter Slug"
          className="input input-bordered input-sm w-full rounded-md mt-1 max-w-lg"
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
      <div className="my-3">
        <label
          htmlFor="myContent"
          className="cursor-pointer block pb-1 font-bold"
        >
          Post Content:
        </label>
        <Editor
          id="myContent"
          onEditorChange={handleContentChange}
          apiKey="vf2ht9ns7wzvcla4qtag8vzh8uavi8utpdskc11u5e1itcxu"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code | menu",

            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
        />
      </div>

      <div className="mt-4">
        <button type="submit" disabled={isSubmitting} className="btn btn-info">
          {isSubmitting ? "Adding Post..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
