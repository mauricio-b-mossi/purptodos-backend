import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Person} from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';


@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
          transport: {
            service: 'gmail',
            auth: {
              // user: 'purptodos@gmail.com',
              user: configService.get('EMAIL'),
              // pass: 'legocoleDX123',
              pass: configService.get('PASSWORD'),
            },
          },
          defaults: {
            from: 'purptodos@gmail.com',
          },
      }),
      inject: [ConfigService]
    }),
    ConfigModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
