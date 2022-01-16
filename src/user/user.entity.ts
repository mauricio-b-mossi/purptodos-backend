import { Exclude } from 'class-transformer';
import { Group } from 'src/group/group.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Group, (group) => group.creator)
  creator: Group[];

  @ManyToMany(() => Group)
  groups: Group[];

  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  ownedtickets: Ticket[];
}
