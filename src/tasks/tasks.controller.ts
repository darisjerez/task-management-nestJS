import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string): Task{
       return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(
       @Body() createTaskDto: CreateTaskDto
    ): Task{
        return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string):string{
        this.tasksService.deleteTaskById(id);
        return "Task Removed";
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskById(id, status);
    }
}
