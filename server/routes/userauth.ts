import express, { Request, Response } from 'express'
import { register, login } from '../controllers/userauth'
import { verifyToken } from '../middleware/verifyToken'
import User from '../models/User'

const router = express.Router()

router.post('/register', (req: Request, res: Response) => register(req, res))
router.post('/login', (req: Request, res: Response) => login(req, res))
router.get('/profile', verifyToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await User.findById(userId).select('-password');
  res.json({ user });
});


export default router
