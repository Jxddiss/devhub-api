import { AppDataSource } from '../config/ormconfig';
import { Course } from '../models/Course';

const courseRepository = AppDataSource.getRepository(Course);

export const getAllCourses = async () => {
  return courseRepository.find();
};

export const getUniqueCourseByTitle = async (title: string) => {
  const courses = await courseRepository.findBy({ title: title });
  if (courses.length === 0) return null;
  return courses[0];
};
