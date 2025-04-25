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


