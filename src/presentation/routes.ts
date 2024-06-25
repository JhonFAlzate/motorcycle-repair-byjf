import {Router} from 'express';
import { UserRoutes } from './users/userRouter';
import { RepairsRoutes } from './repairs/repairs.Router';
import { AuthRoutes } from './auth/routesAuth';

export class AppRoutes {
    
    static get routes(): Router {
        
        const router = Router();

        router.use('/api/v1/users', UserRoutes.routes) // ésta la eliminaría luego de que tenga funcionando bien la autenticacion.
        router.use('/api/v1/auth', AuthRoutes.routes)
        router.use('/api/v1/repairsRoutes', RepairsRoutes.routes)

        return router;

    }
}