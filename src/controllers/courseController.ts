import { getAllCourses } from '../services/courseService';

export const getAllCoursesController = async (req: any, res: any) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};