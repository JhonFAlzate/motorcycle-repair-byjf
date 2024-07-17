import { json } from "stream/consumers";
import { Repairs, Users } from "../../data";
import { CreateRepairDto, CustomError, UpdateRepairDto } from "../../domain";
import { UserService } from "./user.service";
// import { protectAccountOwner } from "../../config/validate-owner";

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export class RepairsService {
  constructor(public readonly userService: UserService) {}

  async createRepairs(repairData: CreateRepairDto) {
    const repair = new Repairs();

    const user = await this.userService.findUserByD(repairData.userId);

    // if(!validateUser) throw CustomError.internalServer('CLIENTE NO EXISTE')

    repair.date = repairData.date;
    repair.status = Status.PENDING;

    repair.user = user;

    repair.motorsNumber = repairData.motorsNumber;
    repair.description = repairData.description;

    return await Repairs.findOne({
      where: {
        motorsNumber: repair.motorsNumber,
      },
    })

      .then((motorN) => {
        if (motorN) {
          return Promise.reject(
            CustomError.badRequest("Motor number already existing")
          );
        }
        return repair.save();
      })
      .then((motorN) => motorN)
      //
      .catch((error) => {
        return Promise.reject(error);
      });

    // try {
    //   return await repair.save();
    // } catch (error: any) {
    //   throw CustomError.internalServer("Something went very wrong! 🧨☠️ ");
    // }
  }

  async findAllRepairs() {
    try {
      return await Repairs.find({
        where: {
          status: Status.PENDING,
        },
        relations: ['user'],
        select: {
          user: {
            id: true,
            name: true,
            email: true,
          }
        }
      });
    } catch (error: any) {
      throw CustomError.internalServer("Something went very wrong! 🧨☠️");
    }
  }

  async findRepairByd(id: number) {
    const repair = await Repairs.findOne({
      where: {
        id: id,
        status: Status.PENDING,
      },
      relations: ['user'],
    });

    if (!repair) {
      throw CustomError.notFound(`repair with id ${id} not found`);
    }

    return repair;
  }

  //en este update estamos cambiando el estado de reparacion a completada, por eso no la vemos de nuevo.

  async updateRepair(repairData: UpdateRepairDto, id: number) {
    const repair = await this.findRepairByd(id);

    repair.status = repairData.status;

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨☠️");
    }
  }

  async deleteRepair(id: number) {
    const repair = await this.findRepairByd(id);

    // const isOwner = protectAccountOwner(repair.user.id)
    // console.log(repair)
    repair.status = Status.CANCELLED;
   

    try {
      return await repair.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨☠️");
    }
  }
}
