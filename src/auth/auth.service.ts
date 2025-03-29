import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginPayloadDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

const users = [
    {
        id:1,
        email:"email1",
        password:"password1"
    },
    {
        id:2,
        email:"email2",
        password:"password2"
    }
]

@Injectable()
export class AuthService {

    constructor(private readonly jwtService:JwtService){}

    validateUser({email, password}:LoginPayloadDTO){
        const findUser = users.find((user)=>user.email === email)
        if(!findUser){
            throw new BadRequestException("Invalid username or password");
        }

        if(findUser.password === password){
            const {password, ...user} = findUser;
             return this.jwtService.sign(user)
        }

        return null

    }
}
