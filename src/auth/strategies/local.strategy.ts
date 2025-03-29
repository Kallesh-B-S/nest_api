import { PassportStrategy } from "@nestjs/passport";

import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService) {
        super({
            usernameField: 'email', // Specify that the username field is actually the email
            passwordField: 'password', // Specify the password field if same not necessary
          });
     }

    validate(email:string,password:string){
        const user = this.authService.validateUser({email,password});

        if(!user) throw new BadRequestException("Invalid email or password");

        return user;
    }
}