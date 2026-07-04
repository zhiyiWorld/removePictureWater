import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import app from './app';

describe('API routes', () => {
  beforeEach(() => {
    process.env.ACCESS_PASSWORD = '123456';
    process.env.API_KEY = 'demo-key';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('验证密码成功', async () => {
    const response = await request(app).post('/api/verify-password').send({
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('验证密码失败', async () => {
    const response = await request(app).post('/api/verify-password').send({
      password: '000000',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toContain('密码错误');
  });

  it('解析接口返回标准化数据', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          code: '10000',
          msg: '成功',
          content: {
            success: true,
            title: '测试视频',
            cover: '`https://example.com/cover.jpg`',
            url: '`https://example.com/video.mp4`',
            type: 'VIDEO',
            originText: '`https://v.douyin.com/demo/`',
          },
        }),
      }),
    );

    const response = await request(app).post('/api/parse').send({
      link: 'https://v.douyin.com/demo/',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('测试视频');
    expect(response.body.data.url).toBe('https://example.com/video.mp4');
  });
});
