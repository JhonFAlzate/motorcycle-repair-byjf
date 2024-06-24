import { Users } from "../../data"
import { CustomError } from "../../domain";
import { CreateUserDto } from "../../domain/dtos/user/create-user-dto";
import { UpdateUserDto } from "../../domain/dtos/user/update-user-dto";

enum Status {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED'
}




export class UserService {

    constructor(){}

    async createUser(userData: CreateUserDto){
        const users = new Users();

        users.name = userData.name.toLowerCase().trim();
        users.email = userData.email.toLowerCase().trim();
        users.password = userData.password.trim();
        users.role = userData.role;
        // users.status = Status.ACTIVE;

        try {
            return await users.save();
           
        } catch (error: any) {
            throw CustomError.internalServer("Something went very wrong! 🧨☠️ OJO ES ESTE ")
       
         } 
    }

    async findAllUsers(){
        try{
            return await Users.find({
                where: {
                    status: Status.ACTIVE
                }
            });
            

        } catch (error: any){
            throw CustomError.internalServer("Something went very wrong! 🧨☠️")
        }
    }

    async findUserByD(id:number){
        
            const user = await Users.findOne({
                where: {
                    id: id,
                    status: Status.ACTIVE

                }
            })

            if(!user){
              throw CustomError.notFound(`User with id ${id} not found`)  
            }

           return user; 

      
    }

    async updateUser(userData: UpdateUserDto, id: number){

        const users = await this.findUserByD(id)

        users.name = userData.name.toLowerCase().trim();
        users.email = userData.email.toLowerCase().trim()
        // users.password = userData.password.toLowerCase().trim()
        // users.role = userData.role;
        // users.status = userData.status;

        try {
            return await users.save()

        } catch (error) {
            throw CustomError.internalServer("Something went very wrong! 🧨☠️")
        }
    }


    async deleteUser(id:number){
      const users = await this.findUserByD(id) 
      // users.remove() --- así podriamos eliminar del todo el usuario.
      users.status = Status.DISABLED

      try{
        await users.save()

      } catch (error) {
        throw CustomError.internalServer("Something went very wrong! 🧨☠️")
      }
      
    }
}