import { regularExps } from "../../../config"

enum Role {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE"
}

export class RegisterUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string | Role
      
    ){}

    static createUser ( object: {[key: string]: string | Role}): [string?, RegisterUserDto?]{
        const {name, email, password, role} = object

        if (!name) return ['Missing name']
        if (!email) return ['Missing email']
        if ( !regularExps.email.test( email)) return ['Invalid email']
        if (!password) return ['Missing pasword']
        if (!regularExps.password.test( password)) return ['The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character']
        if (!role) return ['Missing role']
        if (!(role === 'CLIENT' || role === 'EMPLOYEE')) return ['only accepts - CLIENT - or - EMPLOYEE -']

        return [undefined, new RegisterUserDto(name, email, password, role)]

    }
}