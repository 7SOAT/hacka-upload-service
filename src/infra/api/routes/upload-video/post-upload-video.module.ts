import { Module } from '@nestjs/common';
import { PostUploadVideoController } from './post-upload-video.controller';
import { UploadVideoController } from 'src/adapters/controllers/upload-video.controller';
import { PersistVideoDataGateway } from 'src/adapters/gateways/persist-video-data.gateway';
import { SendMessageToQueueGateway } from 'src/adapters/gateways/send-message-to-queue.gateway';
import { UploadVideoGateway } from 'src/adapters/gateways/upload-video.gateway';
import { PersistVideoDataUseCasePort } from 'src/application/ports/persist-video-data.usecase.port';
import { SendMessageToQueueUseCasePort } from 'src/application/ports/send-message-to-queue.usecase.port';
import { UploadVideoUseCasePort } from 'src/application/ports/upload-video.usecase.port';
import { PersistVideoDataUseCase } from 'src/application/use-cases/persist-video-data.usecase';
import { SendMessageToQueueUseCase } from 'src/application/use-cases/send-message-to-queue.usecase';
import { UploadVideoUseCase } from 'src/application/use-cases/upload-video.usecase';
import { DynamoDBClientDataSource } from 'src/infra/data-sources/dynamodb-client.data-source';
import { DynamoDBClientDataSourcePort } from 'src/infra/data-sources/ports/dynamodb-client.data-source.port';
import { S3ClientDataSourcePort } from 'src/infra/data-sources/ports/s3-client.data-source.port';
import { SQSClientDataSourcePort } from 'src/infra/data-sources/ports/sqs-client.data-source.port';
import { S3ClientDataSource } from 'src/infra/data-sources/s3-client.data-source';
import { SQSClientDataSource } from 'src/infra/data-sources/sqs-client.data-source';
import { PersistVideoDataRepository } from 'src/infra/repositories/persist-video-data.repository';
import { SendMessageToQueueRepository } from 'src/infra/repositories/send-message-to-queue.repository';
import { UploadVideoRepository } from 'src/infra/repositories/upload-video.repository';
import { EnvironmentService } from 'src/config/environment/environment.service';
import { EnvironmentServicePort } from 'src/config/environment/ports/environment.service.port';

@Module({
  controllers: [PostUploadVideoController],
  providers: [
    {
      provide: 'EnvironmentServicePort',
      useClass: EnvironmentService,
    },
    {
      provide: 'S3ClientDataSourcePort',
      useFactory: (_environments: EnvironmentServicePort) => {
        return new S3ClientDataSource(_environments);
      },
      inject: ['EnvironmentServicePort'],
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
    {
      provide: 'SQSClientDataSourcePort',
      useFactory: (_environments: EnvironmentServicePort) => {
        return new SQSClientDataSource(_environments);
      },
      inject: ['EnvironmentServicePort'],
    },
    {
      provide: 'SendMessageToQueueGateway',
      useFactory: (_dataSource: SQSClientDataSourcePort) => {
        return new SendMessageToQueueRepository(_dataSource);
      },
      inject: ['SQSClientDataSourcePort'],
    },
    {
      provide: 'SendMessageToQueueUseCasePort',
      useFactory: (
        _sendMessageToQueueRepository: SendMessageToQueueGateway,
      ) => {
        return new SendMessageToQueueUseCase(_sendMessageToQueueRepository);
      },
      inject: ['SendMessageToQueueGateway'],
    },
    {
      provide: 'DynamoDBClientDataSourcePort',
      useFactory: (_environments: EnvironmentServicePort) => {
        return new DynamoDBClientDataSource(_environments);
      },
      inject: ['EnvironmentServicePort'],
    },
    {
      provide: 'PersistVideoDataGateway',
      useFactory: (_dataSource: DynamoDBClientDataSourcePort) => {
        return new PersistVideoDataRepository(_dataSource);
      },
      inject: ['DynamoDBClientDataSourcePort'],
    },
    {
      provide: 'PersistVideoDataUseCasePort',
      useFactory: (_persistVideoDataRepository: PersistVideoDataGateway) => {
        return new PersistVideoDataUseCase(_persistVideoDataRepository);
      },
      inject: ['PersistVideoDataGateway'],
    },
    {
      provide: 'UploadVideoControllerPort',
      useFactory: (
        _uploadVideoUseCase: UploadVideoUseCasePort,
        _sendMessageToQueueUseCase: SendMessageToQueueUseCasePort,
        _persistVideoDataUseCase: PersistVideoDataUseCasePort,
      ) => {
        return new UploadVideoController(
          _uploadVideoUseCase,
          _sendMessageToQueueUseCase,
          _persistVideoDataUseCase,
        );
      },
      inject: [
        'UploadVideoUseCasePort',
        'SendMessageToQueueUseCasePort',
        'PersistVideoDataUseCasePort',
      ],
    },
  ],
  exports: ['UploadVideoControllerPort'],
})
export default class PostUploadVideoControllerModule {}
