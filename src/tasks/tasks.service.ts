import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskrepository: TaskRepository
    ){}

   async getTasks(filterDto:GetTasksFilterDto, user: User): Promise<TaskEntity[]>{
        return await this.taskrepository.getTasks(filterDto, user);
    }
   async getTaskById(id: number):Promise<TaskEntity>{
        const task = await this.taskrepository.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task not found using ${id} as provided`);
        }
        return task;
    }
   async deleteTaskById(id: number):Promise<void>{
       const operation = await this.taskrepository.delete(id);
        
       if (operation.affected === 0) {
            throw new NotFoundException(`Task not found using ${id} as provided`);
       }
     
   }
   async createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
       return this.taskrepository.createTask(createTaskDto, user)
   }

   async updateTaskById(id: number, status: TaskStatus): Promise<TaskEntity>{
       const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
   }
}
