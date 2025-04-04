import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { Course } from './models/Course';

const syncDatabase = async () => {
  const tagsToAdd = [
    { name: '.NET Core' },
    { name: 'AWS' },
    { name: 'AJAX' },
    { name: 'Android Studio' },
    { name: 'Angular' },
    { name: 'Anime.js' },
    { name: 'Auth0' },
    { name: 'Azure' },
    { name: 'Bash' },
    { name: 'Bootstrap' },
    { name: 'C' },
    { name: 'C#' },
    { name: 'C++' },
    { name: 'CSS' },
    { name: 'Dart' },
    { name: 'Django' },
    { name: 'Docker' },
    { name: 'Express.js'},
    { name : 'Electron'},
    { name: 'Flask' },
    { name: 'Flutter' },
    { name: 'Figma' },
    { name: 'Firebase' },
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'Go' },
    { name: 'Google Cloud Platform' },
    { name: 'GSAP' },
    { name: 'GraphQL' },
    { name: 'HTML' },
    { name: 'IoT' },
    { name: 'Java' },
    { name: 'JavaFX' },
    { name: 'JavaEE' },
    { name: 'JavaScript' },
    {name : 'JQuery'},
    { name: 'JUnit' },
    { name: 'Kotlin' },
    { name: 'Kubernetes' },
    { name: 'Laravel' },
    { name: 'Lua' },
    { name: 'Material UI' },
    { name: 'MongoDB' },
    { name: 'Mockito' },
    { name: 'MySQL' },
    { name: 'Next.js' },
    { name: 'Node.js' },
    { name: 'OpenCV' },
    { name: 'OpenAI' },
    { name: 'PHP' },
    { name: 'PostgreSQL' },
    { name: 'Python' },
    { name: 'REST API' },
    { name: 'Raspberry Pi' },
    { name: 'React' },
    { name: 'React Native' },
    { name: 'Ruby' },
    { name: 'Rust' },
    { name: 'Selenium' },
    { name: 'Socket.io' },
    { name: 'Spring Boot' },
    { name: 'Spring MVC' },
    { name: 'SQL' },
    { name: 'SQLite' },
    { name: 'Swift' },
    { name: 'Swing' },
    { name: 'Tailwind CSS' },
    { name: 'Three.js' },
    { name: 'Thymeleaf' },
    { name: 'TypeScript' },
    { name: 'Unreal Engine' },
    { name: 'Unity' },
    { name: 'Vue.js' },
    { name: 'WebRTC' },
    { name: 'WebGL' },
    { name: 'WebSocket' },
    { name: 'WordPress' },
    { name: 'XML' },
    { name: 'YAML' },

  ];

  const courseToAdd: Course[] = [
    {id: 1, title: "Mathématiques pour l'informatique", projets: []},
    {id: 2, title: "Production et geestion de documents", projets: []},
    {id: 3, title: "Introduction aux fonctions de travail", projets: []},
    {id: 4, title: "Programmation 1", projets: []},
    {id: 5, title: "Matériel et systèmes d'exploitation", projets: []},
    {id: 6, title: "Introduction aux bases de données", projets: []},
    {id: 7, title: "Introduction aux réseaux informatiques", projets: []},
    {id: 8, title: "Programmation 2", projets: []},
    {id: 9, title: "Matériel et systèmes d'exploitation 2", projets: []},
    {id: 10, title: "Introduction à la sécurité informatique", projets: []},
    {id: 11, title: "Application natives 1", projets: []},
    {id: 12, title: "Méthodes de concepetion d'applications", projets: []},
    {id: 13, title: "Application web 1", projets: []},
    {id: 14, title: "Psychologie et communication", projets: []},
    {id: 15, title: "Application natives 2", projets: []},
    {id: 16, title: "Application web 2", projets: []},
    {id: 17, title: "Soutien informatique logiciel", projets: []},
    {id: 18, title: "Évaluation de composants logiciels", projets: []},
    {id: 19, title: "Sécurité informatique pour logiciels", projets: []},
    {id: 20, title: "Application natives 3", projets: []},
    {id: 21, title: "Application de jeux ou simulations", projets: []},
    {id: 22, title: "Application web 3", projets: []},
    {id: 23, title: "Service d'échange de données", projets: []},
    {id: 24, title: "Objets connectés", projets: []},
    {id: 25, title: "Nouvellees technologies et développement", projets: []},
    {id: 26, title: "Méthodes de conception d'applications 2", projets: []},
    {id: 27, title: "Stage en programmation", projets: []},
  ]
  try {
<<<<<<< HEAD

    //Initialize DB
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');

    //Adding Tags
=======
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');

>>>>>>> 45da83b0e518b217b023ae1834e2515161b51201
    console.log('Adding tags to the database...');
    const tagRepository = AppDataSource.getRepository('Tag');
    for (const tagData of tagsToAdd) {
      const existingTag = await tagRepository.findOneBy({ name: tagData.name });
      if (!existingTag) {
        const tag = tagRepository.create(tagData);
        await tagRepository.save(tag);
        console.log(`Tag ${tag.name} added to the database.`);
      } else {
        console.log(`Tag ${existingTag.name} already exists in the database.`);
      }
    }
    console.log('Tags added successfully.');
    
<<<<<<< HEAD

    //Adding Courses
=======
>>>>>>> 45da83b0e518b217b023ae1834e2515161b51201
    console.log('Adding courses to the database...');
    const courseRepository = AppDataSource.getRepository(Course);
    for (const courseData of courseToAdd) {
      const existingCourse = await courseRepository.findOneBy({ title: courseData.title });
      if (!existingCourse) {
        const course = courseRepository.create(courseData);
        await courseRepository.save(course);
        console.log(`Course ${course.title} added to the database.`);
      } else {
        console.log(`Course ${existingCourse.title} already exists in the database.`);
      }
    }
    console.log('Courses added successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

syncDatabase();