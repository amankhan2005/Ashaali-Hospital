 import Blog from "../models/blog.models.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category } = req.body;

    if (!title || !excerpt || !content || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      author,
      category,
      image: imageUrl,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category } = req.body;

    const updateData = { title, excerpt, content, author, category };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      updateData.image = result.secure_url;
    }

    if (title) {
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
