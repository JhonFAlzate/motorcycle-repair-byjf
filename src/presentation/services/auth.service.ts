import { Users } from "../../data";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { CustomError } from "../../domain";
import { bcryptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { EmailService } from "./email.service";
import { publicDecrypt } from "crypto";

enum Role {
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE",
}

enum Status {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export class AuthService {

  constructor(
    private readonly emailService: EmailService
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    const existUser = await Users.findOne({
      where: {
        email: registerUserDto.email,
        status: Status.ACTIVE,
      },
    });
    if (existUser) throw CustomError.badRequest("Emai. already exist");

    const user = new Users();
    user.name = registerUserDto.name;
    user.email = registerUserDto.email;
    user.password = bcryptAdapter.hash(registerUserDto.password);
    user.role = registerUserDto.role;

    try {
      await user.save();

      await this.sendEmailValidationLink( user.email)

      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        token,
        user,
      };
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }

  public sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({email})
    if( !token) throw CustomError.internalServer('Error getting token')

      const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
      const html = `
       <h1> Validate your email </h1>
       <p> Click on the following link to validate your email</p>
       <a href="${ link}"> Validate your email: ${email}</a>
     ` 

   

    const inSent = this.emailService.sendEmail({
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    })

    if (!inSent) throw CustomError.internalServer('Error sending email');

    return true
  }

public validateEmail = async(token: string) => {

}


}

