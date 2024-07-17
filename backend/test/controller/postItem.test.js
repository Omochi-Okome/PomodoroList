const request = require('supertest');
const express = require('express');
const homeController = require('../../controllers/home');
const List = require('../../models/list');

jest.mock('../../util/database', () => jest.fn().mockResolvedValue(true));
jest.mock('../../models/list');

const app = express();
app.use(express.json());
app.post('/home/item', homeController.postItem);

describe('HomeController POST', () => {
  it('ToDoアイテムをPOSTできる', async () => {
    const mockData = [
      {
        _id: "66951c4a1ecfcaecbaf026d3",
        userId: "2qqeUR7inSd47uqUtC5CzCpEUYu2",
        item: "あいうえお",
        registerDate: "2024-07-15T12:55:32.228Z",
        pomodoroCount: 0,
        __v: 0
      }
    ];
    List.find.mockResolvedValue(mockData);
    const res = await request(app).post('/home/item');
    //ステータス200かどうか
    expect(res.status).toBe(200);
    expect()
  })
})