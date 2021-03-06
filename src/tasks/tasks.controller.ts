import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser()user: User): Promise<TaskEntity[]>{
        return this.tasksService.getTasks(filterDto, user);
    }
    @Get('/:id')
    getTask(
        @Param('id', ParseIntPipe) id: number
        ): Promise<TaskEntity>{
       return this.tasksService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
       @Body() createTaskDto: CreateTaskDto,
       @GetUser() user: User
    ): Promise<TaskEntity>{
        return this.tasksService.createTask(createTaskDto, user);
    }
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id:number):Promise<void>{
       return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<TaskEntity> {
        return this.tasksService.updateTaskById(id, status);
    }
}
