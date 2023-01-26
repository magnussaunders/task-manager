import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {PriorityService} from "./priority.service";
import {Priority} from "./priority.entity";

@Controller('priority')
export class PriorityController {
    constructor(
        private priorityService: PriorityService
    ) {}

    @Get(':priorityId')
    getPriorityById(@Param() params): Promise<Priority> {
        return this.priorityService.findById(params.priorityId)
    }

    @Put()
    createPriority(@Body() priority: Priority): Promise<Priority> {
        return this.priorityService.create(priority)
    }

    @Patch(':priorityId')
    updatePriority(@Param() params, @Body() priority: Priority): Promise<Priority> {
        return this.priorityService.update(params.priorityId, priority)
    }

    @Delete(':priorityId')
    deletePriority(@Param() params): Promise<void> {
        return this.priorityService.delete(params.priorityId)
    }
}
