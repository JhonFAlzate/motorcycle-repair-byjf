


import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { AuthService } from "../services/auth.service";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";


export class AuthController {

    constructor(
       private readonly authService: AuthService 
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({message: error.message})
        }

        console.log(error)
        return res.status(500).json({message: 'Something went very wrong 🧨🧨🧨'})
    }

    register = (req: Request, res: Response) => {

        const [ error, registerUserDto] = RegisterUserDto.createUser(req.body);

        if (error) return res.status( 422 ).json({ message: error });

        this.authService.register(registerUserDto!)

             .then((data => res.status(200).json(data)))
             .catch(error => this.handleError(error, res))

     
    }

    login = (req: Request, res: Response) => {
        //implementar el metodo
        return res.status(200).json({ message: 'Hello World'})
    }
}
