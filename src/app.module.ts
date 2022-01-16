import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { TicketModule } from './ticket/ticket.module';
import { EventService } from './event/event.service';
import { EventModule } from './event/event.module';
import config from 'dbConfig';

@Module({
  imports: [UserModule, AuthModule, GroupModule, TicketModule, EventModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
