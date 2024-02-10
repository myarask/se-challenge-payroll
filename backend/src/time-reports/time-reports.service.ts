import { Injectable } from '@nestjs/common';
import { CreateTimeReportDto } from './dto/create-time-report.dto';
import { UpdateTimeReportDto } from './dto/update-time-report.dto';

@Injectable()
export class TimeReportsService {
  create(createTimeReportDto: CreateTimeReportDto) {
    return 'This action adds a new timeReport';
  }

  findAll() {
    return `This action returns all timeReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeReport`;
  }

  update(id: number, updateTimeReportDto: UpdateTimeReportDto) {
    return `This action updates a #${id} timeReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeReport`;
  }
}
