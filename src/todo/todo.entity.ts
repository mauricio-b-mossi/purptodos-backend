import { User } from "src/user/user.entity";
import { Entity, Column, ManyToMany, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(type => User, user => user.todos)
    user: User;
}