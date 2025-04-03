import { AppDataSource } from '../config/ormconfig';
import { Tag } from '../models/Tag';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (data: Partial<Tag>) => {
  const tag = tagRepository.create(data);
  return tagRepository.save(tag);
};

export const getTagById = async (id: number) => {
  return tagRepository.findOneBy({ id });
};

export const getAllTags = async () => {
  return tagRepository.find();
};

export const getTagByName = async (name: string) => {
  return tagRepository.findBy({ name: name });
};

export const getUniqueTagByName = async (name: string) => {
  const tags = await tagRepository.findBy({ name: name });
  if (tags.length === 0) return null;
  return tags[0];
};

export const updateTag = async (id: number, data: Partial<Tag>) => {
  const tag = await tagRepository.findOneBy({ id });
  if (!tag) throw new Error('Tag not found');
  Object.assign(tag, data);
  return tagRepository.save(tag);
};

export const deleteTag = async (id: number) => {
  const tag = await tagRepository.findOneBy({ id });
  if (!tag) throw new Error('Tag not found');
  return tagRepository.remove(tag);
};




