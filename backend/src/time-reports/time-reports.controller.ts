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
  /**
   * Retrieves all time reports.
   * @returns {Promise<TimeReport[]>} A promise that resolves to an array of time reports.
   */
  findAll() {
    return this.timeReportsService.findAll();
  }

  @Get(':id')
  /**
   * Retrieves a time report by its ID.
   * @param id - The ID of the time report.
   * @returns The time report with the specified ID.
   */
  findOne(@Param('id') id: string) {
    return this.timeReportsService.findOne(+id);
  }

  @Delete(':id')
  /**
   * Removes a time report by its ID.
   * @param id - The ID of the time report to remove.
   * @returns A Promise that resolves to the removed time report.
   */
  remove(@Param('id') id: string) {
    return this.timeReportsService.remove(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  /**
   * Uploads a file and processes it to create a time report.
   * @param file - The file to be uploaded, must be a CSV file.
   * @returns The created time report.
   * @throws BadRequestException if the time report with the same id has already been uploaded.
   */
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
