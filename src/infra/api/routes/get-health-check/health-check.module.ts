import { Module } from '@nestjs/common';
import { HealthCheckRoute } from './health-check.controller';
import { EnvironmentService } from 'src/config/environment/environment.service';

@Module({
  controllers: [HealthCheckRoute],
  providers: [
    {
      provide: 'EnvironmentServicePort',
      useClass: EnvironmentService,
    },
  ],
})
export default class HealthCheckRouteModule {}
