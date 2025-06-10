import { getUniqueCourseByTitle } from '../services/courseService';
import {
  createProjet,
  decrementLikeCountByOne,
  getAllProjets,
  getProjetById,
  getProjetsByCollaborator,
  getProjetsByCourse,
  getProjetsBySession,
  getProjetsByTags,
  getProjetsByTagsList,
  getProjetsByTeacher,
  getProjetsByTitle,
  getProjetsByUserId,
  incrementLikeCountByOne,
  incrementViewCountByOne,
} from '../services/projetService';
import { getUniqueTagByName } from '../services/tagService';
import { uploadVideo } from '../services/uploadService';

export const createProjetController = async (req: any, res: any) => {
  if (!req.files || !req.files.video) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }
  const videofile = Array.isArray(req.files.video)
    ? req.files.video[0]
    : req.files.video;

  const projet = JSON.parse(req.body.projet);

  try {
    let url = null;
    if (videofile) {
      url = await uploadVideo(videofile, projet.title);
    }
    projet.demoUrl = url;
    projet.createdAt = new Date();
    projet.updatedAt = new Date();
    projet.likes = 0;
    projet.views = 1;
    projet.teacher = projet.teacher || null;
    projet.course = projet.course || null;
    projet.author = req.user;

    let dbTags: string[] = [];
    for (let tagName of projet.tags) {
      const tag = await getUniqueTagByName(tagName);
      if (tag) {
        dbTags.push(tag.name);
      }
    }
    projet.tags = dbTags;

    let dbCourses: string = '';
    if (projet.course) {
      const course = await getUniqueCourseByTitle(projet.course);
      if (course) {
        dbCourses = course.title;
      } else {
        return res.status(404).json({ error: 'Course not found' });
      }
    }
    projet.course = dbCourses;
    projet.teacher = projet.teacher || null;
    projet.githubUrl = projet.githubUrl || null;
    projet.gitlabUrl = projet.gitlabUrl || null;
    projet.session = projet.session || null;

    projet.collaborators = projet.collaborators || null;

    const createdProjet = await createProjet(projet);
    res.status(200).json(createdProjet);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'UNSUPPORTED_VIDEO_FORMAT') {
      return res.status(400).json({ error: 'Unsupported video format' });
    }
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getVideosFromUser = async (req: any, res: any) => {
  const userId = req.params.id;
  try {
    const projets = await getProjetsByUserId(userId);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getVideoById = async (req: any, res: any) => {
  const projetId = req.params.id;
  try {
    const projet = await getProjetById(projetId);
    console.log(projet);
    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByTitleController = async (req: any, res: any) => {
  const title = req.params.title;
  try {
    const projets = await getProjetsByTitle(title);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByTagsListController = async (req: any, res: any) => {
  let tags: string[] = [];

  if (req.query.tags) {
    tags = req.query.tags.split(',');
  } else if (req.params.tags) {
    tags = req.params.tags.split(',');
  }

  try {
    console.log('tags', tags);
    const projets = await getProjetsByTagsList(tags);
    console.log(projets.length);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByTeacherController = async (req: any, res: any) => {
  const teacher = req.params.teacher;
  try {
    const projets = await getProjetsByTeacher(teacher);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByCourseController = async (req: any, res: any) => {
  const course = req.params.course;
  try {
    const projets = await getProjetsByCourse(course);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsBySessionController = async (req: any, res: any) => {
  const session = req.params.session;
  try {
    const projets = await getProjetsBySession(session);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByCollaboratorController = async (
  req: any,
  res: any,
) => {
  const collaborator = req.params.collaborator;
  try {
    const projets = await getProjetsByCollaborator(collaborator);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const incrementViewCountByOneController = async (req: any, res: any) => {
  const projetId = req.params.id;
  try {
    const projet = await incrementViewCountByOne(projetId);
    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const incrementLikeCountByOneController = async (req: any, res: any) => {
  const projetId = req.params.id;
  try {
    const projet = await incrementLikeCountByOne(projetId);
    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const decrementLikeCountByOneController = async (req: any, res: any) => {
  const projetId = req.params.id;
  try {
    const projet = await decrementLikeCountByOne(projetId);
    res.status(200).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjetsByTagsController = async (req: any, res: any) => {
  let tags: string[] = [];

  if (req.query.tags) {
    tags = req.query.tags.split(',');
  } else if (req.params.tags) {
    tags = req.params.tags.split(',');
  }

  try {
    const projets = await getProjetsByTags(tags);
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllProjetsController = async (req: any, res: any) => {
  try {
    const projets = await getAllProjets();
    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
