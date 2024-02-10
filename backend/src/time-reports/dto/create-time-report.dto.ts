export class CreateTimeReportDto {
  id: number;
  entries: {
    date: string;
    'hours worked': number;
    'employee id': number;
    'job group': string;
  }[];
}
