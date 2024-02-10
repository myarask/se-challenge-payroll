import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { TimeReportsService } from './time-reports.service';
import { CreateTimeReportDto } from './dto/create-time-report.dto';
import Papa from 'papaparse';
import { getISODate } from 'src/utils/dates';

@Controller('time-reports')
export class TimeReportsController {
  constructor(private readonly timeReportsService: TimeReportsService) {}

  @Get()
  findAll() {
    return this.timeReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeReportsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeReportsService.remove(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'csv' })
        .build({ fileIsRequired: true }),
    )
    file: Express.Multer.File,
  ) {
    // Get the time report id from the file name
    const filenameParts = file.originalname
      .toLowerCase()
      .replace('.csv', '')
      .split('-');
    const timeReportId = +filenameParts[filenameParts.length - 1];

    // Ensure the report is not already saved
    if (await this.timeReportsService.findOne(timeReportId)) {
      throw new BadRequestException(
        `Time report id ${timeReportId} has already been uploaded`,
        { description: 'Time report id must be unique' },
      );
    }

    // Read the CSV file
    const content = await Papa.parse(file.buffer.toString(), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    // Format the CSV content
    const entries = (content.data as CreateTimeReportDto['entries']).map(
      (row) => {
        return {
          date: getISODate(row['date']),
          hoursWorked: row['hours worked'],
          employeeId: row['employee id'],
          jobGroupId: row['job group'],
        };
      },
    );

    return this.timeReportsService.create({
      id: timeReportId,
      entries,
    });
  }
}
