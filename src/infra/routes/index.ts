import { Router } from 'express';
import { auth } from './auth.routes';

const routes = Router();
routes.use('/api/v1/auth', auth);

export { routes };
