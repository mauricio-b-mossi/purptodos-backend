import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTodoDto, EditTodoDto, ReturnTodoInterface } from './todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  async getUserTodos(userId: number): Promise<ReturnTodoInterface[]> {
    const todos = await this.todoRepository.manager.query(
      `SELECT * FROM todo WHERE userId = ${userId}`,
    );
    return todos;
  }

  async createTodo(
    userId: number,
    todo: CreateTodoDto,
  ): Promise<ReturnTodoInterface> {
    const user = await this.userService.getOneUser(userId);
    const newTodo = await this.todoRepository.create({
      title: todo.title,
      body: todo.body,
      user: user,
    });
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async getOneTodo(
    userId: number,
    todoId: number,
  ): Promise<ReturnTodoInterface> {
    const todo = await this.verifyOwner(userId, todoId);
    return todo;
  }

  async editOneTodo(
    userId: number,
    todoId: number,
    todo: EditTodoDto,
  ): Promise<ReturnTodoInterface> {
    await this.verifyOwner(userId, todoId);
    const newTodo = this.todoRepository.create({
      id: todo.id,
      title: todo.title,
      body: todo.body,
    });

    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async deleteTodo(
    userId: number,
    todoId: number,
  ): Promise<ReturnTodoInterface> {
    const todo = await this.verifyOwner(userId, todoId);

    await this.todoRepository.remove(todo);

    return todo;
  }

  // Helper
  async verifyOwner(userId: number, todoId: number): Promise<Todo> {
    const todo = await this.todoRepository.manager.query(
      `SELECT * FROM todo WHERE id = ${todoId} AND userId = ${userId} LIMIT 1`,
    );
    if (todo.length < 1) throw new UnauthorizedException();
    return todo[0];
  }
}
