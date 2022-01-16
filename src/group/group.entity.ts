import { Event } from "src/event/event.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "groupTable"})
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

    @OneToMany(() => Event, (event) => event.group, {
      nullable: true
  })
  events: Event[];

  @ManyToOne(() => User, (user) => user.creator, {onDelete: 'CASCADE'})
  @JoinColumn() //Each group will have a creator therefore the JC
  creator: User;

  @ManyToMany(() => User, {nullable: true})
  @JoinTable()
  members: User[];
}