import { Group } from 'src/group/group.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group) => group.events, {nullable: false})
  group: Group;

  @OneToMany(() => Ticket, (ticket) => ticket.event, { nullable: true })
  tickets: Ticket[];
}
