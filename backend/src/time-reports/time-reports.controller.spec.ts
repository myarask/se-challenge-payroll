import { Test, TestingModule } from '@nestjs/testing';
import { TimeReportsController } from './time-reports.controller';
import { TimeReportsService } from './time-reports.service';

describe('TimeReportsController', () => {
  let controller: TimeReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeReportsController],
      providers: [TimeReportsService],
    }).compile();

    controller = module.get<TimeReportsController>(TimeReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
