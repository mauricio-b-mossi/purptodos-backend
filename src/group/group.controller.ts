import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateGroupDto, ReturnGroupDto } from './group.dto';
import { GroupService } from './group.service';

@UseGuards(JwtGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(
    @Request() req,
    @Body() group: CreateGroupDto,
  ): Promise<ReturnGroupDto> {
    const id = req.user.userId;
    return this.groupService.createGroup(group, id);
  }

  @Get()
  async getGroupsByCreator(@Request() req): Promise<ReturnGroupDto[]> {
    const id = req.user.userId;
    return this.groupService.findGroupByCreator(id)
  }

  // @Get()
  // async getAllGroups(): Promise<ReturnGroupDto[]> {
  //   return this.groupService.getAllGroups();
  // }
}
