
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '@/modules/account/account.service';
import {comparePasswordUtil} from '@/Util/helper';
import { JwtService } from '@nestjs/jwt';
import {CreateAuthDto} from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMail(username);
    const isValidPassword = await comparePasswordUtil(pass, user!.password);
    if (!user || !isValidPassword) return null;
    return user
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register = async (registerDto: CreateAuthDto) => {
    return this.usersService.handleRegister(registerDto);
  }
}