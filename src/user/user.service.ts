import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, ReturnUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
// import { confirmationSecret } from 'jwtConstants';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) { }

  
  
  async getAllUsers(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser({
    username,
    password,
    email,
  }: CreateUserDto): Promise<ReturnUserDto> {

    try {
         const newUser = await this.userRepository.create({
           username,
           password,
           email,
         });

         await this.userRepository.save(newUser);

      await this.sendUserConfirmation(newUser);
      
      return newUser
    } catch (error) {
      throw error
    }
 
  }

  async getOneUser(id: number): Promise<ReturnUserDto> {
    const user: ReturnUserDto = await this.userRepository.findOneOrFail(id);
    return user;
  }

  async findOneUserByUserName(username: string): Promise<User> {
    const user: User = await this.userRepository.findOne({ username });
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  // TODO: MAILERS
  async sendUserConfirmation({ email, username }: CreateUserDto) {

    const confirmationSecret = this.configService.get<string>(
      'CONFIRMATION_SECRET',
    );

    const url = this.configService.get<string>('FRONTEND_URL')

    const token = jwt.sign({ username: username }, confirmationSecret, {
      expiresIn: '1h',
    });

    

    const link = url + 'auth/confirmation/' + token 

    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Purp Todos App! Confirm your Email',
      text: `Hi ${username}.\n\nClick the link below account: \n${link}`,
    });
  }


  async emailConfirmation(userJwt: string) {

    const confirmationSecret = this.configService.get<string>(
      'CONFIRMATION_SECRET',
    );

    try {
      const decoded  = jwt.verify(userJwt, confirmationSecret);
      
      const { username }: any = decoded;

      const user = await this.findOneUserByUserName(username)

      console.log(user)

      user.isActive = true

      await this.userRepository.save(user)

      return 'Account Succesfully Activated'
      
    
    } catch (error) {
      throw new BadRequestException();
    }
  }
}


