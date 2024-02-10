import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TimeReportsService } from 'src/time-reports/time-reports.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, TimeReportsService, PrismaService],
})
export class ReportsModule {}
