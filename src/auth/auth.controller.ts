import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTokenGuard } from './api-token.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  async createToken(
    @Body('maxRequests') maxRequests: number,
  ) {
    return this.authService.createToken(maxRequests ?? 10);
  }

  @Get('token/:idToken')
  async getUserToken(
    @Param('idToken') idToken: string,
  ) {
    return this.authService.getUserToken(idToken);
  }

  @Patch('token/reduce/:idToken') 
  async reduceToken(
    @Param('idToken') idToken: string,
  ) {
    return this.authService.ReduceToken(idToken);
  }
}