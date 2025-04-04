import { AppDataSource } from '../config/ormconfig';
import { Comment } from '../models/Comment';

const commentRepository = AppDataSource.getRepository(Comment);

export const createComment = async (data: Partial<Comment>) => {
  const comment = commentRepository.create(data);
  return commentRepository.save(comment);
};

export const getAllCommentsByProjet = async (projetId: number) => {
  return commentRepository.find({ where: { projet: { id: projetId } }, relations: ['author', 'projet', 'parentComment'] });
};

export const getCommentById = async (id: number) => {
  return commentRepository.findOne({ where: { id }, relations: ['author', 'projet', 'parentComment'] });
};

export const getAllCommentsByUserId = async (userId: number) => {
  return commentRepository.find({ where: { author: { id: userId } }, relations: ['author', 'projet', 'parentComment'] });
};

export const getAllRepliesByCommentId = async (commentId: number) => {
  return commentRepository.find({ where: { parentComment: { id: commentId } }, relations: ['author', 'projet', 'parentComment'] });
};

export const deleteComment = async (id: number) => {
  const comment = await commentRepository.findOne({ where: { id }, relations: ['author', 'projet'] });
  if (!comment) throw new Error('Comment not found');
  return commentRepository.remove(comment);
};