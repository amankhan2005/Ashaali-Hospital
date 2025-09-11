 import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controllers.js";

const router = express.Router();

// CRUD Routes
router.post("/add", createBlog);             // Create
router.get("/", getBlogs);                   // Read all
router.get("/:slug", getBlogBySlug);        // Read one
router.put("/update/:id", updateBlog);      // Update
router.delete("/delete/:id", deleteBlog);   // Delete

export default router;
