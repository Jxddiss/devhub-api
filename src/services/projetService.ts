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

export const getProjetsByTags = async (tags: string[]) => {
  if (!tags || tags.length === 0) {
    return getAllProjets();
  }
  const allProjets = await getAllProjets();
  const filteredProjets = allProjets.filter((projet) => {
    if (!projet.tags) return false;
    return projet.tags.some((projetTag) => tags.includes(projetTag));
  });

  return filteredProjets.length > 1
    ? filteredProjets.slice(0, 15)
    : getAllProjets();
};

export const getProjetsByTagsList = async (tags: string[]) => {
  if (!tags || tags.length === 0) {
    return getAllProjets();
  }
  const allProjets = await getAllProjets();
  return allProjets.filter((projet) => {
    if (!projet.tags) return false;
    return projet.tags.some((projetTag) => tags.includes(projetTag));
  });
};

export const getProjetsByTeacher = async (teacher: string) => {
  if (!teacher || teacher.trim() === '') {
    return getAllProjets();
  }
  const searchTerms = teacher
    .toLowerCase()
    .split(' ')
    .filter((term) => term.trim() !== '');
  if (searchTerms.length === 0) {
    return null;
  }
  let queryBuilder = projetRepository
    .createQueryBuilder('projet')
    .leftJoinAndSelect('projet.author', 'author');
  searchTerms.forEach((term, index) => {
    if (index === 0) {
      queryBuilder = queryBuilder.where(
        'LOWER(projet.teacher) LIKE :term' + index,
        { ['term' + index]: `%${term}%` },
      );
    } else {
      queryBuilder = queryBuilder.orWhere(
        'LOWER(projet.teacher) LIKE :term' + index,
        { ['term' + index]: `%${term}%` },
      );
    }
  });

  return queryBuilder.getMany();
};

export const getProjetsByCollaborator = async (collaborator: string) => {
  if (!collaborator || collaborator.trim() === '') {
    return getAllProjets();
  }
  const searchTerms = collaborator
    .toLowerCase()
    .split(' ')
    .filter((term) => term.trim() !== '');
  if (searchTerms.length === 0) {
    return getAllProjets();
  }
  let queryBuilder = projetRepository.createQueryBuilder('projet').leftJoinAndSelect('projet.author', 'author');
  searchTerms.forEach((term, index) => {
    if (index === 0) {
      queryBuilder = queryBuilder.where(
        'LOWER(projet.collaborators) LIKE :term' + index,
        { ['term' + index]: `%${term}%` },
      );
    } else {
      queryBuilder = queryBuilder.orWhere(
        'LOWER(projet.collaborators) LIKE :term' + index,
        { ['term' + index]: `%${term}%` },
      );
    }
  });

  return queryBuilder.getMany();
};

export const getProjetsByCourse = async (course: string) => {
  return projetRepository.find({
    where: { course: course },
    relations: ['author'],
  });
};

export const getProjetsBySession = async (session: string) => {
  return projetRepository.find({
    where: { session: session },
    relations: ['author'],
  });
};

export const getProjetsByTitle = async (title: string) => {
  if (!title || title.trim() === '') {
    return [];
  }
  const projets = await projetRepository
    .createQueryBuilder('projet')
    .leftJoinAndSelect('projet.author', 'author')
    .where('LOWER(projet.title) LIKE LOWER(:title)', { title: `%${title}%` })
    .getMany();
  return projets.length > 0 ? projets : [];
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
