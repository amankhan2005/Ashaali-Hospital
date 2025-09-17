 import { useState, useEffect } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BlogDetails = () => {
  const [currentPost, setCurrentPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { detail } = useParams(); // detail = slug

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all blogs
        const resAll = await fetch(`${API_URL}/api/blogs`);
        const allBlogs = await resAll.json();

        // Find the blog with matching slug
        const blog = allBlogs.find((b) => b.slug === detail);
        setCurrentPost(blog);

        // Set recent posts excluding current
        const recent = allBlogs.filter((b) => b.slug !== detail);
        setRecentPosts(recent);

        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [detail]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (!currentPost) return <div className="text-center py-10">Blog not found.</div>;

  return (
    <div className="bg-gray-50 w-full">
      <main className="w-full mx-auto lg:px-10 px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="py-4 px-4 md:px-6">
                <h1 className="text-[#18978d] text-xl md:text-4xl text-center md:text-justify font-extrabold mb-4">
                  {currentPost.title}
                </h1>
                <p className="text-gray-600 mb-4 text-center md:text-justify font-medium">
                  <span>Author: {currentPost.author}</span> |{" "}
                  <span>Category: {currentPost.category}</span>
                </p>
                <div className="prose max-w-none text-center md:text-justify">
                  <p>{currentPost.content}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[20rem] flex flex-col gap-6">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md lg:p-6">
              <h3 className="font-semibold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/blogs/${post.slug}`)}
                    className="flex gap-3 cursor-pointer group"
                  >
                    <div className="w-20 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm group-hover:text-[#3F8BA1] line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-xs mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Box */}
            <div className="bg-[#18978d] rounded-lg p-6 text-white">
              <div className="flex justify-center mb-4">
                <MessageCircleQuestion size={48} />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Need help?</h2>
              <p className="text-center text-sm mb-4">
                Schedule your consultation today. Contact us now!
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-white text-[#3F8BA1] rounded-full px-4 py-2 flex items-center"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                  <span className="ml-2 bg-[#3F8BA1] rounded-full p-1 text-white">
                    <MessageCircleQuestion size={16} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
