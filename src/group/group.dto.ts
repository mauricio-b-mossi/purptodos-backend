import { Event } from "src/event/event.entity";
import { User } from "src/user/user.entity";

export interface ReturnGroupDto {
  creator: User;
  name: string;
  events?: Event[];
  members?: User[]
}

export interface CreateGroupDto {
  name: string;
  events?: Event[];
  members?: User[];
}

export interface GroupInterfaceDto {
  id: number;
  name: string;
  creator: User;
  events?: Event[];
  members?: User[];
}
