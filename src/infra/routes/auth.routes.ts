import { Router } from 'express';
import SignUpController from '../../controller/SignUpController';
import SignInController from '../../controller/SignInController';

const auth = Router();

auth.post('/signup', SignUpController.handle);
auth.post('/signin', SignInController.handle);

export { auth };
