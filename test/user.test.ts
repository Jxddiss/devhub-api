import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/config/ormconfig';
import { User } from '../src/models/User';

let userRepository: any;

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
  userRepository = AppDataSource.getRepository(User);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

afterEach(async () => {
  await userRepository.clear();
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
    expect(response.body.firstName).toBe(userData.firstName);
    expect(response.body.username).toBe(userData.username);
    expect(response.body.email).toBe(userData.email);
    expect(response.body.avatar).toBe(userData.avatar);
    expect(response.body.banner).toBe(userData.banner);
  });

  it('should retrieve all users', async () => {
    const users = [
      { lastName: 'Smith', firstName: 'Jane', username: 'janesmith', email: 'janesmith@example.com' },
      { lastName: 'Brown', firstName: 'Charlie', username: 'charliebrown', email: 'charliebrown@example.com' },
    ];
    await userRepository.save(users);

    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(users.length);

    users.forEach((user, index) => {
      expect(response.body[index]).toHaveProperty('id');
      expect(response.body[index].lastName).toBe(user.lastName);
      expect(response.body[index].firstName).toBe(user.firstName);
      expect(response.body[index].username).toBe(user.username);
      expect(response.body[index].email).toBe(user.email);
    });
  });

  it('should retrieve a user by ID', async () => {
    const user = userRepository.create({
      lastName: 'Smith',
      firstName: 'Jane',
      username: 'janesmith',
      email: 'janesmith@example.com',
    });
    await userRepository.save(user);

    const response = await request(app)
      .get(`/api/v1/users/${user.id}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', user.id);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.username).toBe(user.username);
    expect(response.body.email).toBe(user.email);
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

    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.username).toBe(user.username);
    expect(response.body.email).toBe(user.email);
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

  it('should return 404 for a non-existent user', async () => {
    const response = await request(app)
      .get('/api/v1/users/non-existent-id')
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Utilisateur non trouvé.');
  });
});
