/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Repository, EntityRepository } from "typeorm";
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<TaskEntity[]>{
        const { search, status } = filterDto;

        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id})

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`})
        }
        const tasks = query.getMany();
        return tasks;

    }
   async createTask(createtaskdto:CreateTaskDto, user: User){
        const {title, description } = createtaskdto;

        const task = new TaskEntity();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

        await task.save();

        delete task.user;

        return task;
    }

}