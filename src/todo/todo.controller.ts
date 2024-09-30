import { Controller, Get, Post, Patch, Delete, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { TodoService } from "./todo.service";


@ApiTags('todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all todos' })
  @ApiResponse({ status: 200, description: 'List of all todos' })
  getTodos() {
    return this.todoService.getTasks(); 
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by its ID' })
  @ApiResponse({ status: 200, description: 'A single todo' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  getTodoById(@Param('id') id: number) {
    return this.todoService.getTaskById(+id); 
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: 201, description: 'The todo has been successfully created.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Learn NestJS' },
        description: { type: 'string', example: 'Go through the official documentation of NestJS' },
      },
      required: ['title', 'description'],
    },
  })
  createTodo(
    @Body() body: { title: string; description: string },
  ) {
    return this.todoService.createTask(body.title, body.description); 
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing todo' })
  @ApiResponse({ status: 200, description: 'The todo has been successfully updated.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Complete NestJS project' },
        description: { type: 'string', example: 'Complete the entire NestJS API and deploy it' },
        isCompleted: { type: 'boolean', example: true },
      },
      required: [],
    },
  })
  updateTodo(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; isCompleted?: boolean },
  ) {
    return this.todoService.updateTask(+id, body.title, body.description, body.isCompleted); 
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by its ID' })
  @ApiResponse({ status: 204, description: 'The todo has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  deleteTodoById(@Param('id') id: number) {
    this.todoService.deleteTask(+id); 
  }
}
