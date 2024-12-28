const request = require('supertest');
const app = require('../server'); // Путь к вашему серверу
const pool = require('../db/connection'); // Подключение к базе данных

// Тестовые данные
const testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'password123',
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
    `INSERT INTO public."Users" (username, email, password, country, profile_image)
     VALUES ($1, $2, $3, $4, $5)`,
    [testUser.username, testUser.email, testUser.password, testUser.country, testUser.profile_image]
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
      email: 'newuser@example.com',
      password: 'newpassword123',
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

  test('GET /api/getUserById/:id - должно вернуть пользователя по ID', async () => {
    const response = await request(app).get('/api/getUserById/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', testUser.username);
  });

  test('DELETE /api/deleteUser/:id - должно удалить пользователя', async () => {
    const response = await request(app).delete('/api/deleteUser/1');
    expect(response.status).toBe(200);

    // Проверка, что пользователь удалён из базы
    const allUsers = await pool.query('SELECT * FROM public."Users" WHERE user_id = 1');
    expect(allUsers.rows.length).toBe(0);
  });
});
