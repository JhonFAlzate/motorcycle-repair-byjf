// 
import {Request, Response} from 'express';
import { RepairsService } from '../services/repairs.service';
import { CreateRepairDto, CustomError, UpdateRepairDto } from '../../domain';
import { UpdateUserDto } from '../../domain/dtos/user/update-user-dto';

export class RepairsController {

    constructor(
        private readonly repairsService: RepairsService
    ){
     }

     private handleError = (error: unknown, res: Response) => {
        console.log(error)
        if( error instanceof CustomError){
            return res.status(error.statusCode).json({message: error.message})
        }
        return res.status(500).json({message: 'Somethin went very wrong! 🧨☠️' }) 
    }


    createRepair = (req: Request, res: Response) => {
        // const { date, userId } = req.body;

        const [error, createRepairDto] = CreateRepairDto.createRepair(req.body)
       
        if ( error ) return res.status(422).json({message: error})
        

        this.repairsService.createRepairs(createRepairDto!)

        .then((repair) => res.status(201).json(repair))
        .catch((error: unknown) => {
            console.log(error)

            if( error instanceof CustomError) res.status(error.statusCode).json({message: error.message})
            
            return this.handleError(error, res)
        })

    }

    findAllRepairs = (req: Request, res: Response) => {

        this.repairsService.findAllRepairs()

        .then(repair => res.status(200).json(repair))
        .catch((error:unknown) => this.handleError(error, res))


    }



    findOneRepair = (req: Request, res: Response) => {
    const { id } = req.params;

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.repairsService.findRepairByd(+id)
            .then(repair => res.status(200).json(repair))

            .catch((error:unknown) => {
                
                if( error instanceof CustomError){
                    return res.status(error.statusCode).json({message: error.message})
                }
                return this.handleError(error, res)
            })
    }

    updateRepair = (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, updateRepairDto] = UpdateRepairDto.updateRepair(req.body) 
       

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }

        if ( error ) return res.status(422).json({ message: error})
            

        this.repairsService.updateRepair(updateRepairDto!, +id)
            .then(repair => res.status(200).json(repair))

            .catch((error: unknown) => this.handleError(error, res))
 

    }

    deleteRepair = (req: Request, res: Response) => {
        const {id} = req.params;

        if(isNaN(+id)){
            return res.status(400).json({message: 'El id debe ser un número'})
        }
        this.repairsService.deleteRepair(+id)
        .then(() => res.status(204).json())

        .catch((error: unknown) => this.handleError(error, res))

    }

}