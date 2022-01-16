import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReturnUser, ReturnUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.findOneUserByUserName(username);

    if (user && user.password == password) {
      return user;
    }

    return null;
  }

  async login(user: ReturnUserDto) {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }


  async LoginReturnUser(user: ReturnUserDto): Promise<LoginReturnUser> {
    const {access_token} = await this.login(user);
    return {username: user.username, id: user.id, access_token}
  }

}
