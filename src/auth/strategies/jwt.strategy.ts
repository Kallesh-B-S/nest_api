import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()   
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from Bearer token in Authorization header
                ExtractJwt.fromBodyField('token'), // Extract from a body field named 'token'
            ]),
            // ignoreExpiration: true,
            secretOrKey:'abcf'
        });
    }
    validate(payLoad:any) {
        console.log("---------- jwt strategy ---------");
        console.log(payLoad);
        return payLoad
    }

}