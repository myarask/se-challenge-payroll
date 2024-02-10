import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { TimeReportsService } from './time-reports.service';
import { CreateTimeReportDto } from './dto/create-time-report.dto';
import Papa from 'papaparse';
import {
  UpdateTimeReportDto,
  UploadTimeReportDto,
} from './dto/update-time-report.dto';
import { getISODate } from 'src/utils/dates';

@Controller('time-reports')
export class TimeReportsController {
  constructor(private readonly timeReportsService: TimeReportsService) {}

  @Post()
  create(@Body() createTimeReportDto: CreateTimeReportDto) {
    return 'Not implemented';
  }

  @Get()
  findAll() {
    return this.timeReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeReportsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeReportDto: UpdateTimeReportDto,
  ) {
    return this.timeReportsService.update(+id, updateTimeReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeReportsService.remove(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(
    @Body() body: UploadTimeReportDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    // Get the time report id from the file name
    const filenameParts = file.originalname
      .toLowerCase()
      .replace('.csv', '')
      .split('-');
    const timeReportId = +filenameParts[filenameParts.length - 1];

    // Parse the CSV file
    const content = await Papa.parse(file.buffer.toString(), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    // Format the data
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

    console.log(entries);

    return this.timeReportsService.create({
      id: timeReportId,
      entries,
    });
  }
}
