import {Router} from 'express';
import { UserController } from './userController';
import { UserService } from '../services/user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

enum Role {
   
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
}

export class UserRoutes {

    static get routes(): Router {
        const router = Router();
        
        const userService = new UserService()
        const controller = new UserController(userService)

        router.use(AuthMiddleware.protect)  // aquí estoy protegiendo todas las rutas de abajo.
        router.use(AuthMiddleware.restrictTo(Role.EMPLOYEE))

        router.get('/', controller.getUser)
        router.post('/', controller.createUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUserById)
        router.delete('/:id', controller.deleteUserById)

        return router;

    }
}