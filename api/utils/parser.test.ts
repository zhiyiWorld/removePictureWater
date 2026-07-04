import { describe, expect, it } from 'vitest';
import { mapExternalResponse } from './parser';

describe('mapExternalResponse', () => {
  it('能映射第三方成功响应', () => {
    const result = mapExternalResponse({
      code: '10000',
      msg: '成功',
      content: {
        success: true,
        title: '测试标题',
        cover: '`https://example.com/cover.jpg`',
        url: '`https://example.com/video.mp4`',
        type: 'VIDEO',
        originText: '`https://v.douyin.com/test/`',
      },
    });

    expect(result).toEqual({
      title: '测试标题',
      cover: 'https://example.com/cover.jpg',
      url: 'https://example.com/video.mp4',
      type: 'VIDEO',
      originalLink: 'https://v.douyin.com/test/',
    });
  });

  it('缺少必要字段时抛出错误', () => {
    expect(() =>
      mapExternalResponse({
        code: '10000',
        msg: '成功',
        content: {
          success: true,
          title: '',
          url: '',
        },
      }),
    ).toThrow('解析结果缺少必要字段');
  });
});
