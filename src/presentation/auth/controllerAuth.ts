


import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { AuthService } from "../services/auth.service";


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
        //implementar el metodo
        return res.status(200).json({ message: 'Hello World'})
    }

    login = (req: Request, res: Response) => {
        //implementar el metodo
        return res.status(200).json({ message: 'Hello World'})
    }
}
