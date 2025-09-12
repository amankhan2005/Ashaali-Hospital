 import { useState, useEffect } from "react";
import API from "../api/axios";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    imageFile: null,  // File from computer
    imagePreview: "", // Preview URL
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    const res = await API.get("/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
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
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      imageFile: null,
      imagePreview: blog.image,
    });
    setEditId(blog._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await API.delete(`/api/blogs/delete/${id}`);
    fetchBlogs();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-2">
        <input placeholder="Title" className="border p-2 w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Excerpt" className="border p-2 w-full" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
        <input placeholder="Author" className="border p-2 w-full" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Category" className="border p-2 w-full" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <textarea placeholder="Content" className="border p-2 w-full" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />

        {/* Image Upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {form.imagePreview && <img src={form.imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded mt-2" />}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          {loading ? "Saving..." : editId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow p-4 rounded">
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded mb-2" />}
            <h3 className="font-bold">{blog.title}</h3>
            <p className="text-sm">{blog.excerpt}</p>
            <p className="text-xs italic">{blog.author}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-blue-600" onClick={() => handleEdit(blog)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;
