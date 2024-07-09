import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { Users } from "../../data";

enum Role {
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE",
}

enum Status {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ message: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ messasge: "Invalid token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) return res.status(401).json({ messasge: "Invalid token" });

      const user = await Users.findOne({
        where: {
          id: payload.id,
          status: Status.ACTIVE,
          emailValidated: true,
        },
      });
      if (!user) return res.status(401).json({ messasge: "Invalid user" });

      req.body.sessionUser = user;

      next();
    } catch (error) {
      return res.status(500).json({ message: "Something went very wrong!" });
    }
  }

 static restrictTo = (...roles: any ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if(!roles.includes(req.body.sessionUser.role)){
        return res.status(403).json({message: 'You are not authorized to acces this route'})
      }
      next();
    }
 }
  
}
