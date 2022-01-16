import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDto, GroupInterfaceDto, ReturnGroupDto } from './group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    private readonly userService: UserService,
  ) {}

  // Block this route
  async getAllGroups(): Promise<ReturnGroupDto[]> {
    const groups = await this.groupRepository.find();
    return groups;
  }

  async createGroup(
    group: CreateGroupDto,
    id: number,
  ): Promise<ReturnGroupDto> {
    const user = await this.userService.getOneUser(id);
    const newGroup = await this.groupRepository.create({
      creator: user,
      name: group.name,
      events: group.events,
      members: group.members,
    });
    await this.groupRepository.save(newGroup);
    return newGroup;
  }

  // Get creator's groups
  async findGroupByCreator(id: number): Promise<any> {
    return this.groupRepository.manager.query(
      `SELECT * FROM groupTable WHERE creatorID = ${id}`,
    );
  }

  //Returns the ids of the groups of the creator
  
  // SELECT id FROM groupTable where groupTable.creatorId = 2

  async returnOwnerGroup(id: number, groupId: number): Promise<Group> {
    return this.groupRepository.manager.query(
      `SELECT * FROM groupTable WHERE groupTable.id = ${groupId} AND creatorId = ${id} LIMIT 1`,
    );
  }

  async finGroupById(id: number): Promise<GroupInterfaceDto> {
    const oneGroup = await this.groupRepository.findOne(id);
    return oneGroup;
  }
}
