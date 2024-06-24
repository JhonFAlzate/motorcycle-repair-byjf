import {Router} from 'express';
import { UserRoutes } from './users/userRouter';
import { RepairsRoutes } from './repairs/repairs.Router';

export class AppRoutes {
    
    static get routes(): Router {
        
        const router = Router();

        router.use('/api/v1/users', UserRoutes.routes)
        router.use('/api/v1/repairsRoutes', RepairsRoutes.routes)

        return router;

    }
}