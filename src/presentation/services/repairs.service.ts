import { Repairs} from "../../data"
import { CreateRepairDto, CustomError, UpdateRepairDto } from "../../domain";



enum Status {
    
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
    
}


export class RepairsService {

    constructor(){}

    async createRepairs(repairData: CreateRepairDto){
        const repair = new Repairs();

        repair.date = repairData.date;
        repair.status = Status.PENDING;
        repair.user_id = repairData.userId;
        repair.motorsNumber = repairData.motorsNumber;
        repair.description = repairData.description;

        try {
            return await repair.save();
           
        } catch (error: any) {
            throw CustomError.internalServer("Something went very wrong! 🧨☠️ ojo")
       
         } 
    }



    async findAllRepairs(){
        try{
            return await Repairs.find({
                where: {
                    status: Status.PENDING
                }
            });
            

        } catch (error: any){
            throw CustomError.internalServer("Something went very wrong! 🧨☠️")
        }
    }



    async findRepairByd(id:number){
        
            const repair = await Repairs.findOne({
                where: {
                    id: id,
                    status: Status.PENDING

                }
            })

            if(!repair){
              throw CustomError.notFound(`repair with id ${id} not found`)  
            }

           return repair; 

      
    }


//en este update estamos cambiando el estado de reparacion a completada, por eso no la vemos de nuevo.

    async updateRepair(repairData: UpdateRepairDto, id: number){

        const repair = await this.findRepairByd(id)

           repair.status = repairData.status 

        try {
            return await repair.save()

        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨☠️")
        }
    }





    async deleteRepair(id:number){
      const repair = await this.findRepairByd(id) 
  
      repair.status = Status.CANCELLED

      try{
        await repair.save()

      } catch (error) {
        throw CustomError.internalServer("Something went very wrong! 🧨☠️")
      }
      
    }
}