import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.users.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(credentials: { username: string; password: string }) {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwt.sign({ sub: user.id });
    return { access_token: token };
  }

  async signup(credentials: { username: string; password: string }) {
    return this.users.create(credentials);
  }
}
