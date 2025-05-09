import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import {IS_PUBLIC_KEY} from '@/decorator/customize';
import {Reflector} from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
          return super.canActivate(context);
    }
    
    handleRequest(err, user, info) {
        if (err || !user) {throw err || new UnauthorizedException('Access Token không hợp lệ');}
        return user;
    }
}
