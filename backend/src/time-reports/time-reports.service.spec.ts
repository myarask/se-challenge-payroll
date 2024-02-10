import { Test, TestingModule } from '@nestjs/testing';
import { TimeReportsService } from './time-reports.service';

describe('TimeReportsService', () => {
  let service: TimeReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeReportsService],
    }).compile();

    service = module.get<TimeReportsService>(TimeReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
