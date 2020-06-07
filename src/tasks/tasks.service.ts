import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskrepository: TaskRepository
    ){}

//    getAllTasks(): Task[] {
//        return this.tasks;
//    }
//    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
//         const {status, search } = filterDto;
//         let tasks = this.getAllTasks();
//         if(status){
//             tasks= tasks.filter(task => task.status == status)
//         }
//         if(search){
//             tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
//         }
//         return tasks;
//    }
   async getTaskById(id: number):Promise<TaskEntity>{
        const task = await this.taskrepository.findOne(id);
        if (!task) {
            throw new NotFoundException(`Task not found using ${id} as provided`);
        }
        return task;
    }
//    deleteTaskById(id: string):void{
//        const taskToDelete = this.getTaskById(id)
//        this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
//    }
//    createTask(createTaskDto: CreateTaskDto): Task {
//        const {title, description } = createTaskDto;
//        const task: Task = {
//         id: uuid(),
//         title,
//         description,
//         status: TaskStatus.OPEN
//        };
//        this.tasks.push(task);
//        return task;
//    }
//    updateTaskById(id: string, status: TaskStatus): Task{
//        const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//    }
}
