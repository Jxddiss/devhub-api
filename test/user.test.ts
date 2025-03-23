import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/config/ormconfig';
import { User } from '../src/models/User';

let userRepository: any;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
  userRepository = AppDataSource.getRepository(User); // Obtenir le repository User
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('User API', () => {
  it('should create a new user', async () => {
    const userData = {
      lastName: 'Doe',
      firstName: 'John',
      username: 'johndoe',
      email: 'johndoe@example.com',
      avatar: 'https://example.com/avatar.jpg',
      banner: 'https://example.com/banner.jpg',
    };

    const response = await request(app)
      .post('/api/v1/users')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.lastName).toBe(userData.lastName);
    expect(response.body.email).toBe(userData.email);
  });

  it('should retrieve all users', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should retrieve a user by ID', async () => {
    const user = userRepository.create({
      lastName: 'Smith',
      firstName: 'Jane',
      username: 'janesmith',
      email: 'janesmith@example.com',
    });
    await userRepository.save(user); // Sauvegarder l'utilisateur dans la base de données

    const response = await request(app)
      .get(`/api/v1/users/${user.id}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', user.id);
    expect(response.body.username).toBe(user.username);
  });

  it('should update a user', async () => {
    const user = userRepository.create({
      lastName: 'Brown',
      firstName: 'Charlie',
      username: 'charliebrown',
      email: 'charliebrown@example.com',
    });
    await userRepository.save(user);

    const updatedData = {
      lastName: 'Brownie',
    };

    const response = await request(app)
      .put(`/api/v1/users/${user.id}`)
      .send(updatedData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.lastName).toBe(updatedData.lastName);
  });

  it('should delete a user', async () => {
    const user = userRepository.create({
      lastName: 'White',
      firstName: 'Walter',
      username: 'heisenberg',
      email: 'heisenberg@example.com',
    });
    await userRepository.save(user);

    const response = await request(app)
      .delete(`/api/v1/users/${user.id}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(204);

    const deletedUser = await userRepository.findOneBy({ id: user.id });
    expect(deletedUser).toBeNull();
  });
});