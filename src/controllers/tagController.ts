import { getTagByName, getAllTags } from '../services/tagService';

export const getAllTagsController = async (req: any, res: any) => {
  try {
    const tags = await getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTagByNameController = async (req: any, res: any) => {
  const tagName = req.params.name;
  try {
    const tag = await getTagByName(tagName);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
