import express from "express";
import {
  createProjetController,
  getVideoById,
  incrementViewCountByOneController,
  incrementLikeCountByOneController,
  decrementLikeCountByOneController,
  getAllProjetsController,
  getProjetsByTagsController,
} from "../controllers/projetController";
import { getVideosFromUser } from "../controllers/projetController";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post("/", authenticate, createProjetController);
router.get("/", getAllProjetsController);
router.get("/user/:id", getVideosFromUser);
router.get("/recommended", getProjetsByTagsController);
router.get("/:id", getVideoById);
router.put("/view/:id", incrementViewCountByOneController);
router.put("/like/:id", incrementLikeCountByOneController);
router.put("/dislike/:id", decrementLikeCountByOneController);


export default router;
