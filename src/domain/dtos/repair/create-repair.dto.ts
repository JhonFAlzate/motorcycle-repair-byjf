

export class CreateRepairDto {

    constructor(
        public readonly date: Date,
        public readonly userId: number,
        public readonly motorsNumber: string,
        public readonly description: string  
    ){}

    static createRepair( object: {[key: string]: any}): [string?, CreateRepairDto?]{

        const {date, userId, motorsNumber, description} = object;

        if (!date) return ['Missing date', undefined]
        if (!userId) return ['Missing user id']
        if (!motorsNumber) return ['Missing motor Number']
        if (!description) return ['Missing description']

        return [undefined, new CreateRepairDto(date, userId, motorsNumber, description)]
    }
}