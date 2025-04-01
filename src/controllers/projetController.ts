import { uploadVideoToVimeo } from '../services/videoService';


export const uploadVideoDemoController = async (req: any, res: any) => {
  const videofile = Array.isArray(req.files.video)
    ? req.files.video[0]
    : req.files.video;

  try {
    const url = await uploadVideoToVimeo(videofile, 'Video Test', 'Uploadé avec Express + Typescript + Vimeo API');
    res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};