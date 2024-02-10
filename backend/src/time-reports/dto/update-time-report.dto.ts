import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeReportDto } from './create-time-report.dto';

export class UpdateTimeReportDto extends PartialType(CreateTimeReportDto) {}
export class UploadTimeReportDto extends PartialType(CreateTimeReportDto) {}
