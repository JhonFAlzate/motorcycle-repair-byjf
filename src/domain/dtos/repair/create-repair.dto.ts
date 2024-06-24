

export class CreateRepairDto {

    constructor(
        public readonly date: Date,
        public readonly userId: number  
    ){}

    static createRepair( object: {[key: string]: any}): [string?, CreateRepairDto?]{

        const {date, userId} = object;

        if (!date) return ['Missing date', undefined]
        if (!userId) return ['Missing userid']

        return [undefined, new CreateRepairDto(date, userId)]
    }
}