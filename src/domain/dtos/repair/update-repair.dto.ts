
enum Status {
    
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
    
}

export class UpdateRepairDto {

    constructor(
        public readonly status: Status
         
    ){}

    static updateRepair( object: {[key: string]: any}): [string?, UpdateRepairDto?]{

        const {status} = object;

        if (!status) return ['Missing status', undefined]
       
        return [undefined, new UpdateRepairDto(status)]
    }
} 