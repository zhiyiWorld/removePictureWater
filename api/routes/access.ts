import { Router, type Request, type Response } from 'express';
import type {
  VerifyPasswordRequest,
  VerifyPasswordResponse,
} from '../../shared/types.js';

const router = Router();

router.post(
  '/verify-password',
  (req: Request<unknown, VerifyPasswordResponse, VerifyPasswordRequest>, res: Response<VerifyPasswordResponse>) => {
    const accessPassword = process.env.ACCESS_PASSWORD || '123456';
    const { password } = req.body;

    if (password === accessPassword) {
      res.status(200).json({
        success: true,
        message: '验证通过',
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: '密码错误，请重新输入',
    });
  },
);

export default router;
