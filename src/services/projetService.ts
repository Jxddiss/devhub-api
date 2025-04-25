import { AppDataSource } from '../config/ormconfig';
import { Projet } from '../models/Projet';
import { In } from 'typeorm';

const projetRepository = AppDataSource.getRepository(Projet);

export const createProjet = async (data: Partial<Projet>) => {
  const projet = projetRepository.create(data);
  return projetRepository.save(projet);
};

export const getProjetById = async (id: number) => {
  return projetRepository.findOneBy({ id });
};

export const getAllProjets = async () => {
  return projetRepository.find();
};

export const getProjetsByTags = async (tags: string[]) => {
  const projets = await projetRepository.find({
    where: { tags: In(tags) },
    take: 15,
  });
  return projets.length > 1 ? projets : getAllProjets();
};

export const getProjetsByTagsList = async (tags: string[]) => {
  if (!tags || tags.length === 0) {
    return getAllProjets();
  }
  const allProjets = await getAllProjets();
  return allProjets.filter(projet => {
    if (!projet.tags) return false;
    return projet.tags.some(projetTag => tags.includes(projetTag));
  });
};

export const getProjetsByTeacher = async (teacher: string) => {
  return projetRepository.find({
    where: { teacher: teacher },
  });
};

export const getProjetsByCourse = async (course: string) => {
  return projetRepository.find({
    where: { course: course },
  });
};

export const getProjetsBySession = async (session: string) => {
  return projetRepository.find({
    where: { session: session },
  });
};

export const getProjetsByTitle = async (title: string) => {
  return projetRepository.createQueryBuilder('projet')
    .where('LOWER(projet.title) LIKE LOWER(:title)', { title: `%${title}%` })
    .getMany();
};

export const getProjetsByUserId = async (userId: number) => {
  return projetRepository.find({ where: { author: { id: userId } } });
};

export const updateProjet = async (id: number, data: Partial<Projet>) => {
  const projet = await projetRepository.findOneBy({ id });
  if (!projet) throw new Error('Projet not found');
  Object.assign(projet, data);
  return projetRepository.save(projet);
};

export const deleteProjet = async (id: number) => {
  const projet = await projetRepository.findOneBy({ id });
  if (!projet) throw new Error('Projet not found');
  return projetRepository.remove(projet);
};

export const incrementViewCountByOne = async (id: number) => {
  const projet = await projetRepository.findOneBy({ id });
  if (!projet) throw new Error('Projet not found');
  projet.views += 1;
  return projetRepository.save(projet);
};

export const incrementLikeCountByOne = async (id: number) => {
  const projet = await projetRepository.findOneBy({ id });
  if (!projet) throw new Error('Projet not found');
  projet.likes += 1;
  return projetRepository.save(projet);
};

export const decrementLikeCountByOne = async (id: number) => {
  const projet = await projetRepository.findOneBy({ id });
  if (!projet) throw new Error('Projet not found');
  projet.likes -= 1;
  return projetRepository.save(projet);
};


