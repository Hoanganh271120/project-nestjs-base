/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";

import _ from "lodash";
import { LoggingService } from "src/common/logging/logging.service";

@Controller('export')
@ApiTags('Export Assignment')
@ApiBearerAuth()
export class ExportAssignmentController {

    constructor( private logger: LoggingService ) {}

    @Post('assignment')
    @HttpCode(200)
    @ApiOperation({ summary: 'Export Team Assignment to Excel' })
    @ApiOkResponse({ status: 200, description: 'Successfully Exported Team Assignment List to Excel' })
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: { exposeDefaultValues: true } })) //instantiate ExportAssignmentFilter class to use the default values if not present in body
    public async exportAssignment(@Res({ passthrough: true }) res: Response, @Body() exportAssignmentFilter: {}): Promise<any> {
        try {
            // code
            }
         catch (error) {
            console.error(error);
            this.logger.getLogger().error(error, { label: ExportAssignmentController.name });
            this.logger.getLogger().info(`Dossier Auto-Assign is triggered for event ID`);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}