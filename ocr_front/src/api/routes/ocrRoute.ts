import { Router } from "express";
import { ocrController } from "../controllers/ocrController";

const router = Router();

router.get("/post", ocrController);

export default router;
