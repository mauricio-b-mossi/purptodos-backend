import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto, EditTodoDto, ReturnTodoInterface } from './todo.dto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getUserTodos(@Request() req): Promise<ReturnTodoInterface[]> {
    const userId = req.user.userId;
    // console.log(userId);
    return await this.todoService.getUserTodos(userId);
  }

  @Post()
  async createTodo(
    @Request() req,
    @Body() todo: CreateTodoDto,
  ): Promise<ReturnTodoInterface> {
    const userId = req.user.userId;
    return await this.todoService.createTodo(userId, todo);
  }

  @Get('/:todoId')
  async getOneTodo(
    @Request() req,
    @Param('todoId') todoId: number,
  ): Promise<ReturnTodoInterface> {
    const userId = req.user.userId;
    return await this.todoService.getOneTodo(userId, todoId);
  }

  @Put('/:todoId')
  async editOneTode(
    @Request() req,
    @Param('todoId') todoId: number,
    @Body() todo: EditTodoDto,
  ): Promise<ReturnTodoInterface> {
      console.log('hit');
      
       const userId = req.user.userId;
      return await this.todoService.editOneTodo(userId, todoId, todo);
  }

  @Delete('/:todoId')
  async deleteTodo(
    @Request() req,
    @Param('todoId') todoId: number,
  ): Promise<ReturnTodoInterface> {
    const userId = req.user.userId;
    return await this.todoService.deleteTodo(userId, todoId);
  }
}
