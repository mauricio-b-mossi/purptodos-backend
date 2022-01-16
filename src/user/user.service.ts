import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto, CreateUserDto, ReturnUserDto } from './user.dto';
import {User} from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(user: CreateUserDto): Promise<ReturnUserDto> {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async getOneUser(id: number): Promise<ReturnUserDto> {
    const user: ReturnUserDto = await this.userRepository.findOneOrFail(id);
    return user;
  }

  async findOneUserByUserName(username: string): Promise<User> {
    const user: User = await this.userRepository.findOne({ username })
    return user;
  }
}
