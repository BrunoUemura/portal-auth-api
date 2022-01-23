import { Router } from 'express';
import SignUpController from '@src/controller/SignUpController';
import SignInController from '@src/controller/SignInController';

const auth = Router();

auth.post('/signup', SignUpController.handle);
auth.post('/signin', SignInController.handle);

export { auth };
