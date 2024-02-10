import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeReportsModule } from './time-reports/time-reports.module';

@Module({
  imports: [TimeReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
