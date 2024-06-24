

export class UpdateUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string
    ){}

    static updateUser(object: {[key:string]: string}): [string?, UpdateUserDto?] {

        const {name, email} = object;

        if (!name) return ['Missing name']
        if (!email) return ['Missing email']

        return [undefined, new UpdateUserDto(name, email)]
    }
}