import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatutes = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any){

        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status for the task`)
        }
        
        return value;
    }
   

    private isStatusValid(status: any){
        const indexStatus = this.allowedStatutes.indexOf(status);
        return ~indexStatus !== 0;

    }
    
    
}