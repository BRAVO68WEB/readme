import { Router } from 'express';

import WebFingerController from '../controller/webfinger.controller';

const router = Router();
const webFingerController = new WebFingerController();

router.get('/webfinger', webFingerController.identity);

export default router;