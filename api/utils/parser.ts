import type { ExternalApiSuccessResponse, ParseResult } from '../../shared/types.js';

export function normalizeAssetUrl(value?: string): string {
  return value?.trim().replace(/^`|`$/g, '') ?? '';
}

export function mapExternalResponse(payload: ExternalApiSuccessResponse): ParseResult {
  const content = payload.content;

  if (payload.code !== '10000' || !content?.success) {
    throw new Error(payload.msg || '解析失败，请稍后重试');
  }

  const title = content.title?.trim() ?? '';
  const cover = normalizeAssetUrl(content.cover);
  const url = normalizeAssetUrl(content.url);
  const type = content.type?.trim() ?? 'UNKNOWN';
  const originalLink = normalizeAssetUrl(content.originText || content.shortUrl);

  if (!title || !url) {
    throw new Error('解析结果缺少必要字段');
  }

  return {
    title,
    cover,
    url,
    type,
    originalLink,
  };
}
