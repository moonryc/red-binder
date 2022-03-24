import express from 'express';
import graphqlRoutes from './graphql-routes';
import isAuth from '../middleware/isAuth';
import accountRoutes from './account-routes'

const router = express.Router();

router.use(accountRoutes)
router.use(isAuth,graphqlRoutes)

export default router;

