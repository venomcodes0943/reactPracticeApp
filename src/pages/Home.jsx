import React, { useEffect, useState } from "react";
import postService from "../services/postsService";
import PostCard from "../components/PostCard";
import Loader from "../pages/Loader";
const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDocuments() {
      try {
        const docs = await postService.getAllPosts();
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);
  console.log(documents);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap items-base gap-3 justify-center md:justify-start md:px-10 md:mt-5">
      {documents.map((doc) => (
        <PostCard
          title={doc.title}
          content={doc.content}
          slug={doc.slug}
          image={doc.image}
          date={new Date(doc.createdAt.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      ))}
    </div>
  );
};

export default Home;
