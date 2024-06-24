import {Router} from 'express';
import { UserController } from './userController';
import { UserService } from '../services/user.service';



export class UserRoutes {

    static get routes(): Router {
        const router = Router();
        
        const userService = new UserService()
        const controller = new UserController(userService)

        router.get('/', controller.getUser)
        router.post('/', controller.createUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUserById)
        router.delete('/:id', controller.deleteUserById)

        return router;

    }
}