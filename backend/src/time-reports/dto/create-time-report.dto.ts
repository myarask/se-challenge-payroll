export class CreateTimeReportDto {}

export class UploadTimeReportDto {
  'date': string;
  'hours worked': number;
  'employee id': string;
  'job group': 'A' | 'B';
}
