import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthCheckRoute {
  constructor() {}

  @Get()
  async execute() {
    return {
      success: true,
    };
  }
}
