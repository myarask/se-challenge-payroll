import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getPayroll() {
    return 'This action adds a new report';
  }
}
