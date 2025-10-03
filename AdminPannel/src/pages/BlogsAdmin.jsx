 import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import API from "../api/axios";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaImage, FaPen, FaUser, FaTag, FaFileAlt, FaHeading, FaExpand, FaCompress, FaEye, FaCalendar } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from "../components/Footer";


// Memoized blog card component to prevent unnecessary re-renders
const BlogCard = ({ blog, onEdit, onDelete }) => {
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }, []);

  const truncateText = useCallback((text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }, []);

  const handleEdit = useCallback(() => onEdit(blog), [blog, onEdit]);
  const handleDelete = useCallback(() => onDelete(blog._id), [blog._id, onDelete]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
      {/* Optimized Image Container */}
      <div className="h-48 overflow-hidden bg-gray-100 flex-shrink-0 relative">
        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600">
            <FaImage className="text-white text-4xl" />
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
            {blog.category}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <FaCalendar className="mr-1" />
            {formatDate(blog.createdAt || new Date())}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight line-clamp-2">
          {truncateText(blog.title, 60)}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
          {truncateText(blog.excerpt, 120)}
        </p>

        {/* Author Info */}
        <div className="flex items-center text-sm text-teal-600 mb-6 mt-auto">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-3">
            <FaUser className="text-white text-xs" />
          </div>
          <span className="font-semibold truncate">{blog.author}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 text-sm"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 text-sm"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    imageFile: null,
    imagePreview: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const editorContainerRef = useRef(null);

  // Memoized modules and formats to prevent recreation on every render
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
  }), []);

  const formats = useMemo(() => [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'align',
    'link', 'image', 'blockquote', 'code-block'
  ], []);

  // Optimized fetch function with error handling
  const fetchBlogs = useCallback(async () => {
    try {
      const res = await API.get("/api/blogs");
      setBlogs(res.data || []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    fetchBlogs();
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [fetchBlogs]);

  // Optimized form handlers with useCallback
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("author", form.author);
    formData.append("category", form.category);
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      if (editId) {
        await API.put(`/api/blogs/update/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/api/blogs/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ title: "", excerpt: "", content: "", author: "", category: "", imageFile: null, imagePreview: "" });
      setEditId(null);
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error submitting form:", err);
    }

    setLoading(false);
  }, [form, editId, fetchBlogs]);

  const handleEdit = useCallback((blog) => {
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      author: blog.author || "",
      category: blog.category || "",
      imageFile: null,
      imagePreview: blog.image || "",
    });
    setEditId(blog._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await API.delete(`/api/blogs/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }, [fetchBlogs]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, imageFile: file, imagePreview: imageUrl }));
    }
  }, []);

  const cancelEdit = useCallback(() => {
    setForm({ title: "", excerpt: "", content: "", author: "", category: "", imageFile: null, imagePreview: "" });
    setEditId(null);
    setShowForm(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!editorContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      if (editorContainerRef.current.requestFullscreen) {
        editorContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  // Memoized form field handlers
  const handleTitleChange = useCallback((e) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleAuthorChange = useCallback((e) => {
    setForm(prev => ({ ...prev, author: e.target.value }));
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setForm(prev => ({ ...prev, category: e.target.value }));
  }, []);

  const handleExcerptChange = useCallback((e) => {
    setForm(prev => ({ ...prev, excerpt: e.target.value }));
  }, []);

  const handleContentChange = useCallback((value) => {
    setForm(prev => ({ ...prev, content: value }));
  }, []);

  const clearImage = useCallback(() => {
    setForm(prev => ({ ...prev, imageFile: null, imagePreview: "" }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simplified Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl mb-6 shadow-lg">
            <FaFileAlt className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Blog Management Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create and manage healthcare articles with rich content
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-10 text-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-2xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
            >
              <FaPlus className="text-xl" />
              Create New Article
            </button>
          ) : (
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gray-600 text-white font-semibold rounded-2xl hover:bg-gray-700 transition-all duration-200 shadow-lg"
            >
              <FaTimes className="text-xl" />
              Cancel {editId ? 'Edit' : 'Creation'}
            </button>
          )}
        </div>

        {/* Optimized Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                  <FaPen className="text-white text-lg" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {editId ? "Edit Article" : "Create New Article"}
                </h2>
              </div>
              {editId && (
                <span className="px-6 py-3 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  Editing Mode
                </span>
              )}
            </div>

            <div className="space-y-8">
              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FaHeading className="mr-2 text-teal-500" />
                      Article Title
                    </label>
                    <input
                      required
                      placeholder="Enter captivating article title..."
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={form.title}
                      onChange={handleTitleChange}
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FaUser className="mr-2 text-teal-500" />
                      Author
                    </label>
                    <input
                      required
                      placeholder="Author name..."
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                      value={form.author}
                      onChange={handleAuthorChange}
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <FaTag className="mr-2 text-teal-500" />
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800"
                      value={form.category}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Health Tips">Health Tips</option>
                      <option value="Medical News">Medical News</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Treatment">Treatment</option>
                      <option value="Prevention">Prevention</option>
                      <option value="Research">Research</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Article Excerpt
                  </label>
                  <textarea
                    required
                    placeholder="Brief description that will appear in blog previews..."
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                    rows={8}
                    value={form.excerpt}
                    onChange={handleExcerptChange}
                    maxLength={300}
                  />
                  <div className="text-right text-sm text-teal-600 mt-2 font-medium">
                    {form.excerpt.length}/300 characters
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Featured Image
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-teal-300 rounded-2xl cursor-pointer bg-teal-50 hover:bg-teal-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaImage className="w-12 h-12 mb-4 text-teal-500" />
                        <p className="mb-2 text-sm text-gray-600 text-center font-medium">
                          <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.imagePreview && (
                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={form.imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Article Content
                  </label>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-teal-600 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors duration-200 font-medium"
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
                  </button>
                </div>
                <div 
                  ref={editorContainerRef}
                  className={`bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-colors duration-200 hover:border-teal-300 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6' : ''}`}
                >
                  {isClient ? (
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={handleContentChange}
                      modules={modules}
                      formats={formats}
                      placeholder="Write your article content here... Use the toolbar above for formatting options."
                      style={{ 
                        height: isFullscreen ? 'calc(100vh - 140px)' : '400px',
                        fontFamily: 'inherit'
                      }}
                    />
                  ) : (
                    <textarea
                      placeholder="Write your article content here..."
                      className="w-full px-4 py-4 bg-white border-0 rounded-2xl focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none"
                      rows={12}
                      value={form.content}
                      onChange={handleContentChange}
                    />
                  )}
                  {isFullscreen && (
                    <div className="absolute top-6 right-6">
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-teal-700 transition shadow-lg"
                      >
                        <FaCompress className="mr-2" /> Exit Fullscreen
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editId ? 'Updating...' : 'Publishing...'}
                    </>
                  ) : editId ? (
                    <>
                      <FaSave className="mr-3" /> Update Article
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-3" /> Publish Article
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 sm:flex-initial px-8 py-4 bg-gray-600 text-white rounded-2xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg"
                >
                  <FaTimes className="mr-3" /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Published Articles Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FaFileAlt className="text-gray-800 text-lg" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Published Articles</h2>
                <p className="text-gray-600 font-medium">Manage your healthcare content</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold">
              <FaFileAlt />
              {blogs.length} Article{blogs.length !== 1 ? 's' : ''}
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6">
                <FaFileAlt className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Articles Published Yet</h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                Start creating valuable healthcare content for your readers. Click the button above to write your first article.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
              >
                <FaPlus />
                Write Your First Article
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            
          )}
        </div>
            {/* Footer */}
                          <div className="container flex justify-center fixed bottom-0 left-0 text-white ">
                            <Footer />
                          </div>
      </div>
      
    </div>
  );
};

export default BlogsAdmin;