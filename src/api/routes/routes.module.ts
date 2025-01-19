import { DynamicModule } from '@nestjs/common';
import { HealthCheckRoute } from './health/health-check.route';
import { PostFrameExtractorRoute } from './frame-extractor/post-frame-extractor.route';
import { FrameExtractorController } from '@controllers/frame-extractor.controller';
import { S3ClientProvider } from 'src/interface/providers/s3client.provider';
import { SqsClientProvider } from 'src/interface/providers/sqs-client.provider';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [HealthCheckRoute, PostFrameExtractorRoute],
      providers: [
        {
          provide: 'FrameExtractorControllerPort',
          useFactory: () => {
            const s3ClientProvider = new S3ClientProvider();
            const sqsClientProvider = new SqsClientProvider();
            return new FrameExtractorController(
              s3ClientProvider,
              sqsClientProvider,
            );
          },
        },
      ],
      exports: ['FrameExtractorControllerPort'],
    };
  }
}
