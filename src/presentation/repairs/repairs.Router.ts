import {Router} from 'express';
import { RepairsController } from './repairsController';
import { RepairsService } from '../services/repairs.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

enum Role {
   
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

export class RepairsRoutes {

    static get routes(): Router {
        const router = Router();
        
        const repairsService = new RepairsService() 
        const controller = new RepairsController(repairsService)

        router.use(AuthMiddleware.protect)
        router.use(AuthMiddleware.restrictTo(Role.EMPLOYEE))

        // router.get('/', controller.findAllRepairs)
        router.get('/', controller.findAllRepairs)
        router.post('/', controller.createRepair)
        router.get('/:id', controller.findOneRepair)
        router.patch('/:id', controller.updateRepair)
        router.delete('/:id', controller.deleteRepair)

        return router;

    }
}