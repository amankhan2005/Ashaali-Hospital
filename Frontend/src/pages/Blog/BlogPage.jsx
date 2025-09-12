 import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceBreadcums from "../service/ServiceBrad";
import blogbread from "../../assets/service-breas/blogbead.jpg";

const API_URL = import.meta.env.VITE_API_URL;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Slug fallback (optional, just in case)
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();

        // Ensure each blog has a slug
        const blogsWithSlug = data.map((post) => ({
          ...post,
          slug: post.slug || slugify(post.title),
        }));

        setBlogs(blogsWithSlug);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  const handleReadMore = (post) => {
    navigate(`/blogs/${post.slug}`); // ✅ navigate using slug
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blogs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ServiceBreadcums items={breadcrumbItems} headText="Blogs" image={blogbread} />

      <div className="container mx-auto xl:px-10 lg:px-6 px-2 py-12">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <div key={post._id} className="px-2 h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:p-5 p-3 flex flex-col h-60">
                    <h2 className="text-lg font-bold text-[#18978d] mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-900 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button
                      onClick={() => handleReadMore(post)}
                      className="mt-auto text-[#18978d] font-medium flex items-center text-sm hover:underline transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
