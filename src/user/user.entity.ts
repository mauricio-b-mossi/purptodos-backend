import { Exclude } from 'class-transformer';
import { Todo } from 'src/todo/todo.entity';
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    unique : true
  })
  email : string

  @Column({
    unique: true
  })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({default: false})
  isActive : boolean

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];


  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(password || this.password, salt)
  }

}
