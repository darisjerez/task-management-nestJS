/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Repository, EntityRepository } from "typeorm";
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]>{
        const { search, status } = filterDto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`})
        }
        const tasks = query.getMany();
        return tasks;

    }
   async createTask(createtaskdto:CreateTaskDto){
        const {title, description } = createtaskdto;

        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN
        await task.save();

        return task;
    }

}