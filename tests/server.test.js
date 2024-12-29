const request = require('supertest');
const app = require('../server');
const pool = require('../db/connection');

// Тестовые данные
const testUser = {
  username: 'testuser',
  full_name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123',
  dob: '1990-01-01',
  address: '123 Test Street',
  city: 'Test City',
  postal_code: '12345',
  country: 'TestCountry',
  profile_image: 'avatar.png',
};

// Очистка базы данных
const clearDatabase = async () => {
  await pool.query('TRUNCATE TABLE public."Users" RESTART IDENTITY CASCADE');
};

// Добавление тестовых данных
const seedDatabase = async () => {
  await pool.query(
    `INSERT INTO public."Users" (
      username, full_name, email, password, dob, address, city, postal_code, country, profile_image
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      testUser.username,
      testUser.full_name,
      testUser.email,
      testUser.password,
      testUser.dob,
      testUser.address,
      testUser.city,
      testUser.postal_code,
      testUser.country,
      testUser.profile_image,
    ]
  );
};

// Тесты
describe('Server API Tests with Real Database', () => {
  // Перед всеми тестами очищаем базу
  beforeEach(async () => {
    await clearDatabase();
    await seedDatabase();
  });

  // После всех тестов закрываем соединение с базой
  afterAll(async () => {
    await pool.end();
  });

  test('GET /api/getAllUsers - должно вернуть всех пользователей', async () => {
    const response = await request(app).get('/api/getAllUsers');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('username', testUser.username);
  });

  test('POST /api/createUser - должно создать нового пользователя', async () => {
    const newUser = {
      username: 'newuser',
      full_name: 'New User',
      email: 'newuser@example.com',
      password: 'newpassword123',
      dob: '1995-01-01',
      address: '456 New Street',
      city: 'New City',
      postal_code: '67890',
      country: 'NewCountry',
      profile_image: 'newavatar.png',
    };

    const response = await request(app)
      .post('/api/createUser')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('email', newUser.email);

    // Проверка, что пользователь добавлен в базу
    const allUsers = await pool.query('SELECT * FROM public."Users" WHERE email = $1', [newUser.email]);
    expect(allUsers.rows.length).toBe(1);
  });

  test('DELETE /api/deleteUser/:id - должно удалить только что созданного пользователя', async () => {
    // Создаём нового пользователя
    const newUser = {
      username: 'newuser',
      full_name: 'New User',
      email: 'newuser@example.com',
      password: 'newpassword123',
      dob: '1995-01-01',
      address: '456 New Street',
      city: 'New City',
      postal_code: '67890',
      country: 'NewCountry',
      profile_image: 'newavatar.png',
    };

    const createResponse = await request(app)
      .post('/api/createUser')
      .send(newUser);

    expect(createResponse.status).toBe(201);

    // Извлекаем ID созданного пользователя
    const createdUserId = createResponse.body.user_id;

    // Удаляем этого пользователя
    const deleteResponse = await request(app).delete(`/api/deleteUser/${createdUserId}`);
    expect(deleteResponse.status).toBe(204); // Ожидается статус 204 для успешного удаления

    // Проверяем, что пользователь удалён из базы
    const allUsers = await pool.query('SELECT * FROM public."Users" WHERE user_id = $1', [createdUserId]);
    expect(allUsers.rows.length).toBe(0);
  });
});
