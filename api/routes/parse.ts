import { Router, type Request, type Response } from 'express';
import type {
  ExternalApiSuccessResponse,
  ParseRequest,
  ParseResponse,
} from '../../shared/types.js';
import { mapExternalResponse } from '../utils/parser.js';

const router = Router();

router.post(
  '/parse',
  async (req: Request<unknown, ParseResponse, ParseRequest>, res: Response<ParseResponse>) => {
    const apiKey = process.env.API_KEY;
    const link = req.body.link?.trim();

    if (!apiKey) {
      res.status(500).json({
        success: false,
        message: '服务端未配置 API_KEY',
      });
      return;
    }

    if (!link) {
      res.status(400).json({
        success: false,
        message: '缺少需要解析的链接',
      });
      return;
    }

    try {
      const endpoint = `https://api.guijianpan.com/waterRemoveDetail/xxmQsyByAk?ak=${encodeURIComponent(apiKey)}&link=${encodeURIComponent(link)}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`第三方接口异常：${response.status}`);
      }

      const payload = (await response.json()) as ExternalApiSuccessResponse;
      const data = mapExternalResponse(payload);

      res.status(200).json({
        success: true,
        message: '解析成功',
        data,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '解析失败，请稍后重试';

      res.status(500).json({
        success: false,
        message,
      });
    }
  },
);

export default router;
