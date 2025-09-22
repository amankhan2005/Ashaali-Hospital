//  import { useState, useEffect } from "react";
// import API from "../api/axios";

// const BlogsAdmin = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     author: "",
//     category: "",
//     imageFile: null,  // File from computer
//     imagePreview: "", // Preview URL
//   });
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchBlogs = async () => {
//     const res = await API.get("/api/blogs");
//     setBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("excerpt", form.excerpt);
//     formData.append("content", form.content);
//     formData.append("author", form.author);
//     formData.append("category", form.category);
//     if (form.imageFile) formData.append("image", form.imageFile);

//     try {
//       if (editId) {
//         await API.put(`/api/blogs/update/${editId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await API.post("/api/blogs/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setForm({ title: "", excerpt: "", content: "", author: "", category: "", imageFile: null, imagePreview: "" });
//       setEditId(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   const handleEdit = (blog) => {
//     setForm({
//       title: blog.title,
//       excerpt: blog.excerpt,
//       content: blog.content,
//       author: blog.author,
//       category: blog.category,
//       imageFile: null,
//       imagePreview: blog.image,
//     });
//     setEditId(blog._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     await API.delete(`/api/blogs/delete/${id}`);
//     fetchBlogs();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

//       <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-2">
//         <input placeholder="Title" className="border p-2 w-full" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
//         <input placeholder="Excerpt" className="border p-2 w-full" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
//         <input placeholder="Author" className="border p-2 w-full" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
//         <input placeholder="Category" className="border p-2 w-full" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
//         <textarea placeholder="Content" className="border p-2 w-full" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />

//         {/* Image Upload */}
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         {form.imagePreview && <img src={form.imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded mt-2" />}

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
//           {loading ? "Saving..." : editId ? "Update Blog" : "Add Blog"}
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {blogs.map(blog => (
//           <div key={blog._id} className="bg-white shadow p-4 rounded">
//             {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded mb-2" />}
//             <h3 className="font-bold">{blog.title}</h3>
//             <p className="text-sm">{blog.excerpt}</p>
//             <p className="text-xs italic">{blog.author}</p>
//             <div className="flex gap-2 mt-2">
//               <button className="text-blue-600" onClick={() => handleEdit(blog)}>Edit</button>
//               <button className="text-red-600" onClick={() => handleDelete(blog._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogsAdmin;

// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaImage, FaPen, FaUser, FaTag, FaFileAlt, FaHeading } from "react-icons/fa";

// const BlogsAdmin = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     author: "",
//     category: "",
//     imageFile: null,  // File from computer
//     imagePreview: "", // Preview URL
//   });
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchBlogs = async () => {
//     const res = await API.get("/api/blogs");
//     setBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("excerpt", form.excerpt);
//     formData.append("content", form.content);
//     formData.append("author", form.author);
//     formData.append("category", form.category);
//     if (form.imageFile) formData.append("image", form.imageFile);

//     try {
//       if (editId) {
//         await API.put(`/api/blogs/update/${editId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await API.post("/api/blogs/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setForm({ title: "", excerpt: "", content: "", author: "", category: "", imageFile: null, imagePreview: "" });
//       setEditId(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   const handleEdit = (blog) => {
//     setForm({
//       title: blog.title,
//       excerpt: blog.excerpt,
//       content: blog.content,
//       author: blog.author,
//       category: blog.category,
//       imageFile: null,
//       imagePreview: blog.image,
//     });
//     setEditId(blog._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     await API.delete(`/api/blogs/delete/${id}`);
//     fetchBlogs();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
//             <FaFileAlt className="text-white text-3xl" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Blog Management
//           </h1>
//           <p className="text-lg text-teal-200 max-w-2xl mx-auto">
//             Create, edit, and manage your healthcare blog content
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Blog Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-500/20">
//               <div className="flex items-center mb-6">
//                 <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {editId ? "Edit Blog" : "Add New Blog"}
//                 </h2>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Blog Title
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaHeading className="text-teal-400" />
//                     </div>
//                     <input
//                       placeholder="Enter blog title"
//                       className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                       value={form.title}
//                       onChange={e => setForm({ ...form, title: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Excerpt
//                   </label>
//                   <textarea
//                     placeholder="Brief description"
//                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                     rows={3}
//                     value={form.excerpt}
//                     onChange={e => setForm({ ...form, excerpt: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Author
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaUser className="text-teal-400" />
//                     </div>
//                     <input
//                       placeholder="Author name"
//                       className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                       value={form.author}
//                       onChange={e => setForm({ ...form, author: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Category
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaTag className="text-teal-400" />
//                     </div>
//                     <input
//                       placeholder="Blog category"
//                       className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                       value={form.category}
//                       onChange={e => setForm({ ...form, category: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Content
//                   </label>
//                   <textarea
//                     placeholder="Blog content"
//                     className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-white placeholder-slate-400"
//                     rows={6}
//                     value={form.content}
//                     onChange={e => setForm({ ...form, content: e.target.value })}
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-teal-200 mb-1">
//                     Blog Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer bg-slate-700/50 hover:bg-slate-700/70 transition">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FaImage className="w-8 h-8 mb-2 text-teal-400" />
//                         <p className="text-sm text-slate-400">
//                           <span className="font-semibold text-teal-300">Click to upload</span> or drag and drop
//                         </p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {form.imagePreview && (
//                     <div className="mt-4 overflow-hidden rounded-xl">
//                       <img
//                         src={form.imagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-xl shadow-lg"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition shadow-lg"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : editId ? (
//                     <>
//                       <FaSave className="mr-2" /> Update Blog
//                     </>
//                   ) : (
//                     <>
//                       <FaPlus className="mr-2" /> Add Blog
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Blogs List */}
//           <div className="lg:col-span-2">
//             <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-teal-500/20">
//               <div className="flex items-center mb-6">
//                 <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-white">
//                   All Blogs
//                 </h2>
//               </div>

//               {blogs.length === 0 ? (
//                 <div className="text-center py-12 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border-2 border-dashed border-teal-500/20">
//                   <FaFileAlt className="mx-auto text-4xl text-teal-400 mb-3" />
//                   <p className="text-lg text-slate-300">No blogs found.</p>
//                   <p className="text-slate-400 mt-1">Create your first blog using the form.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {blogs.map(blog => (
//                     <div
//                       key={blog._id}
//                       className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl shadow-xl overflow-hidden border border-teal-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//                     >
//                       {blog.image && (
//                         <div className="h-48 overflow-hidden">
//                           <img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                           />
//                         </div>
//                       )}
//                       <div className="p-5">
//                         <div className="flex items-center mb-3">
//                           <span className="inline-block bg-gradient-to-r from-teal-600 to-cyan-700 text-white text-xs px-3 py-1 rounded-full font-medium">
//                             {blog.category}
//                           </span>
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-2">
//                           {blog.title}
//                         </h3>
//                         <p className="text-slate-300 mb-4 line-clamp-3">
//                           {blog.excerpt}
//                         </p>
//                         <div className="flex items-center text-sm text-teal-200 mb-4">
//                           <FaUser className="mr-2" />
//                           {blog.author}
//                         </div>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(blog)}
//                             className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-lg font-medium hover:from-yellow-700 hover:to-amber-800 transition shadow"
//                           >
//                             <FaEdit className="mr-1" /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(blog._id)}
//                             className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-rose-800 transition shadow"
//                           >
//                             <FaTrash className="mr-1" /> Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogsAdmin;

// import { useState, useEffect } from "react";
// import API from "../api/axios";
// import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaImage, FaPen, FaUser, FaTag, FaFileAlt, FaHeading } from "react-icons/fa";

// const BlogsAdmin = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     excerpt: "",
//     content: "",
//     author: "",
//     category: "",
//     imageFile: null,  // File from computer
//     imagePreview: "", // Preview URL
//   });
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchBlogs = async () => {
//     const res = await API.get("/api/blogs");
//     setBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("excerpt", form.excerpt);
//     formData.append("content", form.content);
//     formData.append("author", form.author);
//     formData.append("category", form.category);
//     if (form.imageFile) formData.append("image", form.imageFile);

//     try {
//       if (editId) {
//         await API.put(`/api/blogs/update/${editId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await API.post("/api/blogs/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       setForm({ title: "", excerpt: "", content: "", author: "", category: "", imageFile: null, imagePreview: "" });
//       setEditId(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   const handleEdit = (blog) => {
//     setForm({
//       title: blog.title,
//       excerpt: blog.excerpt,
//       content: blog.content,
//       author: blog.author,
//       category: blog.category,
//       imageFile: null,
//       imagePreview: blog.image,
//     });
//     setEditId(blog._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     await API.delete(`/api/blogs/delete/${id}`);
//     fetchBlogs();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-4 shadow-xl">
//             <FaFileAlt className="text-white text-3xl" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             Blog Management
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Create, edit, and manage your healthcare blog content
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Blog Form */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-transform hover:scale-105">
//               <div className="flex items-center mb-6">
//                 <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {editId ? "Edit Blog" : "Add New Blog"}
//                 </h2>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Blog Title
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaHeading className="text-teal-500" />
//                     </div>
//                     <input
//                       placeholder="Enter blog title"
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
//                       value={form.title}
//                       onChange={e => setForm({ ...form, title: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Excerpt
//                   </label>
//                   <textarea
//                     placeholder="Brief description"
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
//                     rows={3}
//                     value={form.excerpt}
//                     onChange={e => setForm({ ...form, excerpt: e.target.value })}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Author
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaUser className="text-teal-500" />
//                     </div>
//                     <input
//                       placeholder="Author name"
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
//                       value={form.author}
//                       onChange={e => setForm({ ...form, author: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <FaTag className="text-teal-500" />
//                     </div>
//                     <input
//                       placeholder="Blog category"
//                       className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
//                       value={form.category}
//                       onChange={e => setForm({ ...form, category: e.target.value })}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Content
//                   </label>
//                   <textarea
//                     placeholder="Blog content"
//                     className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400"
//                     rows={6}
//                     value={form.content}
//                     onChange={e => setForm({ ...form, content: e.target.value })}
//                   />
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Blog Image
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FaImage className="w-8 h-8 mb-2 text-teal-500" />
//                         <p className="text-sm text-gray-500">
//                           <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
//                         </p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   {form.imagePreview && (
//                     <div className="mt-4 overflow-hidden rounded-xl">
//                       <img
//                         src={form.imagePreview}
//                         alt="Preview"
//                         className="w-full h-48 object-cover rounded-xl shadow-lg"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition shadow-md hover:shadow-lg"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Saving...
//                     </>
//                   ) : editId ? (
//                     <>
//                       <FaSave className="mr-2" /> Update Blog
//                     </>
//                   ) : (
//                     <>
//                       <FaPlus className="mr-2" /> Add Blog
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Blogs List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-transform hover:scale-[1.01]">
//               <div className="flex items-center mb-6">
//                 <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-4"></div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   All Blogs
//                 </h2>
//               </div>

//               {blogs.length === 0 ? (
//                 <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//                   <FaFileAlt className="mx-auto text-4xl text-teal-500 mb-3" />
//                   <p className="text-lg text-gray-700">No blogs found.</p>
//                   <p className="text-gray-500 mt-1">Create your first blog using the form.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {blogs.map(blog => (
//                     <div
//                       key={blog._id}
//                       className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//                     >
//                       {blog.image && (
//                         <div className="h-48 overflow-hidden">
//                           <img
//                             src={blog.image}
//                             alt={blog.title}
//                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                           />
//                         </div>
//                       )}
//                       <div className="p-5">
//                         <div className="flex items-center mb-3">
//                           <span className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs px-3 py-1 rounded-full font-medium">
//                             {blog.category}
//                           </span>
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-800 mb-2">
//                           {blog.title}
//                         </h3>
//                         <p className="text-gray-600 mb-4 line-clamp-3">
//                           {blog.excerpt}
//                         </p>
//                         <div className="flex items-center text-sm text-teal-600 mb-4">
//                           <FaUser className="mr-2" />
//                           {blog.author}
//                         </div>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(blog)}
//                             className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-amber-700 transition shadow-sm"
//                           >
//                             <FaEdit className="mr-1" /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(blog._id)}
//                             className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-rose-700 transition shadow-sm"
//                           >
//                             <FaTrash className="mr-1" /> Delete
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogsAdmin;


 import { useState, useEffect, useRef } from "react";
import API from "../api/axios";
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaImage, FaPen, FaUser, FaTag, FaFileAlt, FaHeading, FaExpand, FaCompress } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const editorContainerRef = useRef(null);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

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
      console.error("Error submitting form:", err);
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
    try {
      await API.delete(`/api/blogs/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  const toggleFullscreen = () => {
    if (!editorContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      if (editorContainerRef.current.requestFullscreen) {
        editorContainerRef.current.requestFullscreen();
      } else if (editorContainerRef.current.webkitRequestFullscreen) {
        editorContainerRef.current.webkitRequestFullscreen();
      } else if (editorContainerRef.current.msRequestFullscreen) {
        editorContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mb-3 sm:mb-4 shadow-xl">
            <FaFileAlt className="text-white text-xl sm:text-2xl lg:text-3xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
            Blog Management
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Create, edit, and manage your healthcare blog content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {/* Blog Form */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 transform transition-transform hover:scale-[1.02] w-full">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editId ? "Edit Blog" : "Add New Blog"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaHeading className="text-teal-500" />
                    </div>
                    <input
                      placeholder="Enter blog title"
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    placeholder="Brief description"
                    className="w-full px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                    rows={3}
                    value={form.excerpt}
                    onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-teal-500" />
                    </div>
                    <input
                      placeholder="Author name"
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="text-teal-500" />
                    </div>
                    <input
                      placeholder="Blog category"
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="text-xs sm:text-sm text-teal-600 hover:text-teal-800 flex items-center"
                    >
                      {isFullscreen ? <FaCompress className="mr-1" /> : <FaExpand className="mr-1" />}
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
                  </div>
                  <div 
                    ref={editorContainerRef}
                    className={`bg-white border border-gray-300 rounded-lg sm:rounded-xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'mb-16'}`}
                  >
                    {isClient ? (
                      <ReactQuill
                        theme="snow"
                        value={form.content}
                        onChange={value => setForm({ ...form, content: value })}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog content here..."
                        style={{ height: isFullscreen ? 'calc(100vh - 60px)' : '200px' }}
                      />
                    ) : (
                      <textarea
                        placeholder="Write your blog content here..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                        rows={8}
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                      />
                    )}
                    {isFullscreen && (
                      <div className="absolute top-4 right-4">
                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition shadow-md"
                        >
                          <FaCompress className="mr-2" /> Exit Fullscreen
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaImage className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-teal-500" />
                        <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                          <span className="font-semibold text-teal-600">Click to upload</span> or drag and drop
                        </p>
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
                    <div className="mt-4 overflow-hidden rounded-lg sm:rounded-xl">
                      <img
                        src={form.imagePreview}
                        alt="Preview"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg sm:rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg sm:rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : editId ? (
                    <>
                      <FaSave className="mr-2" /> Update Blog
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-2" /> Add Blog
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Blogs List */}
          <div className="lg:col-span-2 w-full">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 transform transition-transform hover:scale-[1.01] w-full">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-3 sm:mr-4"></div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  All Blogs
                </h2>
              </div>

              {blogs.length === 0 ? (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300">
                  <FaFileAlt className="mx-auto text-3xl sm:text-4xl text-teal-500 mb-3" />
                  <p className="text-base sm:text-lg text-gray-700">No blogs found.</p>
                  <p className="text-gray-500 mt-1 text-sm sm:text-base">Create your first blog using the form.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {blogs.map(blog => (
                    <div
                      key={blog._id}
                      className="bg-white rounded-lg sm:rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full"
                    >
                      {blog.image && (
                        <div className="h-40 sm:h-48 overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center mb-3">
                          <span className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs px-3 py-1 rounded-full font-medium truncate max-w-[150px]">
                            {blog.category}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center text-sm sm:text-base text-teal-600 mb-4">
                          <FaUser className="mr-2 flex-shrink-0" />
                          <span className="truncate">{blog.author}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-medium hover:from-yellow-600 hover:to-amber-700 transition shadow-sm text-sm sm:text-base"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-rose-700 transition shadow-sm text-sm sm:text-base"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAdmin;