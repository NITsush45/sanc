import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('signup') signup(@Body() dto: { username: string; password: string }) {
    return this.auth.signup(dto);
  }
  @Post('login') login(@Body() dto: { username: string; password: string }) {
    return this.auth.login(dto);
  }
}
