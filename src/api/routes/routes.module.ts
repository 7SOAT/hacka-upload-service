import { DynamicModule } from '@nestjs/common';
import { HealthCheckRoute } from './health/health-check.route';
import { PostFrameExtractorRoute } from './frame-extractor/post-frame-extractor.route';
import { FrameExtractorController } from '@controllers/frame-extractor.controller';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [HealthCheckRoute, PostFrameExtractorRoute],
      providers: [
        {
          provide: 'FrameExtractorControllerPort',
          useClass: FrameExtractorController,
        },
      ],
      exports: ['FrameExtractorControllerPort'],
    };
  }
}
