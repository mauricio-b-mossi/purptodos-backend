import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';
import { LoginReturnUser, ReturnUserDto, CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authSerivce: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(@Request() req): Promise<LoginReturnUser> {
    log('Enpoint hit');
    return this.authSerivce.LoginReturnUser(req.user);
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.createUser(user);
  }

  @Post('send')
  async sendUserConfirmation(@Body() user: CreateUserDto) {
    // Endpoint Hit
    console.log('Endpoint Hit. Email cooking')
    return this.userService.sendUserConfirmation(user);
  }

  @Get('confirmation/:jwt')
  async emailConfirmation(@Param('jwt') jwt : string) {
    return this.userService.emailConfirmation(jwt)
  }
}
