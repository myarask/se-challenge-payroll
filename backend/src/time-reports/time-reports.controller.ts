import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeReportsService } from './time-reports.service';
import { CreateTimeReportDto } from './dto/create-time-report.dto';
import { UpdateTimeReportDto } from './dto/update-time-report.dto';

@Controller('time-reports')
export class TimeReportsController {
  constructor(private readonly timeReportsService: TimeReportsService) {}

  @Post()
  create(@Body() createTimeReportDto: CreateTimeReportDto) {
    return this.timeReportsService.create(createTimeReportDto);
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
  update(@Param('id') id: string, @Body() updateTimeReportDto: UpdateTimeReportDto) {
    return this.timeReportsService.update(+id, updateTimeReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeReportsService.remove(+id);
  }
}
