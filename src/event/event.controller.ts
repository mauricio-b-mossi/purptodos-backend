import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { ReturnGroupDto } from 'src/group/group.dto';
import { CreateEventDto, ReturnEventDto } from './event.dto';
import { EventService } from './event.service';

interface groupIdInterface {
  groupId: number;
}

@UseGuards(JwtGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // Currently only CREATOR  can create events
  @Post()
  async createEvent(
    @Request() req,
    @Body() event: CreateEventDto,
  ): Promise<ReturnEventDto> {
    const id = req.user.userId;
    return this.eventService.createEvent(id, event);
  }

  //Add pagination maybe
  @Get()
  async getAllEvents(): Promise<ReturnEventDto[]> {
    return this.eventService.getAllEvents();
  }

  // Havent used  (Maybe pass this to group)
  @Get('/:id')
  async getAllGroupEvents(@Param('id') id: number): Promise<ReturnEventDto[]> {
    return this.eventService.getAllGroupEvents(id);
  }

  // The id is the event ID
  // Parts: req body, eventId, and groupId
  @Post('/:id')
  async deleteEvent(
    @Request() req,
    @Param('id') eventId: number,
    @Body() groupId: groupIdInterface,
  ): Promise<ReturnEventDto> {
    const userId = req.user.userId
    console.log(`Group ID : ${groupId.groupId}. User ID: ${userId}`);
    return this.eventService.deleteEvent(userId, groupId.groupId, eventId);
  }
}
