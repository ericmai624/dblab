import express from 'express';
import { UserController } from 'controllers';

const router = express.Router();

router.route('/')
  .get(UserController.getUserProfile);

export default router;
