import { DynamicModule } from '@nestjs/common';

import PostUploadVideoControllerModule from './upload-video/post-upload-video.module';
import HealthCheckControllerModule from './health/health-check.module';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [],
      imports: [PostUploadVideoControllerModule, HealthCheckControllerModule],
    };
  }
}
