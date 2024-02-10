import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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

  findAllEntries() {
    return this.prisma.timeReportEntry.findMany();
  }

  findOne(id: number) {
    return this.prisma.timeReport.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.timeReport.delete({
      include: { entries: true },
      where: { id },
    });
  }
}
