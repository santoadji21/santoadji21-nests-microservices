import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from '../users/users.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email' });
  }
  async validate(username: string, password: string): Promise<any> {
    try {
      return await this.userService.verifyUser(username, password);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
