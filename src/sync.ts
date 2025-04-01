import 'reflect-metadata';
import { AppDataSource } from './config/ormconfig';
import { Tag } from './models/Tag';
const syncDatabase = async () => {
  const tagsToAdd = [
    { name: '.NET Core' },
    { name: 'AWS' },
    { name: 'Android Studio' },
    { name: 'Angular' },
    { name: 'Anime.js' },
    { name: 'Bash' },
    { name: 'Bootstrap' },
    { name: 'C' },
    { name: 'C#' },
    { name: 'C++' },
    { name: 'CSS' },
    { name: 'Dart' },
    { name: 'Django' },
    { name: 'Docker' },
    { name: 'Express.js' },
    { name: 'Flask' },
    { name: 'Flutter' },
    { name: 'Go' },
    { name: 'Google Cloud Platform' },
    { name: 'GSAP' },
    { name: 'GraphQL' },
    { name: 'HTML' },
    { name: 'IoT' },
    { name: 'Java' },
    { name: 'JavaFX' },
    { name: 'JavaScript' },
    { name: 'JUnit' },
    { name: 'Kotlin' },
    { name: 'Kubernetes' },
    { name: 'Laravel' },
    { name: 'Lua' },
    { name: 'Material UI' },
    { name: 'MongoDB' },
    { name: 'MySQL' },
    { name: 'Next.js' },
    { name: 'Node.js' },
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
    { name: 'Swift' },
    { name: 'Swing' },
    { name: 'Tailwind CSS' },
    {name: 'Three.js'},
    { name: 'Thymeleaf' },
    { name: 'TypeScript' },
    { name: 'Unreal Engine' },
    { name: 'Unity' },
    { name: 'Vue.js' },
    { name: 'WebRTC' },
    { name: 'WebSocket' },
    { name: 'Azure' }
  ];
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully.');

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
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

syncDatabase();