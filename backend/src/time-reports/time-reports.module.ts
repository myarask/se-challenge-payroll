import { Module } from '@nestjs/common';
import { TimeReportsService } from './time-reports.service';
import { TimeReportsController } from './time-reports.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TimeReportsController],
  providers: [TimeReportsService, PrismaService],
})
export class TimeReportsModule {}
