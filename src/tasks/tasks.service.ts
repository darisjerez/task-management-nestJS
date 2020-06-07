import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskrepository: TaskRepository
    ){}

   async getTasks(filterDto:GetTasksFilterDto): Promise<TaskEntity[]>{
        return await this.taskrepository.getTasks(filterDto);
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
   async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
       return this.taskrepository.createTask(createTaskDto)
   }

   async updateTaskById(id: number, status: TaskStatus): Promise<TaskEntity>{
       const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
   }
}
