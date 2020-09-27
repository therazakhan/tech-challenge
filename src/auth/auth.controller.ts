import {
    Controller,
    Post,
    Request,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      try {
        return await this.authService.login(req.user);
      } catch {
        throw new InternalServerErrorException();
      }
    }
  }
  