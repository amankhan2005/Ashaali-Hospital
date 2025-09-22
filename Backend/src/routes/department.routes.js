 import express from "express";
import { getDepartments, addDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controllers.js";

const router = express.Router();
router.get("/", getDepartments);
router.post("/", addDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
