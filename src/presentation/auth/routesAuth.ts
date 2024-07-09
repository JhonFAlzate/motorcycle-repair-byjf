

import { Router } from "express";
import { AuthController } from "./controllerAuth";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        )

        const authService = new AuthService(emailService)

        const controller = new AuthController(authService)

        router.post('/login', controller.login)
        router.post('/register', controller.register)

        router.get('/validate-email/:token', controller.validateEmail)

        router.get('/profile', AuthMiddleware.protect ,controller.getProfile) // aquí estoy usando el middelware para protjer el acceso  a esta ruta

        return router
    }

}