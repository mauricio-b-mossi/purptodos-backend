import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/jwt.guard';
import { CreateUserDto, ReturnUserDto } from './user/user.dto';
import { UserService } from './user/user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(JwtGuard)
  // @Get()
  // async getRequestUser(@Request() req): Promise<any> {
  //   return req.user;
  // }

  @Get()
  sayHi(): string{
    return 'Hi'
  } 


}
