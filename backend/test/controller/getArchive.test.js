const request = require('supertest');
const express = require('express');
const archiveController = require('../../controllers/archive');
const ArchiveList = require('../../models/archiveList');

jest.mock('../../util/database', () => jest.fn().mockResolvedValue(true));
jest.mock('../../models/archiveList');

const app = express();
app.use(express.json());
app.get('/archive', async (req, res) => {
  req.user = { userId: '2qqeUR7inSd47uqUtC5CzCpEUYu2' };
  archiveController.viewArchive(req, res);
});

describe('ArchiveControler GET', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Archiveリストが取得できる', async () => {
    const mockData = [
      {
        _id: "66951c4a1ecfcaecbaf026d3",
        userId: "2qqeUR7inSd47uqUtC5CzCpEUYu2",
        item: "あいうえお",
        registerDate: "2024-07-15T12:55:32.228Z",
        pomodoroCount: 0,
        __v: 0
      },
      {
        _id: "669625fc42e7f3677b71a5dd",
        userId: "2qqeUR7inSd47uqUtC5CzCpEUYu2",
        item: "テスト2",
        registerDate: "2024-07-16T07:49:15.354Z",
        pomodoroCount: 0,
        __v: 0
      }
    ];
      ArchiveList.find.mockResolvedValue(mockData);
      const res = await request(app).get('/archive');
      
      //ステータス200かどうか
      expect(res.status).toBe(200);
      //レスポンスが配列かどうか
      expect(Array.isArray(res.body)).toBe(true);
      //レスポンスが期待されるデータと一致するかどうか
      expect(res.body).toEqual(mockData);
  })
});
