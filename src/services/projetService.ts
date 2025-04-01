import { AppDataSource } from '../config/ormconfig';
import { Projet } from '../models/Projet';

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



