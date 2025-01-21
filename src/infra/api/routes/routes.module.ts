import { DynamicModule } from '@nestjs/common';
import { HealthCheckRoute } from './health/health-check.route';
import PostUploadVideoControllerModule from './upload-video/post-upload-video.module';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [HealthCheckRoute],
      imports: [PostUploadVideoControllerModule],
    };
  }
}
