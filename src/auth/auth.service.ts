import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginReturnUser, ReturnUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Performed on Login
  async validateUser(
    username: string,
    password: string,
  ): Promise<ReturnUserDto> {
    const user = await this.userService.findOneUserByUserName(username);


    if (!user) throw new UnauthorizedException()

    

    if (!user.isActive) throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: 'Activate your account via email'
    }, HttpStatus.BAD_REQUEST)
    

    
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    
    console.log('Exit validate');
    

    return null;
  }

  // Returns jwt
  async login(user: ReturnUserDto) {
    const payload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }


  // Returns jwt to be saved in the users browser as localstorage
  async LoginReturnUser(user: ReturnUserDto): Promise<LoginReturnUser> {
    const {access_token} = await this.login(user);
    return {username: user.username, id: user.id, access_token}
  }


}
