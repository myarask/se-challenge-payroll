import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateTimeReportDto } from './dto/update-time-report.dto';

@Injectable()
export class TimeReportsService {
  constructor(private prisma: PrismaService) {}

  create({
    id,
    entries,
  }: {
    id: number;
    entries: {
      date: string;
      hoursWorked: number;
      employeeId: number;
      jobGroupId: string;
    }[];
  }) {
    return this.prisma.timeReport.create({
      include: { entries: true },
      data: {
        id,
        entries: {
          create: entries,
        },
      },
    });
  }

  findAll() {
    return this.prisma.timeReport.findMany();
  }

  findOne(id: number) {
    return this.prisma.timeReport.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateTimeReportDto) {
    // return this.prisma.timeReport.update({ where: { id }, data });
    return 'todo';
  }

  remove(id: number) {
    return this.prisma.timeReport.delete({
      include: { entries: true },
      where: { id },
    });
  }
}
