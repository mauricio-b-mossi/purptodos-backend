import { Event } from 'src/event/event.entity';
import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event: Event;

  @ManyToOne(() => User, (user) => user.ownedtickets)
  owner: User;
}
