import { Router } from "express";
import ocrRoute from "./ocrRoute";

const router = Router();
router.use("/ocr", ocrRoute);

export default router;
