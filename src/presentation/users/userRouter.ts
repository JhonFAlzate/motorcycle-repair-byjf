import {Router} from 'express';
import { AuthController, UserController } from './userController';
import { UserService } from '../services/user.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { EmailService } from '../services/email.service';
import { envs } from '../../config';
import { AuthService } from '../services/auth.service';


enum Role {
   
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE'
} 

export class UserRoutes {

    
    static get routes(): Router {
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
          ); 

        const authService = new AuthService(emailService);

        const controller2 = new AuthController(authService);
    
        router.post("/login", controller2.login);
        router.post("/register", controller2.register);
        router.get("/validate-email/:token", controller2.validateEmail);
    
        router.get("/profile", AuthMiddleware.protect, controller2.getProfile); // aquí estoy usando el middelware para protjer el acceso  a esta ruta
    
        
        const userService = new UserService()
        const controller = new UserController(userService)

        router.use(AuthMiddleware.protect)  // aquí estoy protegiendo todas las rutas de abajo.
        router.use(AuthMiddleware.restrictTo(Role.EMPLOYEE)) // aquí protejo las rutas para que solo los empleados puedan ingresar.

        router.get('/', controller.getUser)
        router.post('/', controller.createUser)
        router.get('/:id', controller.getUserById)
        router.patch('/:id', controller.updateUserById)
        router.delete('/:id', controller.deleteUserById)

        return router;

    }
}