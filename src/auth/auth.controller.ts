import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginPayloadDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './local.guard';
import { Request } from 'express';

@Controller()
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Get('data')
    @UseGuards(AuthGuard('jwt'))
    greet(@Req() req:Request){
        return "Hello geeting!"
    }

    @Post('login')
    // @UseGuards(AuthGuard('local'))
    @UseGuards(LocalGuard)
    login(@Body() loginPayload:LoginPayloadDTO){
        return this.authService.validateUser(loginPayload)
    }
}
