import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {StatusService} from "./status.service";
import {Status} from "./status.entity";

@Controller('status')
export class StatusController {
    constructor(
        private statusService: StatusService
    ) {}

    @Get(':statusId')
    getStatusById(@Param() params): Promise<Status> {
        return this.statusService.findById(params.statusId)
    }

    @Put()
    createStatus(@Body() status: Status): Promise<Status> {
        return this.statusService.create(status)
    }

    @Patch(':statusId')
    updateStatus(@Param() params, @Body() status: Status): Promise<Status> {
        return this.statusService.update(params.statusId, status)
    }

    @Delete(':statusId')
    deleteStatus(@Param() params): Promise<void> {
        return this.statusService.delete(params.statusId)
    }
}
