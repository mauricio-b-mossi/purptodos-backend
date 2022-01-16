import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from 'src/group/group.service';
import { Repository } from 'typeorm';
import { CreateEventDto, ReturnEventDto } from './event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly groupService: GroupService,
  ) {}

  // Post
  async createEvent(
    //Req id
    UserId: number,
    event: CreateEventDto,
  ): Promise<ReturnEventDto> {
    const fullGroup = await this.groupService.returnOwnerGroup(
      UserId,
      event.group,
    );
    const group = fullGroup[0];

    if (group === null) throw new UnauthorizedException();

    const newEvent = await this.eventRepository.create({
      name: event.name,
      group: group,
      tickets: event.tickets,
    });

    await this.eventRepository.save(newEvent);

    return newEvent;
  }

  // GET
  async getAllEvents(): Promise<ReturnEventDto[]> {
    const events = await this.eventRepository.find();
    return events;
  }

  // Pass to group/events
  async getAllGroupEvents(groupId: number): Promise<ReturnEventDto[]> {
    const events = await this.eventRepository.manager.query(
      `SELECT * FROM event WHERE event.groupId = ${groupId}`,
    );

    return events;
  }

  async getEventById(eventId: number): Promise<Event>{
    return this.eventRepository.findOne(eventId)
  }


  // Try route
  async deleteEvent(
    userId: number,
    groupId: number,
    eventId: number,
  ): Promise<ReturnEventDto> {
    try {
      const validateGroupId = await this.eventRepository.manager.query(
        `SELECT id FROM groupTable WHERE groupTable.id = ${groupId} AND groupTable.creatorId = ${userId}`,
      );

      if (validateGroupId.length < 1) throw new UnauthorizedException();

      const event = await this.getEventById(eventId)

      await this.eventRepository.remove(event)

      return event
    } catch (error) {
      throw error;
    }
  }
}
