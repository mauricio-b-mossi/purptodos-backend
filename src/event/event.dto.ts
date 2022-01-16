import { Group } from "src/group/group.entity";
import { Ticket } from "src/ticket/ticket.entity";

export interface ReturnEventDto{
    id: number;
    name: string;
    group: Group 
}

export interface CreateEventDto{
    name: string;
    group: number; //probably send the group ID
    tickets?: Ticket[]
}