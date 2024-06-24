// 
import {Request, Response} from 'express';
import { UserService } from '../services/user.service';
import { CustomError } from '../../domain';
import { CreateUserDto } from '../../domain/dtos/user/create-user-dto';
import { UpdateUserDto } from '../../domain/dtos/user/update-user-dto';


export class UserController {

    constructor(
        public readonly userService: UserService
    ){}

    private handleError = (error: unknown, res: Response) => {
        console.log(error)
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({message: error.message})
        }
        return res.status(500).json({message: 'Somethin went very wrong! 🧨☠️' }) 
    }


    createUser = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.createUser(req.body)

        if(error) return res.status(422).json({message:error})

        this.userService.createUser(createUserDto!)

        .then(user => res.status(201).json(user)        )
        .catch((error: unknown) => this.handleError(error, res) )
            
 
      
    }

    getUser = (req: Request, res: Response) => {

        this.userService.findAllUsers()

        .then(users => res.status(200).json(users))
        .catch((error: unknown) => this.handleError(error, res))
      
    }

    getUserById = (req: Request, res: Response) => {
        const { id } = req.params;

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.userService.findUserByD(+id)
            .then(user => res.status(200).json(user))

            .catch((error: unknown) => this.handleError(error, res) )

     }

    updateUserById = (req:Request, res: Response) => {
        const { id } = req.params;
        const [error, updateUser] = UpdateUserDto.updateUser(req.body)

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        

        if(error) return res.status(422).json({message:error})      

        this.userService.updateUser(updateUser!, +id)
            .then(users => res.status(200).json(users))
            .catch((error: unknown) => this.handleError(error, res))
            
    }

    

    deleteUserById = (req: Request, res: Response) => {
        const {id} = req.params;

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.userService.deleteUser(+id)

        .then(() => res.status(204).json())
        .catch((error: unknown) => this.handleError(error, res))
    }

}