import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    return this.authSerivce.LoginReturnUser(req.user);
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.createUser(user);
  }
}
