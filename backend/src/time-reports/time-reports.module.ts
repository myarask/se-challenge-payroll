import { Module } from '@nestjs/common';
import { TimeReportsService } from './time-reports.service';
import { TimeReportsController } from './time-reports.controller';

@Module({
  controllers: [TimeReportsController],
  providers: [TimeReportsService],
})
export class TimeReportsModule {}
