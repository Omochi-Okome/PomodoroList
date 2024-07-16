const request = require('supertest');
const express = require('express');
const homeController = require('../../controllers/home');
const List = require('../../models/list');

jest.mock('../../util/database', () => jest.fn().mockResolvedValue(true));
jest.mock('../../models/list');

const app = express();
app.use(express.json());
app.get('/home', homeController.getHome);

describe('HomeController GET', () => {
  it('ToDoリストが取得できる', async () => {
    const mockData = [
      {
        _id: '6695dff418cd8f5660f80790',
        userId: '2qqeUR7inSd47uqUtC5CzCpEUYu2',
        item: 'ff',
        registerDate: '2024-07-16T02:50:27.187Z',
        pomodoroCount: 0,
        __v: 0
      },
      {
        _id: '6695dff518cd8f5660f80793',
        userId: '2qqeUR7inSd47uqUtC5CzCpEUYu2',
        item: 's',
        registerDate: '2024-07-16T02:50:28.959Z',
        pomodoroCount: 0,
        __v: 0
      }
    ];
    List.find.mockResolvedValue(mockData);
    const res = await request(app).get('/home');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  })
})