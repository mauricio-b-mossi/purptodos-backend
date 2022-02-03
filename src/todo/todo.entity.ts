import { Person } from "src/user/user.entity";
import { Entity, Column, ManyToMany, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    body: string;

    @ManyToOne(type => Person, user => user.todos)
    user: Person;
}