 import express from "express";
import { createBlog, updateBlog, deleteBlog, getBlogs } from "../controllers/blog.controllers.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/add", upload.single("image"), createBlog);
router.put("/update/:id", upload.single("image"), updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
