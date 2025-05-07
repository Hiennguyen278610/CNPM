import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from './local-auth.guard';
import {Public} from '@/decorator/customize';
import {CreateAuthDto} from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {v4 as uuidv4} from 'uuid';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly mailerService: MailerService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }
  // @UseGuards(JwtAuthGuard)
  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto);
  }

  @Get('mail')
  @Public()
  testMail() { 
    this.mailerService
      .sendMail({
        to: 'grissilvia06@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Title
        text: 'welcome', // plaintext body
        template: "register", // HTML body content
        context: { // Data to be sent to template engine
          name: 'Silvia',
          activationCode: uuidv4(),
          // url: 'https://www.google.com',
        },
      })
    return "Chay duoc roi ne troi oi";
  }

}
