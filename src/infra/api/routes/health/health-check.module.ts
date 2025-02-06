import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { EnvironmentService } from 'src/config/environment/environment.service';

@Module({
  controllers: [HealthCheckController],
  providers: [
    {
      provide: 'EnvironmentServicePort',
      useClass: EnvironmentService,
    },
  ],
})
export default class HealthCheckControllerModule {}
