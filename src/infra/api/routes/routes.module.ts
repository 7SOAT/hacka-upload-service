import { DynamicModule } from '@nestjs/common';

import HealthCheckRouteModule from '@routes/get-health-check/health-check.module';
import GetPreSignedUrlRouteModule from '@routes/get-presigned-url/get-presigned-url.module';
import PostUploadVideoRouteModule from '@routes/post-upload-video/post-upload-video.module';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [],
      imports: [
        PostUploadVideoRouteModule,
        HealthCheckRouteModule,
        GetPreSignedUrlRouteModule,
      ],
    };
  }
}
