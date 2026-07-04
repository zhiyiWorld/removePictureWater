import { describe, expect, it } from 'vitest';
import { extractFirstHttpUrl } from './extractLink';

describe('extractFirstHttpUrl', () => {
  it('能从抖音分享文案中提取短链', () => {
    const input =
      '4.89 03/24 cNJ:/ K@W.md 文案内容 https://v.douyin.com/ZOqdo9qsYuY/ 复制此链接，打开Dou音搜索，直接观看视频！';

    expect(extractFirstHttpUrl(input)).toBe('https://v.douyin.com/ZOqdo9qsYuY/');
  });

  it('无链接时返回空字符串', () => {
    expect(extractFirstHttpUrl('这里只有普通文本')).toBe('');
  });
});
