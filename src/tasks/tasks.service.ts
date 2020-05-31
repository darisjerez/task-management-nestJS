import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
   private tasks:Task[] = [];

   getAllTasks(): Task[] {
       return this.tasks;
   }
   getTaskById(id: string):Task{
       return this.tasks.find(task => task.id == id);
   }
   deleteTaskById(id: string):void{
       this.tasks = this.tasks.filter(task => task.id !== id)
   }
   createTask(createTaskDto: CreateTaskDto): Task {
       const {title, description } = createTaskDto;
       const task: Task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN
       };
       this.tasks.push(task);
       return task;
   }
   updateTaskById(id: string, status: TaskStatus): Task{
       const task = this.getTaskById(id);
        task.status = status;
        return task;
   }
}
