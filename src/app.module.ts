import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { TodoController } from './todo/todo.controller';
import config from 'dbConfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(config), TodoModule, ConfigModule.forRoot()],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
