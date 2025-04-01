import { createProjet } from '../services/projetService';
import { uploadVideoToVimeo } from '../services/videoService';


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
      url = await uploadVideoToVimeo(videofile, projet.title, projet.description);
    }
    projet.demoUrl = url;
    projet.createdAt = new Date();
    projet.updatedAt = new Date();
    projet.likes = 0;
    projet.views = 0;
    projet.teacher = null;
    projet.course = null;
    projet.author = req.user;

    const createdProjet = await createProjet(projet);
    res.status(200).json(createdProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};