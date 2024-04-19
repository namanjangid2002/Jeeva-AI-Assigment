import express from "express";
import { createUnit, getLastSubmission } from "../controllers/form.js";
import upload from "../upload.js";
const router = express.Router();

router.post("/new", upload.single("soundFile"), createUnit);
router.get("/submission", getLastSubmission);

export default router;