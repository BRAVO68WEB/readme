import { Router } from 'express';

import MetaRoutes from './meta.routes';
import UserRoutes from './user.routes';

const router = Router();

router.use('/users', UserRoutes);
router.use('/.well-known', MetaRoutes);

export default router;