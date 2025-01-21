import { DynamicModule } from '@nestjs/common';
import { HealthCheckRoute } from './health/health-check.route';
import { PostUploadVideoController } from './upload-video/post-upload-video.controller';

import { UploadVideoGateway } from 'src/adapters/gateways/upload-video.gateway';
import { UploadVideoRepository } from 'src/infra/repositories/upload-video.repository';
import { S3ClientDataSource } from 'src/infra/data-sources/s3-client.data-source';
import { S3ClientDataSourcePort } from 'src/infra/data-sources/ports/s3-client.data-source.port';
import { UploadVideoUseCase } from 'src/application/use-cases/upload-video.usecase';

export default class RoutesModule {
  static register(): DynamicModule {
    return {
      module: this,
      controllers: [HealthCheckRoute, PostUploadVideoController],
      providers: [
        {
          provide: 'S3ClientDataSourcePort',
          useClass: S3ClientDataSource,
        },
        {
          provide: 'UploadVideoGateway',
          useFactory: (_dataSource: S3ClientDataSourcePort) => {
            return new UploadVideoRepository(_dataSource);
          },
          inject: ['S3ClientDataSourcePort'],
        },
        {
          provide: 'UploadVideoUseCasePort',
          useFactory: (_uploadVideoRepository: UploadVideoGateway) => {
            return new UploadVideoUseCase(_uploadVideoRepository);
          },
          inject: ['UploadVideoGateway'],
        },
      ],
      exports: [
        'S3ClientDataSourcePort',
        'UploadVideoGateway',
        'UploadVideoUseCasePort',
      ],
    };
  }
}
