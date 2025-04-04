import {
  createComment,
  getAllCommentsByProjet,
  getAllCommentsByUserId,
  getCommentById,
  getAllRepliesByCommentId,
  deleteComment,
} from "../services/commentService";
import { getProjetById } from "../services/projetService";

export const createCommentController = async (req: any, res: any) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log(req.body);

  const projetId = req.body.projetId;
  if (!projetId) {
    return res.status(400).json({ error: "Project id is required" });
  }
  const projet = await getProjetById(projetId);
  if (!projet) {
    return res.status(404).json({ error: "Project not found" });
  }

  const comment = req.body;
  comment.projet = projet;
  comment.author = req.user;

  if (comment.parentComment) {
    const parentComment = await getCommentById(comment.parentComment);
    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" });
    }
    comment.parentComment = parentComment;
  }
  try {
    const newComment = await createComment(comment);
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllCommentsByProjetController = async (req: any, res: any) => {
  const projetId = req.params.id;
  if (!projetId) {
    return res.status(400).json({ error: "Project id is required" });
  }
  try {
    const comments = await getAllCommentsByProjet(projetId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllRepliesByCommentIdController = async (
  req: any,
  res: any
) => {
  const commentId = req.params.id;
  if (!commentId) {
    return res.status(400).json({ error: "Comment id is required" });
  }
  try {
    const replies = await getAllRepliesByCommentId(commentId);
    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllCommentsByUserIdController = async (req: any, res: any) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ error: "User id is required" });
  }
  try {
    const comments = await getAllCommentsByUserId(userId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteCommentController = async (req: any, res: any) => {
    const commentId = req.params.id;
    console.log(req)
    if (!commentId) {
        return res.status(400).json({ error: "Comment id is required" });
    }
    try {
        const deletedComment = await deleteComment(commentId);
        res.status(200).json(deletedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
};
